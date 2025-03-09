import { ArrowOptions } from "../types";
interface PathArray {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    arrowHeadOffset: {
        x: number;
        y: number;
    };
    arrowTailOffset: {
        x: number;
        y: number;
    };
    headOrient: number;
    fHeadSize: number;
}
declare class SvgCanvas {
    parentCanvas: HTMLElement;
    private parentCanvasStyle;
    constructor(parentCanvas: HTMLElement);
    createArrow(id: string, options: ArrowOptions, pathArr: PathArray): void;
    createPath(): SVGPathElement;
    private get definitionElement();
    updateSvgStyle(svgStyle: {
        [key: string]: string | number;
    }): void;
    private _defs?;
    static defaultSvgElement(svgStyle: {
        [key: string]: string | number;
    }): SVGSVGElement;
    private static _defaultEl?;
    private static defaultSvgStyle?;
    private static getStyleString;
}
export default SvgCanvas;
//# sourceMappingURL=svg_canvas.d.ts.map