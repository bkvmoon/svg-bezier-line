"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const svg_utils_1 = require("./svg_utils");
const const_1 = require("../const");
class SvgCanvas {
    constructor(parentCanvas) {
        this.parentCanvas = parentCanvas;
        this.parentCanvasStyle = {
            position: "absolute",
            left: "0px",
            "pointer-events": "none",
        };
    }
    createArrow(id, options, pathArr) {
        const { color, endpoint } = options;
        const sizeValue = String(endpoint.size * 10);
        const xOffsetHead = pathArr.x2 - pathArr.arrowHeadOffset.x;
        const yOffsetHead = pathArr.y2 - pathArr.arrowHeadOffset.y;
        const xOffsetTail = pathArr.x1 - pathArr.arrowTailOffset.x;
        const yOffsetTail = pathArr.y1 - pathArr.arrowTailOffset.y;
        const translate = `translate(${xOffsetHead},${yOffsetHead}) rotate(${pathArr.headOrient}) scale(${pathArr.fHeadSize})`;
        const gtag = (0, svg_utils_1.createElement)("g", {
            id: id,
            "pointer-events": "auto",
            opacity: "1",
            fill: color,
            transform: (0, svg_utils_1.getTranslateString)(pathArr),
        });
        (0, svg_utils_1.drawArrow)(gtag);
        this.parentCanvas.appendChild(gtag);
    }
    createPath() {
        const path = (0, svg_utils_1.createSvgElement)("path");
        this.parentCanvas.appendChild(path);
        return path;
    }
    get definitionElement() {
        if (!this._defs) {
            const existingDefs = this.parentCanvas.querySelector("defs");
            if (existingDefs) {
                this._defs = existingDefs;
            }
            else {
                const definitionsElement = (0, svg_utils_1.createSvgElement)("defs");
                this.parentCanvas.appendChild(definitionsElement);
                this._defs = definitionsElement;
            }
        }
        return this._defs;
    }
    updateSvgStyle(svgStyle) {
        let styles = SvgCanvas.getStyleString(svgStyle);
        this.parentCanvas.setAttribute("style", styles);
    }
    static defaultSvgElement(svgStyle) {
        if (!this._defaultEl) {
            if (!this.defaultSvgStyle)
                this.defaultSvgStyle = {
                    position: "absolute",
                    left: "0px",
                    "pointer-events": "none",
                };
            let styles = SvgCanvas.getStyleString(svgStyle);
            const id = `${const_1.ARROW_LINE_PREFIX}-svg-canvas`;
            this._defaultEl = (0, svg_utils_1.createElement)("svg", {
                id: id,
                style: styles,
                width: document.body.clientWidth -
                    (typeof svgStyle.right === "number"
                        ? svgStyle.right
                        : parseInt(svgStyle.right)),
                height: document.body.clientHeight -
                    (typeof svgStyle.top === "number"
                        ? svgStyle.top
                        : parseInt(svgStyle.top)),
            });
            document.body.appendChild(this._defaultEl);
        }
        return this._defaultEl;
    }
    static getStyleString(svgStyle) {
        this.defaultSvgStyle = Object.assign(Object.assign({}, this.defaultSvgStyle), svgStyle);
        let keys = Object.keys(this.defaultSvgStyle);
        let styles = "";
        for (let i = 0; i < keys.length; i++) {
            let postfix = "";
            if (typeof keys[i] === "number")
                postfix = "px";
            styles += `${keys[i]}:${this.defaultSvgStyle[keys[i]]}${postfix};`;
        }
        return styles;
    }
}
SvgCanvas.defaultSvgStyle = {
    position: "absolute",
    left: "0px",
    "pointer-events": "none",
};
exports.default = SvgCanvas;
//# sourceMappingURL=svg_canvas.js.map