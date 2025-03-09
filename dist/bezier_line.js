"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const line_attributes_1 = __importDefault(require("./line_attributes"));
const get_position_1 = __importDefault(require("./get_position"));
const arrow_1 = require("./arrow");
const svg_canvas_1 = __importDefault(require("./svg/svg_canvas"));
const lodash_1 = require("lodash");
const const_1 = require("./const");
const bezierLine = (source, destination, pOptions = DEFAULT_OPTIONS) => {
    const options = (0, lodash_1.merge)({}, DEFAULT_OPTIONS, pOptions);
    options.source = source;
    options.destination = destination;
    const svg = getSvgCanvas(options.svgParentSelector, options.svgStyle);
    const svgPath = svg.createPath();
    let valVars = extractStartEndPos(options);
    let pathArr = (0, get_position_1.default)(options, valVars);
    const id = `arrow-path-${(0, lodash_1.get)(options, "endpoint.arrowIdentifier")}`;
    let pathAttrs = Object.assign({ d: pathArr.arrowPath, id: id }, (0, line_attributes_1.default)(options));
    setPathAttributes(svgPath, pathAttrs);
    const arrowId = (0, arrow_1.createOrUpdateArrow)(svg, options, pathArr);
    const arrow = document.getElementById(arrowId);
    return {
        getPathId() {
            return id;
        },
        getParentSvgId() {
            return svg.parentCanvas.id;
        },
        getRawSvgPath() {
            return svgPath;
        },
        remove: () => {
            if (svgPath && svgPath.parentNode)
                svgPath.parentNode.removeChild(svgPath);
            (0, arrow_1.removeArrow)(options);
        },
        update: (pOptions) => {
            const newOptions = (0, lodash_1.merge)({}, options, pOptions);
            let valVars = extractStartEndPos(newOptions);
            let pathArr = (0, get_position_1.default)(newOptions, valVars);
            let pathAttrs = Object.assign({ d: pathArr.arrowPath, id: id }, (0, line_attributes_1.default)(options));
            setPathAttributes(svgPath, pathAttrs);
            svg.updateSvgStyle(newOptions.svgStyle);
            (0, arrow_1.createOrUpdateArrow)(svg, options, pathArr);
        },
        hide: () => {
            svgPath.style.display = "none";
            if (arrow)
                arrow.style.display = "none";
        },
        show: () => {
            svgPath.style.display = "block";
            if (arrow)
                arrow.style.display = "block";
        },
    };
};
const getPathAttributeNames = (svgPath) => {
    const result = [];
    for (let i = 0; i < svgPath.attributes.length; i++) {
        const attr = svgPath.attributes.item(i);
        if (attr !== null)
            result.push(attr.name);
    }
    return result;
};
const setPathAttributes = (svgPath, pathAttributes) => {
    getPathAttributeNames(svgPath).forEach((attrName) => svgPath.attributes.removeNamedItem(attrName));
    for (let attributeName in pathAttributes) {
        svgPath.setAttributeNS(null, attributeName, pathAttributes[attributeName]);
    }
};
const getElemPos = (elem) => {
    if (!elem) {
        return { x: 0, y: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
    }
    else {
        const pos = elem.getBoundingClientRect();
        return {
            x: pos.left,
            y: pos.top,
            left: pos.left,
            right: pos.right,
            bottom: pos.bottom,
            width: pos.width,
            height: pos.height,
        };
    }
};
const getSvgCanvas = (selector, svgStyle) => {
    let domElement;
    if (!selector) {
        domElement = svg_canvas_1.default.defaultSvgElement(svgStyle);
        return new svg_canvas_1.default(domElement);
    }
    else {
        domElement = document.querySelector(selector);
        if (!domElement) {
            console.error(`Could not find element with selector - '${selector}'`);
        }
    }
    return new svg_canvas_1.default(domElement);
};
const DEFAULT_COLOR = "red";
const DEFAULT_STROKE_WIDTH = 2;
const DEFAULT_ARROW_SIZE = 14;
const DEFAULT_OPTIONS = {
    source: null,
    destination: null,
    color: DEFAULT_COLOR,
    strokeWidth: DEFAULT_STROKE_WIDTH,
    curvature: 0.8,
    size: 8,
    svgParentSelector: null,
    startAnchor: "auto",
    endAnchor: "auto",
    svgStyle: {},
    lineStyle: "solid",
    endpoint: {
        type: const_1.EndpointType.arrowHeadFilled,
        showHead: true,
        headSize: DEFAULT_ARROW_SIZE,
        headShape: { offsetForward: 0.25, svgElem: undefined },
        showTail: false,
        tailSize: DEFAULT_ARROW_SIZE,
        tailShape: { offsetForward: 0.25, svgElem: undefined },
        fillColor: DEFAULT_COLOR,
    },
    _extendSVGcanvas: 0,
    _cpx1Offset: 0,
    _cpy1Offset: 0,
    _cpx2Offset: 0,
    _cpy2Offset: 0,
};
const extractStartEndPos = (options) => {
    let valVars = { startPos: [], endPos: [] };
    if (Array.isArray(options.source) && Array.isArray(options.destination)) {
        if (typeof options.source[0] === "string") {
            for (let i = 0; i < options.source.length; i++) {
                let ele = document.getElementById(options.source[i]);
                if (ele == null) {
                    ele = document.querySelector(options.source[i]);
                }
                if (ele !== null) {
                    const elePos = getElemPos(ele);
                    valVars.startPos.push(elePos);
                }
            }
        }
        else {
            valVars.startPos = options.source;
        }
        if (typeof options.destination[0] === "string") {
            for (let i = 0; i < options.destination.length; i++) {
                valVars.endPos.push(getElemPos(document.getElementById(options.destination[i]) ||
                    document.querySelector(options.destination[i])));
            }
        }
        else {
            valVars.endPos = options.destination;
        }
    }
    else if (typeof options.source === "string" &&
        typeof options.destination === "string") {
        valVars.startPos.push(getElemPos(document.querySelector(options.source)));
        valVars.endPos.push(getElemPos(document.querySelector(options.destination)));
    }
    return valVars;
};
exports.default = bezierLine;
//# sourceMappingURL=bezier_line.js.map