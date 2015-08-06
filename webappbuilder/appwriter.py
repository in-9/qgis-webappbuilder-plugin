import codecs
import os
import re
import math
import shutil
from qgis.core import *
from qgis.utils import iface
from PyQt4.QtCore import *
from PyQt4.QtGui import *
from utils import *
from settings import *
import json
import importlib
import urlparse
import requests
from olwriter import exportStyles, layerToJavascript

def writeWebApp(appdef, folder, writeLayersData, progress):
    progress.setText("Creating local files")
    progress.setProgress(0)
    dst = os.path.join(folder, "resources")
    resourcesFolder = os.path.join(os.path.dirname(__file__), "resources")
    if os.path.exists(dst):
        shutil.rmtree(dst)
    shutil.copytree(resourcesFolder, dst)
    layers = appdef["Layers"]
    if writeLayersData:
        exportLayers(layers, folder, progress,
                     appdef["Settings"]["Precision for GeoJSON export"],
                     appdef["Settings"]["App view CRS"])
    exportStyles(layers, folder, appdef["Settings"], "Timeline" in appdef["Widgets"])
    writeLayersAndGroups(appdef, folder)
    writeJs(appdef, folder)
    writeCss(appdef, folder)
    indexFilepath = writeHtml(appdef, folder)
    return indexFilepath

def writeJs(appdef, folder):
    layers = appdef["Layers"]
    popupLayers = "popupLayers = [%s];" % ",".join(["`%s`" % layer.popup for layer in layers])
    controls = []
    widgets = appdef["Widgets"]
    if "Help" in widgets:
        writeHelpFiles(appdef, folder)
    if "Print" in widgets:
        writePrintFiles(appdef, folder)
    if "Scale bar" in widgets:
        controls.append("new ol.control.ScaleLine(%s)" % json.dumps(widgets["Scale bar"]))
    if "Layers list" in widgets:
        controls.append("new ol.control.LayerSwitcher(%s)" % json.dumps(widgets["Layers list"]))
    if "Legend" in widgets:
        writeLegendFiles(appdef, folder)
        controls.append("new ol.control.Legend()")
    if "Geolocation" in widgets:
        controls.append("new ol.control.Geolocation()")
    if "Overview map" in widgets:
        collapsed = str(widgets["Overview map"]["Collapsed"]).lower()
        overviewLayers = ",".join(["lyr_%s" % safeName(layer.layer.name())
                        for layer in layers if layer.showInOverview])
        controls.append("new ol.control.OverviewMap({collapsed: %s, layers: [overviewMapBaseLayer, %s]})"
                        % (collapsed, overviewLayers))
    if "Mouse position" in widgets:
        coord = str(widgets["Mouse position"]["coordinateFormat"])
        s = json.dumps(widgets["Mouse position"])
        s = s.replace('"%s"' % coord, coord)
        controls.append("new ol.control.MousePosition(%s)" % s)
    if "Home button" in widgets:
        controls.append("new ol.control.HomeButton()")
    if "Timeline" in widgets:
        timelineOptions = getTimelineOptions(appdef);
        controls.append("new ol.control.TimeLine({minDate:%s, maxDate:%s, interval:%s, numIntervals:%s})"
                            % (timelineOptions[0], timelineOptions[1],
                               widgets["Timeline"]["interval"],
                               widgets["Timeline"]["numIntervals"]))
    if "Zoom slider" in widgets:
        controls.append("new ol.control.ZoomSlider()")
    if "North arrow" in widgets:
        controls.append("new ol.control.Rotate({autoHide: false})")
    if "Full screen" in widgets:
        controls.append("new ol.control.FullScreen()")
    if "Zoom controls" in widgets:
        controls.append("new ol.control.Zoom(%s)" % json.dumps(widgets["Zoom controls"]))
    if "Attribution" in widgets:
        controls.append("new ol.control.Attribution()")
    if "3D view" in widgets:
        cesium = '''var ol3d = new olcs.OLCesium({map: map});
                    var scene = ol3d.getCesiumScene();
                    var terrainProvider = new Cesium.CesiumTerrainProvider({
                        url : '//cesiumjs.org/stk-terrain/tilesets/world/tiles'
                    });
                    scene.terrainProvider = terrainProvider;
                    map.addControl(new ol.control.CesiumControl(ol3d))'''
    else:
        cesium = ""

    viewCrs = appdef["Settings"]["App view CRS"]
    mapbounds = bounds(appdef["Settings"]["Extent"] == "Canvas extent", layers, viewCrs)
    mapextent = "extent: %s" % mapbounds if appdef["Settings"]["Restrict to extent"] else "center:[0,0],zoom:7"
    maxZoom = int(appdef["Settings"]["Max zoom level"])
    minZoom = int(appdef["Settings"]["Min zoom level"])
    pointZoom = str(appdef["Settings"]["Zoom level when zooming to point feature"])
    popupEvent = "pointermove" if appdef["Settings"]["Show popups on hover"] else "singleclick"
    view = "%s, maxZoom: %d, minZoom: %d, projection: '%s'" % (mapextent, maxZoom, minZoom, viewCrs)
    values = {"@BOUNDS@": mapbounds,
                "@CONTROLS@": ",\n".join(controls),
                "@POPUPLAYERS@": popupLayers,
                "@VIEW@": view,
                "@POINTZOOM@": pointZoom,
                "@POPUPEVENT@": popupEvent,
                "@CESIUM@": cesium}
    indexJsFilepath = os.path.join(folder, "index.js")
    template = os.path.join(os.path.dirname(__file__), "templates", "index.js")
    with open(indexJsFilepath, "w") as f:
        f.write(replaceInTemplate(template, values))

