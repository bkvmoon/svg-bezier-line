import { PathArray } from "../types";
declare const createSvgElement: (tag: string) => any;
declare const createElement: (type: string, attributes: {
    [key: string]: string | number;
}) => SVGElement;
declare const drawArrow: (gtag: SVGElement) => void;
declare const getTranslateString: (pathArr: PathArray) => string;
export { createElement, createSvgElement, drawArrow, getTranslateString };
//# sourceMappingURL=svg_utils.d.ts.map