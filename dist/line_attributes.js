"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const const_1 = require("./const");
function lineAttributes(options) {
    const result = {};
    if (options.lineStyle) {
        result["stroke-dasharray"] = const_1.LineStyle[options.lineStyle];
    }
    if (options.strokeWidth) {
        result["stroke-width"] = options.strokeWidth;
    }
    result["stroke"] = options.color || "red";
    result["fill"] = options.fill || "transparent";
    result["pointer-events"] = "visibleStroke";
    return result;
}
exports.default = lineAttributes;
//# sourceMappingURL=line_attributes.js.map