def getTimelineOptions(appdef):
    layers = appdef["Layers"]
    times = set()
    for layer in layers:
        if layer.timeInfo is not None:
            if isinstance(layer.timeInfo[0], basestring):
                features = layer.layer.getFeatures()
                for feature in features:
                    for field in layer.timeInfo:
                        try:
                            value = feature[field]
                            if isinstance(value, QDate):
                                t = QDateTime()
                                t.setDate(value)
                            else:
                                t = QDateTime.fromString(unicode(value), Qt.ISODate)
                            if t.isValid():
                                times.add(t.toMSecsSinceEpoch())
                        except:
                            pass
            else:
                times.add(layer.timeInfo[0])
                times.add(layer.timeInfo[1])

    if times:
        return [min(times), max(times)]
    else:
        return [0,1]

def writeCss(appdef, folder):
    cssFilepath = os.path.join(folder, "webapp.css")
    with open(cssFilepath, "w") as f:
        f.write(appdef["Settings"]["Theme"]["Css"])


def writeHtml(appdef, folder):
    layers = appdef["Layers"]
    widgets = appdef["Widgets"]
    theme = appdef["Settings"]["Theme"]["Name"]
    viewCrs = appdef["Settings"]["App view CRS"]
    scripts = []
    scriptsBottom = []
    scripts.extend(['<script src="layers/lyr_%s.js"></script>' % (safeName(layer.layer.name()))
                            for layer in layers if layer.layer.type() == layer.layer.VectorLayer
                                and layer.method == METHOD_FILE])
    scripts.extend(['<script src="styles/%s.js"></script>' % (safeName(layer.layer.name()))
                            for layer in layers if layer.layer.type() == layer.layer.VectorLayer])

    refresh = []
    for applayer in layers:
        layer = applayer.layer
        if applayer.refreshInterval:
            refresh.append(
            '''map.once("postcompose", function(){
                    window.setInterval(function(){
                        lyr_%s.getSource().updateParams({'dummy': Math.random()});
                    }, %s);
                  }); ''' % (safeName(layer.name()), str(applayer.refreshInterval)))
        useViewCrs = appdef["Settings"]["Use view CRS for WFS connections"]
        if layer.providerType().lower() == "wfs":
            epsg = layer.crs().authid().split(":")[-1]
            if not useViewCrs and epsg not in ["3857", "4326"]:
                scripts.append('<script src="./resources/proj4.js"></script>')
                scripts.append('<script src="http://epsg.io/%s.js"></script>' % epsg)

    if refresh:
        scripts.append("<script>$(document).ready(function(){%s});</script>" % "\n".join(refresh))

    viewEpsg = viewCrs.split(":")[-1]
    if viewEpsg not in ["3857", "4326"]:
            scripts.append('<script src="./resources/proj4.js"></script>')
            scripts.append('<script src="http://epsg.io/%s.js"></script>' % viewEpsg)

    if "Mouse position" in widgets:
        projection = widgets["Mouse position"]["projection"]
        epsg = projection.split(":")[-1]
        if epsg not in ["3857", "4326"]:
            scripts.append('<script src="./resources/proj4.js"></script>')
            scripts.append('<script src="http://epsg.io/%s.js"></script>' % epsg)
    if "Legend" in widgets:
        scripts.append('<script src="./legend/legend.js"></script>')
    if "Layers list" in widgets and widgets["Layers list"]["allowFiltering"]:
        scripts.append('''<script src="./resources/bootbox.min.js"></script>''')
        scripts.append('''<script src="./resources/filtrex.js"></script>''')

    try:
        module = importlib.import_module('webappbuilder.themes.%s.%s' % (theme, theme))
        if hasattr(module, 'writeHtml'):
            func = getattr(module, 'writeHtml')
            html = func(appdef, folder, scripts)
        else:
            html = defaultWriteHtml(appdef, folder, scripts, scriptsBottom)
    except ImportError:
        html = defaultWriteHtml(appdef, folder, scripts, scriptsBottom)


    indexFilepath = os.path.join(folder, "index.html")
    try:
        from bs4 import BeautifulSoup as bs
        soup=bs(html)
        pretty=soup.prettify(formatter='html')
    except:
        pretty = html
    with open(indexFilepath, "w") as f:
        f.write(pretty)
    return indexFilepath

