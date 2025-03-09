"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ARROW_LINE_PREFIX = exports.LineStyle = exports.EndpointPosition = exports.EndpointType = exports.cArrowShapes = exports.arrowShapes = exports.cAnchorEdge = exports.cPaths = void 0;
exports.cPaths = ["smooth", "grid", "straight"];
exports.cAnchorEdge = [
    "middle",
    "left",
    "right",
    "top",
    "bottom",
    "auto",
];
exports.arrowShapes = {
    arrow1: {
        svgElem: '<path d="M 0 0 L 1 0.5 L 0 1 L 0.25 0.5 z" />',
        offsetForward: 0.25,
    },
    heart: {
        svgElem: '<path d="M 0,0.25 A 0.125,0.125 0,0,1 0.5,0.25 A 0.125,0.125 0,0,1 1,0.25 Q 1,0.625 0.5,1 Q 0,0.625 0,0.25 z" />',
        offsetForward: 0.1,
    },
    circle: {
        svgElem: "<circle r={0.5} cx={0.5} cy={0.5} />",
        offsetForward: 0,
    },
};
exports.cArrowShapes = Object.keys(exports.arrowShapes);
exports.EndpointType = {
    arrowHeadFilled: "arrowHeadFilled",
    arrowHead: "arrowHead",
    squares: "squares",
    circles: "circles",
    custom: "custom",
    none: "none",
};
exports.EndpointPosition = {
    START: "start",
    END: "end",
    BOTH: "both",
};
exports.LineStyle = {
    dot: "1 1",
    dash: "4 1",
    solid: "",
    dotdash: "1 1 4 1",
};
exports.ARROW_LINE_PREFIX = `__arrowLineInternal`;
//# sourceMappingURL=const.js.map