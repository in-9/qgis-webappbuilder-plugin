import RRRRRReact from 'react';
import ReactDOM from 'react-dom';
import ol from 'openlayers';
import {IntlProvider} from 'react-intl';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Button from 'boundless-sdk/components/Button';
import enMessages from 'boundless-sdk/locale/en';
import InfoPopup from 'boundless-sdk/components/InfoPopup';
import MapPanel from 'boundless-sdk/components/MapPanel';
import LayerList from 'boundless-sdk/components/LayerList';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

var defaultFill = new ol.style.Fill({
   color: 'rgba(255,255,255,0.4)'
 });
 var defaultStroke = new ol.style.Stroke({
   color: '#3399CC',
   width: 1.25
 });
 var defaultSelectionFill = new ol.style.Fill({
   color: 'rgba(255,255,0,0.4)'
 });
 var defaultSelectionStroke = new ol.style.Stroke({
   color: '#FFFF00',
   width: 1.25
 });


var categories_wb = function() {
    return {
        "ABW": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(178,96,215,1.0)"
            })
        })],
        "AFG": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(115,233,222,1.0)"
            })
        })],
        "AGO": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(158,99,225,1.0)"
            })
        })],
        "AIA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(140,40,212,1.0)"
            })
        })],
        "ALA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(153,202,17,1.0)"
            })
        })],
        "ALB": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(202,34,46,1.0)"
            })
        })],
        "AND": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(209,83,116,1.0)"
            })
        })],
        "ANT": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(165,200,77,1.0)"
            })
        })],
        "ARE": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(201,47,129,1.0)"
            })
        })],
        "ARG": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(218,224,89,1.0)"
            })
        })],
        "ARM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(114,233,198,1.0)"
            })
        })],
        "ASM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(53,19,205,1.0)"
            })
        })],
        "ATA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(157,223,127,1.0)"
            })
        })],
        "ATF": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(224,56,216,1.0)"
            })
        })],
        "ATG": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(229,70,197,1.0)"
            })
        })],
        "AUS": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(141,13,205,1.0)"
            })
        })],
        "AUT": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(108,103,237,1.0)"
            })
        })],
        "AZE": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(56,111,206,1.0)"
            })
        })],
        "BDI": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(136,233,190,1.0)"
            })
        })],
        "BEL": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(127,69,208,1.0)"
            })
        })],
        "BEN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(84,212,135,1.0)"
            })
        })],
        "BFA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(35,148,213,1.0)"
            })
        })],
        "BGD": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(188,127,226,1.0)"
            })
        })],
        "BGR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(90,226,97,1.0)"
            })
        })],
        "BHR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(94,66,208,1.0)"
            })
        })],
        "BHS": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(33,231,86,1.0)"
            })
        })],
        "BIH": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(225,166,76,1.0)"
            })
        })],
        "BLM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(205,74,59,1.0)"
            })
        })],
        "BLR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(70,133,234,1.0)"
            })
        })],
        "BLZ": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(215,206,24,1.0)"
            })
        })],
        "BMU": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(135,222,167,1.0)"
            })
        })],
        "BOL": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(135,222,167,1.0)"
            })
        })],
        "BRA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(219,67,161,1.0)"
            })
        })],
        "BRB": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(201,90,103,1.0)"
            })
        })],
        "BRN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(160,74,235,1.0)"
            })
        })],
        "BTN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(29,43,237,1.0)"
            })
        })],
        "BVT": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(209,123,140,1.0)"
            })
        })],
        "BWA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(233,39,130,1.0)"
            })
        })],
        "CAF": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(213,132,40,1.0)"
            })
        })],
        "CAN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(103,232,226,1.0)"
            })
        })],
        "CCK": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(132,203,107,1.0)"
            })
        })],
        "CHE": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(115,234,104,1.0)"
            })
        })],
        "CHL": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(235,87,102,1.0)"
            })
        })],
        "CHN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(93,83,205,1.0)"
            })
        })],
        "CIV": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(127,216,194,1.0)"
            })
        })],
        "CMR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(122,93,228,1.0)"
            })
        })],
        "COD": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(41,231,197,1.0)"
            })
        })],
        "COG": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(232,134,115,1.0)"
            })
        })],
        "COK": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(217,117,234,1.0)"
            })
        })],
        "COL": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(134,215,87,1.0)"
            })
        })],
        "COM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(110,179,210,1.0)"
            })
        })],
        "CPV": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(62,107,221,1.0)"
            })
        })],
        "CRI": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(231,132,99,1.0)"
            })
        })],
        "CUB": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(235,121,224,1.0)"
            })
        })],
        "CXR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(221,49,49,1.0)"
            })
        })],
        "CYM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(137,232,110,1.0)"
            })
        })],
        "CYP": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(71,211,97,1.0)"
            })
        })],
        "CZE": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(90,157,212,1.0)"
            })
        })],
        "DEU": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(226,154,29,1.0)"
            })
        })],
        "DJI": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(213,174,55,1.0)"
            })
        })],
        "DMA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(204,151,94,1.0)"
            })
        })],
        "DNK": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(232,48,23,1.0)"
            })
        })],
        "DOM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(232,48,23,1.0)"
            })
        })],
        "DZA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(76,206,180,1.0)"
            })
        })],
        "ECU": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(209,66,109,1.0)"
            })
        })],
        "EGY": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(108,208,122,1.0)"
            })
        })],
        "ERI": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(205,57,224,1.0)"
            })
        })],
        "ESH": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(89,116,204,1.0)"
            })
        })],
        "ESP": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(212,74,212,1.0)"
            })
        })],
        "EST": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(110,97,222,1.0)"
            })
        })],
        "ETH": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(230,56,155,1.0)"
            })
        })],
        "FIN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(224,133,80,1.0)"
            })
        })],
        "FJI": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(27,30,215,1.0)"
            })
        })],
        "FLK": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(178,209,22,1.0)"
            })
        })],
        "FRA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(219,66,68,1.0)"
            })
        })],
        "FRO": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(82,224,34,1.0)"
            })
        })],
        "FSM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(214,210,75,1.0)"
            })
        })],
        "GAB": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(233,104,171,1.0)"
            })
        })],
        "GBR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(238,139,222,1.0)"
            })
        })],
        "GEO": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(227,138,55,1.0)"
            })
        })],
        "GGY": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(228,111,56,1.0)"
            })
        })],
        "GHA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(20,221,215,1.0)"
            })
        })],
        "GIB": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(103,39,240,1.0)"
            })
        })],
        "GIN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(210,170,76,1.0)"
            })
        })],
        "GLP": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(116,192,213,1.0)"
            })
        })],
        "GMB": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(75,30,207,1.0)"
            })
        })],
        "GNB": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(229,195,58,1.0)"
            })
        })],
        "GNQ": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(171,215,95,1.0)"
            })
        })],
        "GRC": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(224,57,82,1.0)"
            })
        })],
        "GRD": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(236,239,40,1.0)"
            })
        })],
        "GRL": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(125,219,193,1.0)"
            })
        })],
        "GTM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(215,22,55,1.0)"
            })
        })],
        "GUF": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(104,200,136,1.0)"
            })
        })],
        "GUM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(48,200,114,1.0)"
            })
        })],
        "GUY": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(172,71,230,1.0)"
            })
        })],
        "HKG": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(183,71,205,1.0)"
            })
        })],
        "HMD": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(194,208,82,1.0)"
            })
        })],
        "HND": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(109,131,225,1.0)"
            })
        })],
        "HRV": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(173,207,60,1.0)"
            })
        })],
        "HTI": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(220,104,133,1.0)"
            })
        })],
        "HUN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(194,115,213,1.0)"
            })
        })],
        "IDN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(206,103,101,1.0)"
            })
        })],
        "IMN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(199,88,229,1.0)"
            })
        })],
        "IND": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(166,238,135,1.0)"
            })
        })],
        "IOT": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(171,233,105,1.0)"
            })
        })],
        "IRL": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(36,194,214,1.0)"
            })
        })],
        "IRN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(114,229,122,1.0)"
            })
        })],
        "IRQ": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(178,236,60,1.0)"
            })
        })],
        "ISL": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(202,81,74,1.0)"
            })
        })],
        "ISR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(154,208,93,1.0)"
            })
        })],
        "ITA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(60,145,206,1.0)"
            })
        })],
        "JAM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(154,203,105,1.0)"
            })
        })],
        "JEY": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(218,34,191,1.0)"
            })
        })],
        "JOR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(199,105,227,1.0)"
            })
        })],
        "JPN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(25,227,48,1.0)"
            })
        })],
        "KAZ": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(219,117,43,1.0)"
            })
        })],
        "KEN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(233,150,129,1.0)"
            })
        })],
        "KGZ": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(209,195,89,1.0)"
            })
        })],
        "KHM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(125,186,212,1.0)"
            })
        })],
        "KIR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(73,44,237,1.0)"
            })
        })],
        "KNA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(27,210,226,1.0)"
            })
        })],
        "KOR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(216,75,129,1.0)"
            })
        })],
        "KWT": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(201,168,97,1.0)"
            })
        })],
        "LAO": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(115,199,218,1.0)"
            })
        })],
        "LBN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(115,199,218,1.0)"
            })
        })],
        "LBR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(215,122,183,1.0)"
            })
        })],
        "LBY": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(215,122,183,1.0)"
            })
        })],
        "LCA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(196,229,125,1.0)"
            })
        })],
        "LIE": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(201,96,175,1.0)"
            })
        })],
        "LKA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(28,138,211,1.0)"
            })
        })],
        "LSO": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(77,58,205,1.0)"
            })
        })],
        "LTU": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(149,61,215,1.0)"
            })
        })],
        "LUX": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(221,119,41,1.0)"
            })
        })],
        "LVA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(227,83,145,1.0)"
            })
        })],
        "MAC": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(67,88,222,1.0)"
            })
        })],
        "MAF": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(203,148,121,1.0)"
            })
        })],
        "MAR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(215,181,56,1.0)"
            })
        })],
        "MCO": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(164,120,206,1.0)"
            })
        })],
        "MDA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(76,230,79,1.0)"
            })
        })],
        "MDG": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(70,123,227,1.0)"
            })
        })],
        "MDV": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(214,92,137,1.0)"
            })
        })],
        "MEX": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(167,200,46,1.0)"
            })
        })],
        "MHL": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(36,121,223,1.0)"
            })
        })],
        "MKD": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(205,110,103,1.0)"
            })
        })],
        "MLI": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(31,226,93,1.0)"
            })
        })],
        "MLT": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(137,227,182,1.0)"
            })
        })],
        "MMR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(212,67,159,1.0)"
            })
        })],
        "MNE": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(226,114,16,1.0)"
            })
        })],
        "MNG": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(19,229,145,1.0)"
            })
        })],
        "MNP": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(153,216,119,1.0)"
            })
        })],
        "MOZ": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(129,205,62,1.0)"
            })
        })],
        "MRT": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(221,131,135,1.0)"
            })
        })],
        "MSR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(28,201,57,1.0)"
            })
        })],
        "MTQ": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(147,224,91,1.0)"
            })
        })],
        "MUS": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(209,215,114,1.0)"
            })
        })],
        "MWI": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(211,126,204,1.0)"
            })
        })],
        "MYS": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(91,194,214,1.0)"
            })
        })],
        "MYT": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(204,158,29,1.0)"
            })
        })],
        "NAM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(60,213,178,1.0)"
            })
        })],
        "NCL": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(156,120,209,1.0)"
            })
        })],
        "NER": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(134,143,222,1.0)"
            })
        })],
        "NFK": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(70,223,129,1.0)"
            })
        })],
        "NGA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(49,78,223,1.0)"
            })
        })],
        "NIC": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(121,205,198,1.0)"
            })
        })],
        "NIU": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(89,185,223,1.0)"
            })
        })],
        "NLD": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(166,35,218,1.0)"
            })
        })],
        "NOR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(216,65,138,1.0)"
            })
        })],
        "NPL": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(128,220,52,1.0)"
            })
        })],
        "NRU": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(130,207,219,1.0)"
            })
        })],
        "NZL": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(27,36,222,1.0)"
            })
        })],
        "OMN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(213,240,91,1.0)"
            })
        })],
        "PAK": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(58,235,173,1.0)"
            })
        })],
        "PAN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(209,195,62,1.0)"
            })
        })],
        "PCN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(149,220,55,1.0)"
            })
        })],
        "PER": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(225,140,29,1.0)"
            })
        })],
        "PHL": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(94,42,216,1.0)"
            })
        })],
        "PLW": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(220,153,59,1.0)"
            })
        })],
        "PNG": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(210,195,23,1.0)"
            })
        })],
        "POL": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(65,65,231,1.0)"
            })
        })],
        "PRI": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(117,172,230,1.0)"
            })
        })],
        "PRK": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(115,216,97,1.0)"
            })
        })],
        "PRT": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(96,127,214,1.0)"
            })
        })],
        "PRY": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(27,240,141,1.0)"
            })
        })],
        "PSE": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(38,129,219,1.0)"
            })
        })],
        "PYF": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(179,20,236,1.0)"
            })
        })],
        "QAT": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(232,124,105,1.0)"
            })
        })],
        "REU": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(71,219,71,1.0)"
            })
        })],
        "ROU": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(184,203,15,1.0)"
            })
        })],
        "RWA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(204,34,216,1.0)"
            })
        })],
        "SAU": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(212,149,31,1.0)"
            })
        })],
        "SDN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(213,120,150,1.0)"
            })
        })],
        "SEN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(213,93,219,1.0)"
            })
        })],
        "SGP": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(41,237,156,1.0)"
            })
        })],
        "SGS": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(46,224,126,1.0)"
            })
        })],
        "SHN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(209,37,204,1.0)"
            })
        })],
        "SJM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(231,117,195,1.0)"
            })
        })],
        "SLB": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(211,98,27,1.0)"
            })
        })],
        "SLE": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(65,231,179,1.0)"
            })
        })],
        "SLV": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(201,113,132,1.0)"
            })
        })],
        "SMR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(219,133,100,1.0)"
            })
        })],
        "SOM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(232,232,135,1.0)"
            })
        })],
        "SPM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(229,197,36,1.0)"
            })
        })],
        "SRB": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(127,235,100,1.0)"
            })
        })],
        "STP": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(177,202,32,1.0)"
            })
        })],
        "SUR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(30,240,237,1.0)"
            })
        })],
        "SVK": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(238,223,136,1.0)"
            })
        })],
        "SVN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(18,240,37,1.0)"
            })
        })],
        "SWE": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(35,202,214,1.0)"
            })
        })],
        "SWZ": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(119,202,159,1.0)"
            })
        })],
        "SYC": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(173,230,92,1.0)"
            })
        })],
        "SYR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(222,71,182,1.0)"
            })
        })],
        "TCA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(52,148,232,1.0)"
            })
        })],
        "TCD": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(54,225,15,1.0)"
            })
        })],
        "TGO": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(43,169,207,1.0)"
            })
        })],
        "THA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(120,236,103,1.0)"
            })
        })],
        "TJK": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(172,210,110,1.0)"
            })
        })],
        "TKL": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(234,61,119,1.0)"
            })
        })],
        "TKM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(229,47,154,1.0)"
            })
        })],
        "TLS": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(239,117,72,1.0)"
            })
        })],
        "TON": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(14,74,202,1.0)"
            })
        })],
        "TTO": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(125,134,209,1.0)"
            })
        })],
        "TUN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(103,203,188,1.0)"
            })
        })],
        "TUR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(158,92,238,1.0)"
            })
        })],
        "TUV": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(113,44,233,1.0)"
            })
        })],
        "TWN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(25,96,202,1.0)"
            })
        })],
        "TZA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(62,125,207,1.0)"
            })
        })],
        "UGA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(162,230,117,1.0)"
            })
        })],
        "UKR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(107,232,136,1.0)"
            })
        })],
        "UMI": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(95,222,88,1.0)"
            })
        })],
        "URY": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(75,213,60,1.0)"
            })
        })],
        "USA": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(224,44,119,1.0)"
            })
        })],
        "UZB": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(16,218,60,1.0)"
            })
        })],
        "VAT": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(83,201,158,1.0)"
            })
        })],
        "VCT": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(64,57,210,1.0)"
            })
        })],
        "VEN": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(218,60,184,1.0)"
            })
        })],
        "VGB": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(210,132,218,1.0)"
            })
        })],
        "VIR": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(102,45,207,1.0)"
            })
        })],
        "VNM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(204,31,152,1.0)"
            })
        })],
        "VUT": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(201,90,60,1.0)"
            })
        })],
        "WLF": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(40,234,237,1.0)"
            })
        })],
        "WSM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(212,117,201,1.0)"
            })
        })],
        "YEM": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(53,214,193,1.0)"
            })
        })],
        "ZAF": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(50,90,231,1.0)"
            })
        })],
        "ZMB": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(236,112,238,1.0)"
            })
        })],
        "ZWE": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(91,43,223,1.0)"
            })
        })],
        "": [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: "rgba(0,0,0,1.0)",
                lineDash: null,
                width: 0
            }),
            fill: new ol.style.Fill({
                color: "rgba(54,223,228,1.0)"
            })
        })]
    };
};
var categoriesSelected_wb = {
    "ABW": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "AFG": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "AGO": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "AIA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ALA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ALB": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "AND": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ANT": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ARE": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ARG": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ARM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ASM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ATA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ATF": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ATG": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "AUS": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "AUT": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "AZE": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BDI": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BEL": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BEN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BFA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BGD": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BGR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BHR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BHS": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BIH": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BLM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BLR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BLZ": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BMU": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BOL": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BRA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BRB": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BRN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BTN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BVT": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "BWA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "CAF": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "CAN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "CCK": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "CHE": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "CHL": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "CHN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "CIV": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "CMR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "COD": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "COG": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "COK": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "COL": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "COM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "CPV": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "CRI": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "CUB": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "CXR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "CYM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "CYP": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "CZE": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "DEU": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "DJI": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "DMA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "DNK": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "DOM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "DZA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ECU": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "EGY": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ERI": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ESH": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ESP": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "EST": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ETH": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "FIN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "FJI": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "FLK": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "FRA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "FRO": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "FSM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "GAB": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "GBR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "GEO": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "GGY": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "GHA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "GIB": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "GIN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "GLP": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "GMB": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "GNB": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "GNQ": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "GRC": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "GRD": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "GRL": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "GTM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "GUF": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "GUM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "GUY": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "HKG": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "HMD": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "HND": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "HRV": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "HTI": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "HUN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "IDN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "IMN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "IND": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "IOT": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "IRL": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "IRN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "IRQ": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ISL": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ISR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ITA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "JAM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "JEY": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "JOR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "JPN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "KAZ": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "KEN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "KGZ": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "KHM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "KIR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "KNA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "KOR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "KWT": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "LAO": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "LBN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "LBR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "LBY": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "LCA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "LIE": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "LKA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "LSO": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "LTU": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "LUX": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "LVA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MAC": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MAF": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MAR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MCO": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MDA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MDG": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MDV": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MEX": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MHL": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MKD": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MLI": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MLT": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MMR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MNE": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MNG": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MNP": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MOZ": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MRT": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MSR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MTQ": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MUS": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MWI": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MYS": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "MYT": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "NAM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "NCL": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "NER": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "NFK": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "NGA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "NIC": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "NIU": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "NLD": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "NOR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "NPL": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "NRU": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "NZL": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "OMN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "PAK": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "PAN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "PCN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "PER": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "PHL": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "PLW": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "PNG": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "POL": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "PRI": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "PRK": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "PRT": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "PRY": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "PSE": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "PYF": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "QAT": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "REU": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ROU": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "RWA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SAU": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SDN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SEN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SGP": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SGS": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SHN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SJM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SLB": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SLE": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SLV": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SMR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SOM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SPM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SRB": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "STP": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SUR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SVK": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SVN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SWE": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SWZ": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SYC": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "SYR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "TCA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "TCD": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "TGO": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "THA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "TJK": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "TKL": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "TKM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "TLS": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "TON": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "TTO": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "TUN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "TUR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "TUV": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "TWN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "TZA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "UGA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "UKR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "UMI": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "URY": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "USA": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "UZB": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "VAT": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "VCT": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "VEN": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "VGB": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "VIR": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "VNM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "VUT": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "WLF": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "WSM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "YEM": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ZAF": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ZMB": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "ZWE": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })],
    "": [new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: "rgba(255, 204, 0, 1)",
            lineDash: null,
            width: 0
        }),
        fill: new ol.style.Fill({
            color: "rgba(255, 204, 0, 1)"
        })
    })]
};
var textStyleCache_wb = {}
var clusterStyleCache_wb = {}
var style_wb = function(feature, resolution) {

    var value = feature.get("iso3");
    var style = categories_wb()[value];
    var allStyles = [];

    allStyles.push.apply(allStyles, style);
    return allStyles;
};
var selectionStyle_wb = function(feature, resolution) {
    var value = feature.get("iso3");
    var style = categoriesSelected_wb[value]
    var allStyles = [];

    allStyles.push.apply(allStyles, style);
    return allStyles;
};
var baseLayers = [];
var baseLayersGroup = new ol.layer.Group({
    showContent: true,
    'type': 'base-group',
    'title': 'Base maps',
    layers: baseLayers
});
var overlayLayers = [];
var overlaysGroup = new ol.layer.Group({
    showContent: true,
    'title': 'Overlays',
    layers: overlayLayers
});
var lyr_wb = new ol.layer.Vector({
    opacity: 1.0,
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        url: './data/lyr_wb.json'
    }),

    style: style_wb,
    selectedStyle: selectionStyle_wb,
    title: "wb",
    id: "wb20170313131751544",
    filters: [],
    timeInfo: null,
    isSelectable: true,
    popupInfo: ""
});