def defaultWriteHtml(appdef, folder, scripts, scriptsBottom):
    widgets = appdef["Widgets"]
    theme = appdef["Settings"]["Theme"]["Name"]
    tools = []
    panels = []
    mappanels = []

    if "Geocoding" in widgets:
        tools.append('''<div class="navbar-form navbar-right">
                          <div class="input-group">
                              <input type="text" onkeypress="searchBoxKeyPressed(event);" id="geocoding-search" class="form-control" placeholder="Search placename..."/>
                              <div class="input-group-btn">
                                  <button class="btn btn-default" onclick="searchAddress()"><span>&nbsp;</span><i class="glyphicon glyphicon-search"></i></button>
                              </div>
                          </div>
                        </div>''');
        mappanels.append('<div id="geocoding-results" class="geocoding-results"></div>')
    if "Links" in widgets:
        links = widgets["Links"]["links"]
        for name, url in links.iteritems():
            tools.append('<li><a href="%s">%s</a></li>' % (url, name))
    if "Selection tools" in widgets:
        params = widgets["Selection tools"]
        selectTools = []
        selectTools.append(["removeSelectionTool()", "No selection tool (zoom/pan)"])
        if params["Select by polygon"]:
            selectTools.append(["selectByPolygon()", "Select by polygon"])
        if params["Select by rectangle"]:
            selectTools.append(["selectByRectangle()", "Select by rectangle"])
        li = "\n".join(['<li><a onclick="%s" href="#">%s</a></li>' % (sel[0], sel[1]) for sel in selectTools])
        tools.append('''<li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                        Selection <span class="caret"><span></a>
                        <ul class="dropdown-menu">
                          %s
                        </ul>
                      </li>''' % li)
    if "Analysis tools" in widgets:
        params = widgets["Analysis tools"]
        allAnalysisTools = {"Add random points layer": "addRandomLayer()",
                         "Buffer": "buffer()",
                         "Extract selected features from layer": "extractSelected()",
                         "Aggregate": "aggregatePoints()",
                         "Density layer (heatmap)": "addDensityLayer()",
                         "Select within": "selectWithin()",
                         "Count features": "countFeatures()",
                         "Calculate line length": "lineLength()",
                         "Nearest point": "nearestPoint()"}
        analysisTools = []
        for toolName, tool in allAnalysisTools.iteritems():
            if params[toolName]:
                analysisTools.append([tool, toolName])
        if analysisTools:
            li = "\n".join(['<li><a onclick="runAlgorithm(new %s)" href="#">%s</a></li>' % (t[0], t[1]) for t in analysisTools])
            tools.append('''<li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            Analysis <span class="caret"><span></a>
                            <ul class="dropdown-menu">
                              %s
                            </ul>
                          </li>''' % li)
            scripts.append('''<script src="./resources/analysis.js"></script>''')
            scripts.append('''<script src="./resources/turf.min.js"></script>''')
            scripts.append('''<script src="./resources/bootbox.min.js"></script>''')
    if "Query" in widgets:
        scripts.append('''<script src="./resources/filtrex.js"></script>''')
        tools.append('<li><a onclick="showQueryPanel()" href="#"><i class="glyphicon glyphicon-filter"></i>Query</a></li>')
        mappanels.append('''<div class="query-panel" id="query-panel">
                                <form class="form-horizontal">
                                    <div style="margin-bottom: 25px" class="input-group">
                                        <span class="input-group-addon">Layer</span>
                                        <select id="query-layer" class="form-control"></select>
                                    </div>
                                    <div style="margin-bottom: 25px" class="input-group">
                                        <span class="input-group-addon">Filter </span>
                                        <input id="query-expression" type="text" class="form-control" placeholder="Type expression...">
                                        <span class="input-group-addon">
                                        <a href="https://github.com/joewalnes/filtrex#expressions" target="_blank">
                                            Help
                                        </a></span>
                                    </div>
                                   <div style="margin-top:10px" class="form-group">
                                        <div class="col-sm-12 controls">
                                          <a id="btn-query-new" href="#" class="btn btn-primary">New selection</a>
                                          <a id="btn-query-add" href="#" class="btn btn-primary">Add to current selection</a>
                                          <a id="btn-query-in" href="#" class="btn btn-primary">Select in current selection</a>
                                          <a id="btn-close-query" href="#" class="btn btn-default">Close</a>
                                        </div>
                                    </div>
                                </form>
                            </div>''')
    if "Help" in widgets:
        tools.append('<li><a href="help/help.html"><i class="glyphicon glyphicon-question-sign"></i>Help</a></li>')
    if "Add layer" in widgets:
        tools.append('<li><a onclick="addLayerFromFile()" href="#"><i class="glyphicon glyphicon-open"></i>Add layer</a></li>')
    if "Export as image" in widgets:
        tools.append('<li><a onclick="saveAsPng()" href="#" id="export-as-image"><i class="glyphicon glyphicon-camera"></i>Export as image</a></li>')
    if "Attributes table" in widgets:
        tools.append('<li><a onclick="showAttributesTable()" href="#"><i class="glyphicon glyphicon-list-alt"></i>Attributes table</a></li>')
        panels.append('<div class="attributes-table"><a href="#" id="attributes-table-closer" class="attributes-table-closer">Close</a></div>')
    if "Print" in widgets:
        li = "\n".join(['''<li><img style=" border:1px solid #333333;" src="print/%(lay)s_thumbnail.png"/>
                            <a onclick="printMap('%(lay)s')" href="#">%(lay)s</a></li>
                            <li class="nav-divider"></li>'''
                        % {"lay": c.composerWindow().windowTitle()} for c in iface.activeComposers()])
        tools.append('''<li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            <i class="glyphicon glyphicon-print"></i> Print
            <span class="caret"><span></a>
            <ul class="dropdown-menu" style="text-align:center;">
              %s
            </ul>
          </li>''' % li)
        scriptsBottom.append('<script src="print/layouts.js"></script>')
        scripts.append('''<script src="./resources/bootbox.min.js"></script>''')
    if "Measure tool" in widgets:
        tools.append('''<li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown"> Measure <span class="caret"><span> </a>
                            <ul class="dropdown-menu">
                              <li><a onclick="measureTool('distance')" href="#">Distance</a></li>
                              <li><a onclick="measureTool('area')" href="#">Area</a></li>
                              <li><a onclick="measureTool(null)" href="#">Remove measurements</a></li>
                            </ul>
                          </li>''')
    if "Chart tool" in widgets:
        params = widgets["Chart tool"]
        li = "\n".join(["<li><a onclick=\"openChart('%s')\" href=\"#\">%s</a></li>" % (c,c) for c in params["charts"]])
        tools.append('''<li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="glyphicon glyphicon-stats"></i> Charts <span class="caret"><span></a>
                            <ul class="dropdown-menu">
                              %s
                            </ul>
                          </li>''' % li)
        scripts.append('''<script src="./resources/d3.min.js"></script>
                        <script src="./resources/c3.min.js"></script>
                        <link href="./resources/c3.min.css" rel="stylesheet" type="text/css"/>
                        <script src="./charts.js"></script>''')
        panels.append('''<div class="chart-panel" id="chart-panel">
                        <span class="chart-panel-info" id="chart-panel-info"></span>
                        <a href="#" id="chart-panel-closer" class="chart-panel-closer">Close</a>
                        <div id="chart"></div></div>''')
        chartsFilepath = os.path.join(folder, "charts.js")
        with open(chartsFilepath, "w") as f:
            f.write("var AGGREGATION_MIN = 0;")
            f.write("var AGGREGATION_MAX = 1;")
            f.write("var AGGREGATION_SUM = 2;")
            f.write("var AGGREGATION_AVG = 3;")
            f.write("var DISPLAY_MODE_FEATURE = 0;")
            f.write("var DISPLAY_MODE_CATEGORY = 1;")
            f.write("var DISPLAY_MODE_COUNT = 2;")
            f.write("var charts = " + json.dumps(params["charts"]))
    if "About panel" in widgets:
        params = widgets["About panel"]
        closer = ('<a class="closer-icon" id="closer-icon" onclick="toggleAboutPanel(false)">&times;</a>'
                 if params["isClosable"] else "")
        mappanels.append('''<div class="about-panel" id="about-panel">
                        %s
                        %s</div>''' % (closer, params["content"]))
        if params["showNavBarLink"]:
            tools.append('<li><a onclick="toggleAboutPanel(true)" href="#" id="about-panel-link">About</a></li>')

    bookmarkEvents = ""
    if "Bookmarks" in widgets:
        params = widgets["Bookmarks"]
        bookmarks = params["bookmarks"]
        if bookmarks:
            scriptsBottom.append('<script src="./bookmarks.js"></script>')
            if params["format"] != SHOW_BOOKMARKS_IN_MENU:
                itemBase = '''<div class="item %s">
                              <div class="header-text hidden-xs">
                                  <div class="col-md-12 text-center">
                                      <h2>%s</h2>
                                      <p>%s</p>
                                  </div>
                              </div>
                            </div>'''
                bookmarkDivs = itemBase % ("active", params["introTitle"], params["introText"])
                bookmarkDivs += "\n".join([itemBase % ("", b[0], b[2]) for i,b in enumerate(bookmarks)])
                if params["showIndicators"]:
                    li = "\n".join(['<li data-target="#story-carousel" data-slide-to="%i"></li>' % (i+1) for i in xrange(len(bookmarks))])
                    indicators = '''<ol class="carousel-indicators">
                                        <li data-target="#story-carousel" data-slide-to="0" class="active"></li>
                                        %s
                                    </ol>''' % li
                else:
                    indicators = ""
                slide = "slide" if params["interval"] else ""
                interval = str(params["interval"] * 1000) if params["interval"] else "false"
                mappanels.append('''<div class="story-panel">
                      <div class="row">
                          <div id="story-carousel" class="carousel %s" data-interval="%s" data-ride="carousel">
                            %s
                            <div class="carousel-inner">
                                %s
                            </div>
                          </div>
                          <a class="left carousel-control" href="#story-carousel" data-slide="prev">
                              <span class="glyphicon glyphicon-chevron-left">&nbsp;</span>
                          </a>
                          <a class="right carousel-control" href="#story-carousel" data-slide="next">
                              <span class="glyphicon glyphicon-chevron-right">&nbsp;</span>
                          </a>
                      </div>
                    </div>
                    ''' % (slide, interval, indicators, bookmarkDivs))
                bookmarkEvents = '''\n$("#story-carousel").on('slide.bs.carousel', function(evt) {
                                          %sToBookmark($(evt.relatedTarget).index()-1)
                                    })''' % ["go", "pan", "fly"][params["format"]]
            else:
                li = "\n".join(["<li><a onclick=\"goToBookmarkByName('%s')\" href=\"#\">%s</a></li>" % (b[0],b[0]) for b in params["bookmarks"]])
                tools.append('''<li class="dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"> Bookmarks <span class="caret"><span></a>
                    <ul class="dropdown-menu">
                      %s
                    </ul>
                  </li>''' % li)
            bookmarksFilepath = os.path.join(folder, "bookmarks.js")
            with open(bookmarksFilepath, "w") as f:
                bookmarksWithoutDescriptions = [b[:-1] for b in bookmarks]
                f.write("var bookmarks = " + json.dumps(bookmarksWithoutDescriptions))
                f.write(bookmarkEvents)


    if "Layers list" in widgets and widgets["Layers list"]["showOpacity"]:
        scripts.append('<script src="./resources/bootstrap-slider.js"></script>')
        scripts.append('<link href="./resources/slider.css" rel="stylesheet"/>')
    if "3D view" in widgets:
        scripts.append('<script src="./resources/Cesium.js"></script>')
        scripts.append('<script src="./resources/ol3cesium.js"></script>')

    logoImg = appdef["Settings"]["Logo"].strip()
    if logoImg:
        logo = '<img class="pull-left" style="margin:5px;height:calc(100%%-10px);" src="logo.png"></img>'
        ext = os.path.splitext(logoImg)[1]
        shutil.copyfile(logoImg, os.path.join(folder, "logo" + ext))
    else:
        logo = ""
    values = {"@TITLE@": appdef["Settings"]["Title"],
              "@LOGO@": logo,
                "@SCRIPTS@": "\n".join(set(scripts)),
                "@SCRIPTSBOTTOM@": "\n".join(set(scriptsBottom)),
                "@MAPPANELS@": "\n".join(mappanels),
                "@PANELS@": "\n".join(panels),
                "@TOOLBAR@": "\n".join(tools)}

    template = os.path.join(os.path.dirname(__file__), "themes", theme, theme + ".html")
    html = replaceInTemplate(template, values)
    return html


