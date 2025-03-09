"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeArrow = exports.arrowOptions = void 0;
const get_1 = __importDefault(require("lodash/get"));
const helper_1 = require("./util/helper");
const const_1 = require("./const");
const ARROW_ID_PREFIX = `${const_1.ARROW_LINE_PREFIX}-MARKER-`;
const nextArrowId = (0, helper_1.getCounter)();
const arrowCache = new Map();
const getArrowOptionsAndKey = (options) => {
    const arrowType = (0, get_1.default)(options, "endpoint.type");
    const fillColor = (0, get_1.default)(options, "endpoint.fillColor");
    const size = (0, get_1.default)(options, "endpoint.size", 1);
    const id = (0, get_1.default)(options, "endpoint.arrowIdentifier");
    const opts = {
        color: options.color || "red",
        endpoint: {
            fillColor: fillColor,
            size: 1,
            type: arrowType,
            arrowIdentifier: id,
        },
    };
    return {
        key: `${options.color}-${arrowType}-${fillColor}-${size}-${id}`,
        options: opts,
    };
};
const removeArrow = (baseOpts) => {
    var _a;
    const { key, options } = getArrowOptionsAndKey(baseOpts);
    if (arrowCache.has(key)) {
        const arrow = arrowCache.get(key);
        if (arrow) {
            (_a = document.getElementById(arrow)) === null || _a === void 0 ? void 0 : _a.remove();
            arrowCache.delete(key);
            (0, helper_1.reduceCounter)();
        }
    }
};
exports.removeArrow = removeArrow;
const getArrow = (svg, baseOpts, pathArr) => {
    const { key, options } = getArrowOptionsAndKey(baseOpts);
    console.log("key...", key);
    const arrow = arrowCache.get(key);
    console.log(" arrow ...", arrow, arrow);
    if (!arrow) {
        console.log("creating arrow...");
        const arrowId = `${ARROW_ID_PREFIX}${(0, get_1.default)(baseOpts, "endpoint.arrowIdentifier") || nextArrowId()}`;
        svg.createArrow(arrowId, options, pathArr);
        arrowCache.set(key, arrowId);
        return arrowId;
    }
    else {
        const gEl = document.getElementById(arrow);
        console.log("else arrow ...", arrow, gEl);
        if (gEl) {
            console.log("pathArr y2...", pathArr.y2, pathArr.arrowHeadOffset.y);
            const xOffsetHead = pathArr.x2 - pathArr.arrowHeadOffset.x;
            const yOffsetHead = pathArr.y2 - pathArr.arrowHeadOffset.y;
            const xOffsetTail = pathArr.x1 - pathArr.arrowTailOffset.x;
            const yOffsetTail = pathArr.y1 - pathArr.arrowTailOffset.y;
            const translate = `translate(${xOffsetHead},${yOffsetHead}) rotate(${pathArr.headOrient}) scale(${pathArr.fHeadSize})`;
            gEl.setAttribute("transform", translate);
        }
    }
    return arrow;
};
const arrowOptions = (svg, options, pathArr) => {
    const endpointType = (0, get_1.default)(options, "endpoint.type");
    if (endpointType === const_1.EndpointType.none) {
        return "";
    }
    let arrowId = (0, get_1.default)(options, "endpoint.arrowIdentifier");
    if (!arrowId || !document.getElementById(arrowId)) {
        arrowId = getArrow(svg, options, pathArr);
    }
    return arrowId;
};
exports.arrowOptions = arrowOptions;
//# sourceMappingURL=arrow_options.js.map