# -*- coding: utf-8 -*-
#
# (c) 2016 Boundless, http://boundlessgeo.com
# This code is licensed under the GPL 2.0 license.
#
import os
from PyQt4 import QtGui
from qgis.PyQt.QtCore import QEventLoop
from processing.core.GeoAlgorithmExecutionException import GeoAlgorithmExecutionException
from processing.core.GeoAlgorithm import GeoAlgorithm
from processing.core.parameters import ParameterFile
from processing.core.outputs import OutputDirectory
from webappbuilder import utils
from pubsub import pub
from webappbuilder.appcreator import createApp
import traceback

class CreateAppAlgorithm(GeoAlgorithm):

    APPDEF = 'APPDEF'
    OUTPUTFOLDER = 'OUTPUTFOLDER'

    def getIcon(self):
        return QtGui.QIcon(os.path.dirname(__file__)
                           + '/../icons/desktop.svg')

    def defineCharacteristics(self):
        self.name = 'Create Web App'
        self.group = 'Web App Builder'
        self.addParameter(ParameterFile(self.APPDEF, 'Appdef file', optional=False, ext="appdef"))
        self.addOutput(OutputDirectory(self.OUTPUTFOLDER, "Output folder"))

    sucess = True
    reason = ""
    def _end(self, success, reason):
        pub.unsubscribe(self._end, utils.topics.endFunction)
        self.sucess = success
        self.reason = reason
        self.loop.exit()

    def processAlgorithm(self, progress):
        appdef = self.getParameterValue(self.APPDEF)
        folder = self.getOutputValue(self.OUTPUTFOLDER)

        class Progress():
            def setText(_, text):
                pass
            def setProgress(_, i):
                pass
            def oscillate(_):
                pass

        self.progress = Progress()
        self.loop = QEventLoop()
        try:
            pub.subscribe(self._end, utils.topics.endFunction)
            createApp(appdef, folder, False, Progress())
        except Exception as ex:
            raise
            self._end(False, traceback.format_exc())
        self.loop.exec_(flags = QEventLoop.ExcludeUserInputEvents)
        if not self.success:
            raise GeoAlgorithmExecutionException(self.reason)