def writeLayersAndGroups(appdef, folder):
    base = appdef["Base layers"]
    layers = appdef["Layers"]
    deploy = appdef["Deploy"]
    groups = appdef["Groups"]
    widgets = appdef["Widgets"]
    baseJs =[]
    for b in base:
        if b in baseLayers:
            baseJs.append(baseLayers[b])
        elif b in baseOverlays:
            baseJs.append(baseOverlays[b])
    baseLayer = "baseLayers = [%s];" % ",".join(baseJs)

    groupBaseLayers = appdef["Settings"]["Group base layers"]
    if groupBaseLayers:
        baseLayer += "var baseLayersGroup = new ol.layer.Group({'type': 'base', 'title': 'Base maps', layers: baseLayers});"

    if "Overview map" in widgets:
        overviewMapBaseLayerName = widgets["Overview map"]["Base layer"]
        if overviewMapBaseLayerName == "Use main map base layer":
            baseLayer += "var overviewMapBaseLayer = baseLayersGroup"
        else:
            baseLayer += "var overviewMapBaseLayer = %s;" % baseLayers[overviewMapBaseLayerName]

    layerVars = []
    for layer in layers:
        layerTitle = layer.layer.name() if layer.showInControls else None
        layerVars.append(layerToJavascript(layer, appdef["Settings"], deploy, layerTitle))
    layerVars = "\n".join(layerVars)
    groupVars = ""
    groupedLayers = {}
    for group, groupDef in groups.iteritems():
		groupLayers = groupDef["layers"]
		groupVars +=  ('''var %s = new ol.layer.Group({
                                layers: [%s],
                                showContent: %s,
                                title: "%s"});\n''' %
                ("group_" + safeName(group), ",".join(["lyr_" + safeName(layer.name()) for layer in groupLayers]),
                str(groupDef["showContent"]).lower(), group))
		for layer in groupLayers:
			groupedLayers[layer.id()] = safeName(group)

    visibility = "\n".join(["lyr_%s.setVisible(%s);" % (safeName(layer.layer.name()),
                                                str(layer.visible).lower()) for layer in layers])

    layersList = []
    usedGroups = []
    for appLayer in layers:
        layer = appLayer.layer
        if layer.id() in groupedLayers:
            groupName = groupedLayers[layer.id()]
            if groupName not in usedGroups:
                layersList.append("group_" + safeName(groupName))
                usedGroups.append(groupName)
        else:
            layersList.append("lyr_" + safeName(layer.name()))

    layersList = "var layersList = [%s];" % ",".join([layer for layer in layersList])
    if base:
        if groupBaseLayers:
            layersList += "layersList.unshift(baseLayersGroup);"
        else:
            layersList += "Array.prototype.splice.apply(layersList, [0, 0].concat(baseLayers));"

    path = os.path.join(folder, "layers")
    if not QDir(path).exists():
        QDir().mkpath(path)
    filename = os.path.join(path, "layers.js")
    with codecs.open(filename, "w","utf-8") as f:
        f.write(baseLayer + "\n")
        f.write(layerVars + "\n")
        f.write(groupVars + "\n")
        f.write(visibility + "\n")
        f.write(layersList + "\n")


