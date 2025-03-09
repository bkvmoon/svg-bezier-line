"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeArrow = exports.createOrUpdateArrow = void 0;
const get_1 = __importDefault(require("lodash/get"));
const helper_1 = require("./util/helper");
const const_1 = require("./const");
const svg_utils_1 = require("./svg/svg_utils");
const ARROW_ID_PREFIX = `${const_1.ARROW_LINE_PREFIX}-MARKER-`;
const nextArrowId = (0, helper_1.getCounter)();
const arrowCache = new Map();
const getArrowOptionsAndKey = (options) => {
    const arrowType = (0, get_1.default)(options, "endpoint.type");
    const fillColor = (0, get_1.default)(options, "endpoint.fillColor");
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
        key: `${arrowType}-${fillColor}-${id}`,
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
    const arrow = arrowCache.get(key);
    if (!arrow) {
        const arrowId = `${ARROW_ID_PREFIX}${(0, get_1.default)(baseOpts, "endpoint.arrowIdentifier") || nextArrowId()}`;
        svg.createArrow(arrowId, options, pathArr);
        arrowCache.set(key, arrowId);
        return arrowId;
    }
    else {
        const gEl = document.getElementById(arrow);
        if (gEl) {
            // const xOffsetHead: number = pathArr.x2 - pathArr.arrowHeadOffset.x;
            // const yOffsetHead: number = pathArr.y2 - pathArr.arrowHeadOffset.y;
            // const xOffsetTail: number = pathArr.x1 - pathArr.arrowTailOffset.x;
            // const yOffsetTail: number = pathArr.y1 - pathArr.arrowTailOffset.y;
            // const translate: string = `translate(${xOffsetHead},${yOffsetHead}) rotate(${pathArr.headOrient}) scale(${pathArr.fHeadSize})`;
            gEl.setAttribute("transform", (0, svg_utils_1.getTranslateString)(pathArr));
        }
    }
    return arrow;
};
const createOrUpdateArrow = (svg, options, pathArr) => {
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
exports.createOrUpdateArrow = createOrUpdateArrow;
//# sourceMappingURL=arrow.js.map