lyr_wb.setVisible(true);
var layersList = [lyr_wb];
var view = new ol.View({
    maxZoom: 32,
    minZoom: 1,
    projection: 'EPSG:3857'
});
var originalExtent = [-58929512.932762, -8949556.070307, 58929512.932762, 19031363.739494];

var map = new ol.Map({
  layers: layersList,
  view: view,
  controls: []
});



class BasicApp extends React.Component {
  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    };
  }
  componentDidMount() {

  }
  _toggle(el) {
    if (el.style.display === 'block' || el.style.display === '') {
      el.style.display = 'none';
    } else {
      el.style.display = 'block';
    }
  }
  _toggleTable(): function() {
    this._toggle(document.getElementById('table-panel'));
    this.refs.table.getWrappedInstance().setDimensionsOnState();
  }
  _toggleWFST(): function(evt) {
    this._toggle(document.getElementById('wfst'));
  }
  _toggleQuery(): function(evt) {
    this._toggle(document.getElementById('query-panel'));
  }
  _toggleEdit(): function(evt) {
    this._toggle(document.getElementById('edit-tool-panel'));
  }
  _toggleAboutPanel: function(evt) {
    evt.preventDefault();
    this._toggle(document.getElementById('about-panel'));
  }
  _toggleChartPanel(evt) {
    evt.preventDefault();
    this._toggle(document.getElementById('chart-panel'));
  }
  render() {
    var toolbarOptions = {style:{height: 71}, showMenuIconButton: false, title:"My Web App"};
    return React.createElement("article", null,
       React.createElement(AppBar, toolbarOptions
       ),
      React.createElement("div", {id: 'content'},
        React.createElement(MapPanel, {id: 'map', map: map, extent: originalExtent, useHistory: true}
          ,
React.createElement("div", {id: 'popup', className: 'ol-popup'},
                                    React.createElement(InfoPopup, {toggleGroup: 'navigation', map: map, hover: false})
                                  )
        )
        ,
React.createElement("div",{id: "layerlist"},
                                    React.createElement(LayerList, {showOpacity:false, showDownload:false,
                                        showGroupContent:true, showZoomTo:false, allowReordering:false,
                                        allowFiltering:true, tipLabel:'layers',
                                        downloadFormat:'GeoJSON', map:map}))
      )
    );
  }
}

BasicApp.childContextTypes = {
  muiTheme: React.PropTypes.object
};

ReactDOM.render(<IntlProvider locale='en' messages={enMessages}><BasicApp /></IntlProvider>, document.getElementById('main'));