def writeLegendFiles(appdef, folder):
    layers = appdef["Layers"]
    legend = {}
    legendFolder = os.path.join(folder, "legend")
    if not QDir(legendFolder).exists():
        QDir().mkpath(legendFolder)
    for ilayer, applayer in enumerate(layers):
        if applayer.timeInfo is not None:
            continue
        layer = applayer.layer
        symbols = getLegendSymbols(layer, ilayer, legendFolder)
        if symbols:
            legend[layer.name()] = symbols

    with open(os.path.join(legendFolder, "legend.js"), "w") as f:
        f.write("var legendData = %s;" % json.dumps(legend))

def getLegendSymbols(layer, ilayer, legendFolder):
    size = 20
    qsize = QSize(size, size)
    symbols = {}
    if layer.type() == layer.VectorLayer:
        renderer = layer.rendererV2()
        if isinstance(renderer, QgsSingleSymbolRendererV2):
                img = renderer.symbol().asImage(qsize)
                symbolPath = os.path.join(legendFolder, "%i_0.png" % (ilayer))
                img.save(symbolPath)
                symbols[""] = os.path.basename(symbolPath)
        elif isinstance(renderer, QgsCategorizedSymbolRendererV2):
            for isymbol, cat in enumerate(renderer.categories()):
                img = cat.symbol().asImage(qsize)
                symbolPath = os.path.join(legendFolder, "%i_%i.png" % (ilayer, isymbol))
                img.save(symbolPath)
                symbols[cat.label()] = os.path.basename(symbolPath)
        elif isinstance(renderer, QgsGraduatedSymbolRendererV2):
            for isymbol, ran in renderer.ranges():
                img = ran.symbol().asImage(qsize)
                symbolPath = os.path.join(legendFolder, "%i_%i.png" % (ilayer, isymbol))
                img.save(symbolPath)
                symbols["%s-%s" % (ran.lowerValue(), ran.upperValue())] = os.path.basename(symbolPath)
    elif layer.providerType() == "wms":
        source = layer.source()
        layerName = re.search(r"layers=(.*?)(?:&|$)", source).groups(0)[0]
        url = re.search(r"url=(.*?)(?:&|$)", source).groups(0)[0]
        styles = re.search(r"styles=(.*?)(?:&|$)", source).groups(0)[0]
        fullUrl = ("%s?LAYER=%s&STYLES=%s&REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=%i&HEIGHT=%i"
                   % (url, layerName, styles, size, size))
        response = requests.get(fullUrl, stream=True)
        symbolPath = os.path.join(legendFolder, "%i_0.png" % ilayer)
        with open(symbolPath, 'wb') as f:
            shutil.copyfileobj(response.raw, f)
        del response
        symbols[""] = os.path.basename(symbolPath)
    return symbols

