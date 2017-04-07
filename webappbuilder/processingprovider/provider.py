# -*- coding: utf-8 -*-
#
# (c) 2016 Boundless, http://boundlessgeo.com
# This code is licensed under the GPL 2.0 license.
#
import os
from PyQt4.QtGui import QIcon
from processing.core.AlgorithmProvider import AlgorithmProvider
from processing.core.ProcessingConfig import Setting, ProcessingConfig
from webappbuilder.processingprovider.createappalgorithm import CreateAppAlgorithm

class WABProvider(AlgorithmProvider):

    def __init__(self):
        AlgorithmProvider.__init__(self)

        self.activate = True

        # Load algorithms
        self.alglist = [CreateAppAlgorithm()]
        for alg in self.alglist:
            alg.provider = self

    def initializeSettings(self):
        AlgorithmProvider.initializeSettings(self)


    def unload(self):
        AlgorithmProvider.unload(self)


    def getName(self):
        return 'wab'

    def getDescription(self):
        return 'Web App Builder'

    def getIcon(self):
        return QIcon(os.path.dirname(__file__) + "/../icons/desktop.svg")

    def _loadAlgorithms(self):
        self.algs = self.alglist
