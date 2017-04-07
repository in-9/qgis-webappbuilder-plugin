# -*- coding: utf-8 -*-
#
# (c) 2016 Boundless, http://boundlessgeo.com
# This code is licensed under the GPL 2.0 license.
#
import sys
import os
from pubsub import pub
import pubsub
from qgis.core import *
from PyQt4.QtCore import *
from PyQt4.QtGui import *
from PyQt4.QtWebKit import *
import utils
from collections import defaultdict
from qgis.utils import iface
from appcreator import (
    createApp,
    stopAppCreation,
    AppDefProblemsDialog,
    loadAppdef,
    saveAppdef,
    checkAppCanBeCreated,
    checkSDKServerVersion,
)
import settings
from types import MethodType
import webbrowser
from treesettingsitem import TreeSettingItem
from functools import partial
from settings import webAppWidgets
from qgiscommons.gui import askForFiles, askForFolder
from qgiscommons.settings import pluginSetting
import traceback
from treelayeritem import TreeLayerItem, TreeGroupItem
from exceptions import WrongValueException
from PyQt4 import uic
from qgiscommons.files import tempFolderInTempFolder

# Adding so that our UI files can find resources_rc.py
sys.path.append(os.path.dirname(__file__))

WIDGET, BASE = uic.loadUiType(
    os.path.join(os.path.dirname(__file__), 'ui_maindialog.ui'))

def icon(f):
    return QIcon(os.path.join(os.path.dirname(__file__), "icons", f))

