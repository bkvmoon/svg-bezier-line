"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTranslateString = exports.drawArrow = exports.createSvgElement = exports.createElement = void 0;
const createSvgElement = (tag) => {
    if (typeof window === "undefined")
        return null;
    return document.createElementNS("http://www.w3.org/2000/svg", tag);
};
exports.createSvgElement = createSvgElement;
const createElement = (type, attributes) => {
    const el = createSvgElement(type);
    for (let attr in attributes) {
        if (el != null && attributes[attr]) {
            el.setAttribute(attr, attributes[attr].toString());
        }
    }
    return el;
};
exports.createElement = createElement;
const drawArrow = (gtag) => {
    const animate = createElement("animate", {
        dur: "0.4",
        attributeName: "opacity",
        from: "0",
        to: "1",
        begin: "indefinite",
        repeatCount: "0",
        fill: "freeze",
    });
    const path = createElement("path", {
        d: "M 0 0 L 1 0.5 L 0 1 L 0.25 0.5 z",
    });
    gtag.appendChild(animate);
    gtag.appendChild(path);
};
exports.drawArrow = drawArrow;
const getTranslateString = (pathArr) => {
    const xOffsetHead = pathArr.x2 - pathArr.arrowHeadOffset.x;
    const yOffsetHead = pathArr.y2 - pathArr.arrowHeadOffset.y;
    const xOffsetTail = pathArr.x1 - pathArr.arrowTailOffset.x;
    const yOffsetTail = pathArr.y1 - pathArr.arrowTailOffset.y;
    return `translate(${xOffsetHead},${yOffsetHead}) rotate(${pathArr.headOrient}) scale(${pathArr.fHeadSize})`;
};
exports.getTranslateString = getTranslateString;
//# sourceMappingURL=svg_utils.js.map