def bounds(useCanvas, layers, crsid):
    extent = None
    if useCanvas:
        canvas = iface.mapCanvas()
        canvasCrs = canvas.mapSettings().destinationCrs()
        transform = QgsCoordinateTransform(canvasCrs, QgsCoordinateReferenceSystem(crsid))
        try:
            extent = transform.transform(canvas.extent())
        except:
            extent = None
    if extent is None:
        for layer in layers:
            transform = QgsCoordinateTransform(layer.layer.crs(), QgsCoordinateReferenceSystem(crsid))
            try:
                layerExtent = transform.transform(layer.layer.extent())
                if extent is None:
                    extent = layerExtent
                else:
                    extent.combineExtentWith(layerExtent)
            except QgsCsException:
                pass

    if extent is None:
        extent = QgsRectangle(-180, -90, 180, 90)
        transform = QgsCoordinateTransform(QgsCoordinateReferenceSystem("ESPG:4326"), QgsCoordinateReferenceSystem(crsid))
        extent = transform.transform(extent)

    return "[%f, %f, %f, %f]" % (extent.xMinimum(), extent.yMinimum(),
                                extent.xMaximum(), extent.yMaximum())

def writePrintFiles(appdef, folder):
    printFolder = os.path.join(folder, "print")
    if not QDir(printFolder).exists():
        QDir().mkpath(printFolder)
    dpis = [75, 150, 300]
    layoutDefs = {}
    def getCoords(item):
        coords = {}
        pos = item.pos()
        coords["x"] = pos.x()
        coords["y"] = pos.y()
        rect = item.rect()
        coords["width"] = rect.width()
        coords["height"] = rect.height()
        return coords
    for composer in iface.activeComposers():
        name = composer.composerWindow().windowTitle()
        layoutDef = []
        composition = composer.composition()
        img = composition.printPageAsRaster(0)
        img = img.scaledToHeight(100, Qt.SmoothTransformation)
        img.save(os.path.join(printFolder, "%s_thumbnail.png" % name))
        for item in composition.items():
            element = None
            if isinstance(item, QgsComposerLegend):
                element = getCoords(item)
                for dpi in dpis:
                    root = QgsProject.instance().layerTreeRoot()
                    model = QgsLayerTreeModel(root)
                    settings = QgsLegendSettings()
                    settings.setTitle("")
                    settings.setSymbolSize(QSizeF(item.symbolWidth(), item.symbolHeight()))
                    settings.setBoxSpace(item.boxSpace())
                    r = QgsLegendRenderer(model, settings)
                    size = r.minimumSize()
                    dpmm = dpi / 25.4
                    s = QSize(size.width() * dpmm, size.height() * dpmm)
                    img = QImage(s, QImage.Format_ARGB32_Premultiplied)
                    img.fill(Qt.transparent)
                    painter = QPainter(img)
                    painter.scale(dpmm, dpmm)
                    item.paintAndDetermineSize(painter)
                    painter.end()
                    img.save(os.path.join(printFolder, "%s_legend_%s.png" % (name, str(dpi))))
            elif isinstance(item, QgsComposerScaleBar):
                element = getCoords(item)
                for dpi in dpis:
                    width = item.rect().width()
                    height = item.rect().height()
                    dpmm = dpi / 25.4
                    s = QSize(width * dpmm, height * dpmm)
                    img = QImage(s, QImage.Format_ARGB32_Premultiplied)
                    img.fill(Qt.transparent)
                    painter = QPainter(img)
                    painter.scale(dpmm, dpmm)
                    item.paint(painter, None, None)
                    painter.end()
                    img.save(os.path.join(printFolder, "%s_scalebar_%s.png" % (name, str(dpi))))
            elif isinstance(item, QgsComposerLabel):
                element = getCoords(item)
                element["name"] = item.text()
                element["size"] = item.font().pointSize()
                element["font"] = item.font().rawName()
            elif isinstance(item, (QgsComposerMap, QgsComposerArrow)):
                element = getCoords(item)
            if element is not None:
                element["type"] = item.__class__.__name__[11:].lower()
                layoutDef.append(element)
        if layoutDef:
            layoutDefs[name] = layoutDef

    with open(os.path.join(printFolder, "layouts.js"), "w") as f:
        f.write("var printLayouts = %s;" % json.dumps(layoutDefs))

def writeHelpFiles(appdef, folder):
    helpFolder = os.path.join(folder, "help")
    if not QDir(helpFolder).exists():
        QDir().mkpath(helpFolder)
    content = ""
    sections = ""
    for widget in appdef["Widgets"]:
        widgetName = safeName(widget)
        widgetFolder = os.path.join(os.path.dirname(__file__), "help", widgetName)
        file = os.path.join(widgetFolder, "description.html")
        if os.path.exists(file):
            with open(path) as f:
                content += "".join(f.readlines())
                sections += '<li><a href="%s">%s</a></li>' % (widget, widgetName)
            fileList = [os.path.join(widgetFolder, fname) for fname in os.listdir(widgetFolder)
                                                        if fname.lower().endswith("png")]
            for f in fileList:
                shutil.copy2(f, helpFolder)

    values = {"@SECTIONS@": sections, "@TITLE@": appdef["Settings"]["Title"],
              "@CONTENT@": content}
    templatePath = os.path.join(os.path.dirname(__file__), "help", "base.html")
    html = replaceInTemplate(templatePath, values)

    with open(os.path.join(helpFolder, "help.html"), "w") as f:
        f.write(html)