class MainDialog(BASE, WIDGET):

    items = {}

    def __init__(self, appdef, parent=None):
        super(MainDialog, self).__init__(parent)
        self.setupUi(self)

        self.widgetButtons = {}
        self.populateLayers()
        self.populateBaseLayers()
        self.populateConfigParams()
        self.populateThemes()
        self.populateWidgets()

        self.buttonLogo.clicked.connect(self.selectLogo)

        self.buttonOpen = QPushButton(self.tr("Open"))
        self.buttonOpen.setIcon(QgsApplication.getThemeIcon('/mActionFileOpen.svg'))

        self.buttonSave = QPushButton(self.tr("Save"))
        self.buttonSave.setIcon(QgsApplication.getThemeIcon('/mActionFileSave.svg'))

        self.buttonPreview = QPushButton("Preview")
        self.buttonPreview.setIcon(icon("preview.gif"))

        self.onCreatingApp = False
        self.buttonCreateOrStopApp = QPushButton(self.tr("CreateApp (Beta)"))
        self.buttonCreateOrStopApp.setIcon(icon("export.png"))

        self.buttonHelp = self.buttonBox.button(QDialogButtonBox.Help)
        self.buttonHelp.setIcon(QgsApplication.getThemeIcon('/mActionHelpAPI.png'))

        self.buttonClose = self.buttonBox.button(QDialogButtonBox.Close)
        self.buttonClose.setIcon(QgsApplication.getThemeIcon('/mActionFileExit.png'))

        self.buttonBox.addButton(self.buttonOpen, QDialogButtonBox.ActionRole)
        self.buttonBox.addButton(self.buttonSave, QDialogButtonBox.ActionRole)
        self.buttonBox.addButton(self.buttonPreview, QDialogButtonBox.ActionRole)
        self.buttonBox.addButton(self.buttonCreateOrStopApp, QDialogButtonBox.ActionRole)

        self.buttonOpen.clicked.connect(self.openAppdef)
        self.buttonSave.clicked.connect(self.saveAppdef)
        self.buttonCreateOrStopApp.clicked.connect(self.createOrStopApp)
        self.buttonPreview.clicked.connect(self.preview)
        self.buttonBox.helpRequested.connect(self.showHelp)

        self.expandLayersButton.clicked.connect(lambda: self.layersTree.expandAll())
        self.collapseLayersButton.clicked.connect(self.collapseLayers)
        self.filterLayersBox.textChanged.connect(self.filterLayers)
        self.expandLayersButton.setIcon(QgsApplication.getThemeIcon('/mActionExpandTree.svg'))
        self.collapseLayersButton.setIcon(QgsApplication.getThemeIcon('/mActionCollapseTree.svg'))

        self.progressBar.setVisible(False)
        self.progressLabel.setVisible(False)

        class Progress():
            def setText(_, text):
                self.progressLabel.setText(text)
                QApplication.processEvents()
            def setProgress(_, i):
                self.progressBar.setMaximum(100)
                self.progressBar.setValue(i)
                QApplication.processEvents()
            def oscillate(_):
                self.progressBar.setMaximum(0)
                self.progressBar.setMinimum(0)
                QApplication.processEvents()

        self.progress = Progress()

        if appdef is not None:
            self.loadAppdef(appdef)

        self.tabPanel.setCurrentIndex(0)

    def showHelp(self):
        webbrowser.open_new("file://" + os.path.join(os.path.dirname(__file__), "docs", "html", "index.html"))

    def collapseLayers(self):
        self.layersTree.collapseAll()
        for i in xrange(self.layersTree.topLevelItemCount()):
            item = self.layersTree.topLevelItem(i)
            if isinstance(item, TreeGroupItem):
                item.setExpanded(True)

    def filterLayers(self):
        text = self.filterLayersBox.text()
        for i in xrange(self.layersTree.topLevelItemCount()):
            item = self.layersTree.topLevelItem(i)
            if isinstance(item, TreeLayerItem):
                itemText = item.text(0)
                item.setHidden(text != "" and text not in itemText)
            else:
                groupVisible = False
                for j in xrange(item.childCount()):
                    subitem = item.child(j)
                    subitemText = subitem.text(0)
                    hidden = text != "" and text not in subitemText
                    if not hidden:
                        groupVisible = True
                    subitem.setHidden(hidden)
                item.setHidden(not groupVisible)

    def selectLogo(self):
        img = QFileDialog.getOpenFileName(self, "Select image file")
        if img:
            self.logoBox.setText(img)

    def openAppdef(self):
        appdefFile = askForFiles(self, "Select app definition file", False, False, "appdef")
        if appdefFile:
            appdef = loadAppdef(appdefFile)
            if appdef:
                self.loadAppdef(appdef)
                self.tabPanel.setCurrentIndex(0)


    def saveAppdef(self):
        appdefFile = askForFiles(self, "Select app definition file", True,
                                          exts = "appdef")
        if appdefFile:
            saveAppdef(self.createAppDefinition(), appdefFile)

    def loadAppdef(self, appdef):
        try:
            self.titleBox.setText(appdef["Settings"]["Title"])
            self.logoBox.setText(appdef["Settings"]["Logo"])
            for button, widgetName in self.widgetButtons.iteritems():
                if widgetName in appdef["Widgets"]:
                    button.setChecked(True)
                    button.webAppWidget.setParameters(appdef["Widgets"][widgetName]["Parameters"])
                else:
                    button.setChecked(False)
                    button.webAppWidget.resetParameters()

            for name in self.settingsItems:
                if name in appdef["Settings"]:
                    self.settingsItems[name].setValue(appdef["Settings"][name])
            theme = appdef["Settings"]["Theme"]
            for button, themeName in self.themesButtons.iteritems():
                if themeName == theme:
                    button.click()
            baseLayers = appdef["Base layers"]
            for button, name in self.baseLayers.iteritems():
                button.setChecked(name in baseLayers)
            for button, name in self.baseOverlays.iteritems():
                button.setChecked(name in baseLayers)
            items = []
            for i in xrange(self.layersTree.topLevelItemCount()):
                item = self.layersTree.topLevelItem(i)
                if isinstance(item, TreeLayerItem):
                    items.append(item)
                else:
                    try:
                        item.setShowContent(appdef["Groups"][item.text(0)]["showContent"])
                    except:
                        pass
                    for j in xrange(item.childCount()):
                        subitem = item.child(j)
                        if isinstance(subitem, TreeLayerItem):
                            items.append(subitem)

            layers = {lay["layer"]: lay for lay in appdef["Layers"]}
            for item in items:
                if item.layer.name() in layers:
                    item.setCheckState(0, Qt.Checked)
                    layer = layers[item.layer.name()]
                    item.setValues(layer["visible"], layer["popup"],
                                   layer["clusterDistance"], layer["clusterColor"],
                                   layer["allowSelection"],
                                   layer["showInOverview"], layer["timeInfo"],
                                   layer["showInControls"], layer["singleTile"])
                else:
                    item.setCheckState(0, Qt.Unchecked)

        except Exception, e:
            QgsMessageLog.logMessage(traceback.format_exc(), level=QgsMessageLog.WARNING)
            QMessageBox.warning(iface.mainWindow(), "Error loading app definition",
                "App definition could not be loaded.\nCheck QGIS log for more details")

    buttonStyle = '''QToolButton {background-color: #7c899f;
                                     border-color: #7c899f;
                                     border-style: solid;
                                     border-width: 3px;
                                     border-radius: 10px;
                                     font: bold 8.25pt;
                                     padding: 15px;
                                     max-width: 220px;
                                     color: white;
                                 }
                                 QToolButton:checked {
                                     background-color: #2d67c6;
                                     border-color:#4d8ef7;
                                 }'''

    def populateWidgets(self):
        def _mousePressEvent(selfb, event):
            QToolButton.mousePressEvent(selfb, event)
            if event.button() == Qt.RightButton:
                menu = QMenu()
                paramsAction = QAction("Configure...", None)
                paramsAction.triggered.connect(selfb.webAppWidget.configure)
                paramsAction.setEnabled(bool(selfb.webAppWidget.parameters()))
                menu.addAction(paramsAction)
                point = selfb.mapToGlobal(event.pos())
                menu.exec_(point)

        for i, (_, w) in enumerate(sorted(webAppWidgets.items())):
            button = QToolButton(self.scrollAreaWidgetContents)
            button.setText('')
            button.setCheckable(True)
            button.setStyleSheet(self.buttonStyle)
            button.setSizePolicy(QSizePolicy.Minimum, QSizePolicy.Preferred)

            label = QLabel()
            label.setMouseTracking(False)
            label.setWordWrap(True)
            label.setTextInteractionFlags(Qt.NoTextInteraction)
            label.setText('<center><img src="{}"></center><center style="color:white"><b>{}</b></center>'.format(w.iconFile(), w.description().replace(" ", "\n")))

            layout = QHBoxLayout()
            layout.addWidget(label)
            layout.setSpacing(0)
            layout.setMargin(0)
            layout.setContentsMargins(5, 5, 5, 5)

            button.setLayout(layout)

            button.webAppWidget = w

            row = i / 5
            col = i % 5
            self.gridLayoutWidgets.addWidget(button, row, col, 1, 1)
            button.mousePressEvent = MethodType(_mousePressEvent, button, QToolButton)
            self.widgetButtons[button] = w.name()
        spacerItem3 = QSpacerItem(20, 0, QSizePolicy.Minimum, QSizePolicy.Expanding)
        self.gridLayoutWidgets.addItem(spacerItem3, row + 1, 0, 1, 1)

    def populateThemes(self):
        self.themesButtons = {}
        basePath = os.path.join(os.path.dirname(__file__), "themes")
        themes = [o for o in os.listdir(basePath) if os.path.isdir(os.path.join(basePath,o))]
        for i, theme in enumerate(themes):
            button = QToolButton()
            button.setText('')
            button.setCheckable(True)
            button.setChecked(i == 0)
            button.setFixedWidth(250)
            button.setFixedHeight(150)
            button.setStyleSheet(self.buttonStyle)
            button.setSizePolicy(QSizePolicy.Minimum, QSizePolicy.Preferred)

            label = QLabel()
            label.setMouseTracking(False)
            label.setWordWrap(True)
            label.setTextInteractionFlags(Qt.NoTextInteraction)
            iconFile = os.path.join(os.path.dirname(__file__), "themes", theme, "icon.png")
            label.setText('<center><img src="{}" width="80" height="80"></center><center style="color:white"><b>{}</b></center>'.format(iconFile, theme))

            layout = QHBoxLayout()
            layout.addWidget(label)
            layout.setSpacing(0)
            layout.setMargin(0)
            layout.setContentsMargins(5, 5, 5, 5)

            button.setLayout(layout)

            def clicked(button):
                for b in self.themesButtons:
                    b.setChecked(False)
                button.setChecked(True)
            button.clicked.connect(partial(clicked, button))
            row = i / 2
            col = i % 2
            self.gridLayoutThemes.addWidget(button, row, col, 1, 1)
            self.themesButtons[button] = theme

    def populateBaseLayers(self):
        self.baseLayers = {}
        layers = sorted([lay for lay in settings.baseLayers.keys()])
        for i, layer in enumerate(layers):
            button = QToolButton()
            filename = os.path.join(os.path.dirname(__file__), "baselayers", layer.lower().replace(" ", "") + ".png")
            button.setText('')
            button.setCheckable(True)
            button.setChecked(False)
            button.setStyleSheet(self.buttonStyle)
            button.setSizePolicy(QSizePolicy.Minimum, QSizePolicy.Preferred)

            label = QLabel()
            label.setMouseTracking(False)
            label.setWordWrap(True)
            label.setTextInteractionFlags(Qt.NoTextInteraction)
            label.setText('<center><img src="{}" width="160" height="80"></center><center style="color:white"><b>{}</b></center>'.format(filename, layer))

            layout = QHBoxLayout()
            layout.addWidget(label)
            layout.setSpacing(0)
            layout.setMargin(0)
            layout.setContentsMargins(5, 5, 5, 5)

            button.setLayout(layout)

            row = i / 3
            col = i % 3
            self.gridLayoutBaseLayers.addWidget(button, row, col, 1, 1)
            self.baseLayers[button] = layer
        layers = sorted([lay for lay in settings.baseOverlays.keys()])
        self.baseOverlays = {}
        for i, layer in enumerate(layers):
            button = QToolButton()
            filename = os.path.join(os.path.dirname(__file__), "baselayers", layer.lower().replace(" ", "") + ".png")
            button.setText('')
            button.setCheckable(True)
            button.setChecked(False)
            button.setStyleSheet(self.buttonStyle)
            button.setSizePolicy(QSizePolicy.Minimum, QSizePolicy.Preferred)

            label = QLabel()
            label.setMouseTracking(False)
            label.setWordWrap(True)
            label.setTextInteractionFlags(Qt.NoTextInteraction)
            label.setText('<center><img src="{}" width="160" height="80"></center><center style="color:white"><b>{}</b></center>'.format(filename, layer))

            layout = QHBoxLayout()
            layout.addWidget(label)
            layout.setSpacing(0)
            layout.setMargin(0)
            layout.setContentsMargins(5, 5, 5, 5)

            button.setLayout(layout)

            row = i / 3
            col = i % 3
            self.gridLayoutBaseOverlays.addWidget(button, row, col, 1, 1)
            self.baseOverlays[button] = layer

    def populateLayers(self):
        skipType = [2]
        visibleLayers = iface.mapCanvas().layers()
        root = QgsProject.instance().layerTreeRoot()
        for child in root.children():
            if isinstance(child, QgsLayerTreeGroup):
                layers = []
                for subchild in child.children():
                    if isinstance(subchild, QgsLayerTreeLayer):
                        layers.append(subchild.layer())
                item = TreeGroupItem(child.name(), layers, self.layersTree)
                self.layersTree.addTopLevelItem(item)
            elif isinstance(child, QgsLayerTreeLayer):
                layer = child.layer()
                if layer.type() not in skipType:
                    item = TreeLayerItem(layer, self.layersTree)
                    item.setCheckState(0, Qt.Checked if layer in visibleLayers else Qt.Unchecked)
                    item.toggleChildren()
                    self.layersTree.addTopLevelItem(item)

        self.layersTree.expandAll()
        self.layersTree.resizeColumnToContents(0)
        self.layersTree.resizeColumnToContents(1)

        def toggleLayerItemChildren(item, _):
            if isinstance(item, TreeLayerItem):
                item.toggleChildren()
        self.layersTree.itemChanged.connect(toggleLayerItemChildren)
        self.collapseLayers()

    def populateConfigParams(self):
        self.settingsItems = defaultdict(dict)
        item = QTreeWidgetItem()
        item.setText(0, "Settings")
        for param, value in settings.appSettings.iteritems():
            subitem = TreeSettingItem(item, self.settingsTree, param, value)
            item.addChild(subitem)
            self.settingsItems[param] = subitem
        self.settingsTree.addTopLevelItem(item)
        item.sortChildren(0, Qt.AscendingOrder)
        self.settingsTree.expandAll()
        self.settingsTree.resizeColumnToContents(0)
        self.settingsTree.resizeColumnToContents(1)

    def setButtonsEnabled(self, status, excludeList=None):
        """Set enable status for all buttons in self.buttonBox escluding that
        in the excludeList.
        """
        for button in self.buttonBox.buttons():
            if excludeList and button in excludeList:
                continue
            button.setEnabled(status)

    def endFunctionListener(self, success, reason):
        from pubsub import pub
        pub.unsubscribe(self.endFunctionListener, utils.topics.endFunction)
        self.progressBar.setMaximum(100)
        self.progressBar.setValue(0)
        self.progressBar.setVisible(False)
        self.progressLabel.setVisible(False)
        self.setButtonsEnabled(status=True)
        # to solve module unload error
        from PyQt4.QtGui import QApplication
        QApplication.restoreOverrideCursor()

    def _run(self, f):
        self.progressBar.setVisible(True)
        self.progressLabel.setVisible(True)
        self.progressBar.setMaximum(100)
        self.progressBar.setValue(0)
        QApplication.setOverrideCursor(QCursor(Qt.WaitCursor))
        try:
            pub.subscribe(self.endFunctionListener, utils.topics.endFunction)
            return f()
        except Exception as ex:
            self.endFunctionListener(False, str(ex))


    def endCreatePreviewListener(self, success, reason):
        from pubsub import pub
        pub.unsubscribe(self.endCreatePreviewListener, utils.topics.endFunction)
        if success:
            path = "file:///" + self.currentFolder.replace("\\","/") + "/webapp/index_debug.html"
            webbrowser.open_new(path)
        else:
            QgsMessageLog.logMessage("WebAppBuilder: {}".format(reason), level=QgsMessageLog.CRITICAL)
            QApplication.restoreOverrideCursor()
            QMessageBox.critical(iface.mainWindow(), "Error creating preview web app",
                                 "Could not create web app.\nCheck the QGIS log for more details.")

    def preview(self):
        try:
            appdef = self.createAppDefinition()
        except WrongValueException:
            return
        problems = checkAppCanBeCreated(appdef)
        if problems:
            dlg = AppDefProblemsDialog(problems)
            dlg.exec_()
            if not dlg.ok:
                return
        try:
            self.currentFolder = tempFolderInTempFolder("webappbuilder")
            pub.subscribe(self.endCreatePreviewListener, utils.topics.endFunction)
            try:
                self._run(lambda: createApp(appdef, self.currentFolder, True, self.progress))
            except:
                QgsMessageLog.logMessage(traceback.format_exc(), level=QgsMessageLog.CRITICAL)
                self.endCreatePreviewListener(False, traceback.format_exc())
        except WrongValueException:
            pass

    def endCreateAppListener(self, success, reason):
        self.onCreatingApp = False

        # reset button status and cursor
        self.buttonCreateOrStopApp.setText(self.createAppButtonText)
        QApplication.restoreOverrideCursor()

        from pubsub import pub
        pub.unsubscribe(self.endCreateAppListener, utils.topics.endFunction)
        if success:
            if pluginSetting("compileinserver"):
                QMessageBox.information(self, self.tr("Web app"),
                                     self.tr("Web app was correctly created and built."))
            else:
                QMessageBox.information(self, self.tr("Web app"),
                                     self.tr("Web app file were correctly created.\n"
                                     "A web app can be built from them using Boundless WebSDK"))
        elif reason:
            QgsMessageLog.logMessage("WebAppBuilder: {}".format(reason), level=QgsMessageLog.CRITICAL)
            if 'Request cancelled by user' in reason:
                # do nothing
                pass
            elif 'Cannot post preview webapp: Network error #5: Operation canceled' in reason:
                QMessageBox.critical(self, self.tr("Error creating web app"),
                                self.tr("Network error due to a timeout.\n"
                                "Please configure a longer timeout going to:\n"
                                "Settings->Options->Network->Timeout for network requests (ms)."))
            elif 'Permission denied' in reason:
                QMessageBox.critical(self, self.tr("Error creating web app"),
                                self.tr("Could not create web app.\nPermission denied with current Connect credentials"))
            else:
                QMessageBox.critical(self, self.tr("Error creating web app"),
                                self.tr("Could not create web app.\nCheck the QGIS log for more details."))

    def createOrStopApp(self):
        # check if app is compiling
        if self.onCreatingApp:
            stopAppCreation()
            return

        # start compilation
        try:
            appdef = self.createAppDefinition()
            problems = checkAppCanBeCreated(appdef)
            if problems:
                dlg = AppDefProblemsDialog(problems)
                dlg.exec_()
                if not dlg.ok:
                    return
            if pluginSetting("compileinserver"):
                errMessage = checkSDKServerVersion()
                if errMessage:
                    QMessageBox.warning(self, "Problem checking SDK version", errMessage,
                                        QMessageBox.Close)
                    return
                # check if able to login via connect credentials
                try:
                    utils.getConnectAuthCfg()
                except Exception as ex:
                    errMessage = str(ex)
                    QMessageBox.warning(self, "Need Connect credentials", errMessage,
                                            QMessageBox.Close)
                    return
            # now ask where to store app
            folder = askForFolder(self, "Select folder to store app")
            if folder:
                if os.path.exists(os.path.join(folder, "webapp")) and pluginSetting("overwritewarning"):
                    ret = QMessageBox.warning(self, "Output folder", " The selected folder already contains a 'webapp' subfolder.\n"
                                        "Do you confirm that you want to overwrite it?",
                                        QMessageBox.Yes | QMessageBox.No, QMessageBox.No)
                    if ret == QMessageBox.No:
                        return

                # set buttons status
                self.setButtonsEnabled(status=False, excludeList=[self.buttonCreateOrStopApp])
                self.createAppButtonText = self.buttonCreateOrStopApp.text()
                self.buttonCreateOrStopApp.setText(self.tr("Stop"))

                try:
                    pub.subscribe(self.endCreateAppListener, utils.topics.endFunction)
                    self.onCreatingApp = True
                    self._run(lambda: createApp(appdef, folder, False, self.progress))
                except Exception as ex:
                    self.endCreateAppListener(False, traceback.format_exc())

        except WrongValueException:
            pass

    def createAppDefinition(self):
        layers, groups = self.getLayersAndGroups()
        appdef = {}
        appdef["Settings"] = self.getSettings()
        appdef["Base layers"] = self.getBaseLayers()
        appdef["Layers"] = layers
        appdef["Groups"] = groups
        appdef["Widgets"] = self.getWidgets()

        return appdef

    def getBaseLayers(self):
        layers = []
        for b in self.baseLayers:
            if b.isChecked():
                layers.append(self.baseLayers[b])
        for b in self.baseOverlays:
            if b.isChecked():
                layers.append(self.baseOverlays[b])
        return layers

    def getWidgets(self):
        widgets = {}
        for button, name in self.widgetButtons.iteritems():
            if button.isChecked():
                widgets[name] = button.webAppWidget
        return widgets

    def _getValue(self, textbox, mandatory):
        textbox.setStyleSheet("QLineEdit{background: white}")
        value = textbox.text().strip()
        if value == "" and mandatory:
            textbox.setStyleSheet("QLineEdit{background: yellow}")
            raise WrongValueException()
        return value


    def getSettings(self):
        try:
            title = self._getValue(self.titleBox, True)
        except WrongValueException, e:
            self.tabPanel.setCurrentIndex(0)
        for b in self.themesButtons:
            if b.isChecked():
                themeName = self.themesButtons[b]
                break
        logo = self.logoBox.text().strip()
        if logo and not os.path.exists(logo):
            self.tabPanel.setCurrentIndex(0)
            self.logoBox.setStyleSheet("QLineEdit{background: yellow}")
            raise WrongValueException()
        self.logoBox.setStyleSheet("QLineEdit{background: white}")
        parameters = {"Title": title,
                      "Logo": logo,
                      "Theme": themeName
                      }
        try:
            for param, item in self.settingsItems.iteritems():
                parameters[param] = item.value()
        except WrongValueException, e:
            self.tabPanel.setCurrentIndex(5)

        return parameters

    def getLayersAndGroups(self):
        layers = []
        groups = {}
        for i in xrange(self.layersTree.topLevelItemCount()):
            item = self.layersTree.topLevelItem(i)
            if isinstance(item, TreeLayerItem):
                if item.checkState(0) == Qt.Checked:
                    layers.append(item.appLayer())
            elif isinstance(item, TreeGroupItem):
                groupLayers = []
                for j in xrange(item.childCount()):
                    subitem = item.child(j)
                    if isinstance(subitem, TreeLayerItem) and subitem.checkState(0) == Qt.Checked:
                        layers.append(subitem.appLayer())
                        groupLayers.append(subitem.layer)
                if groupLayers:
                    groups[item.name] = {"showContent": item.showContent(),
                                         "layers": groupLayers[::-1]}

        return layers[::-1], groups
