import {
  createElement,
  createSvgElement,
  drawArrow,
  getTranslateString,
} from "./svg_utils";
import { ARROW_LINE_PREFIX } from "../const";
import { ArrowOptions } from "../types";

interface SvgCanvasOptions {
  type: string;
  color: string;
  fillColor: string;
  size: number;
}

interface PathArray {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  arrowHeadOffset: { x: number; y: number };
  arrowTailOffset: { x: number; y: number };
  headOrient: number;
  fHeadSize: number;
}

class SvgCanvas {
  public parentCanvas: HTMLElement;
  private parentCanvasStyle: {
    position: string;
    left: string;
    "pointer-events": string;
  };

  constructor(parentCanvas: HTMLElement) {
    this.parentCanvas = parentCanvas;
    this.parentCanvasStyle = {
      position: "absolute",
      left: "0px",
      "pointer-events": "none",
    };
  }

  createArrow(id: string, options: ArrowOptions, pathArr: PathArray): void {
    const { color, endpoint } = options;
    const sizeValue: string = String(endpoint.size * 10);
    const xOffsetHead: number = pathArr.x2 - pathArr.arrowHeadOffset.x;
    const yOffsetHead: number = pathArr.y2 - pathArr.arrowHeadOffset.y;
    const xOffsetTail: number = pathArr.x1 - pathArr.arrowTailOffset.x;
    const yOffsetTail: number = pathArr.y1 - pathArr.arrowTailOffset.y;
    const translate: string = `translate(${xOffsetHead},${yOffsetHead}) rotate(${pathArr.headOrient}) scale(${pathArr.fHeadSize})`;

    const gtag = createElement("g", {
      id: id,
      "pointer-events": "auto",
      opacity: "1",
      fill: color,
      transform: getTranslateString(pathArr),
    });
    drawArrow(gtag);

    this.parentCanvas.appendChild(gtag);
  }

  createPath(): SVGPathElement {
    const path: SVGPathElement = createSvgElement("path") as SVGPathElement;
    this.parentCanvas.appendChild(path);
    return path;
  }
  private get definitionElement(): SVGGElement {
    if (!this._defs) {
      const existingDefs = this.parentCanvas.querySelector("defs");
      if (existingDefs) {
        this._defs = existingDefs as SVGGElement;
      } else {
        const definitionsElement: SVGGElement = createSvgElement(
          "defs"
        ) as SVGGElement;
        this.parentCanvas.appendChild(definitionsElement);
        this._defs = definitionsElement;
      }
    }
    return this._defs;
  }

  public updateSvgStyle(svgStyle: { [key: string]: string | number }) {
    let styles = SvgCanvas.getStyleString(svgStyle);
    this.parentCanvas.setAttribute("style", styles);
  }

  private _defs?: SVGGElement;

  static defaultSvgElement(svgStyle: {
    [key: string]: string | number;
  }): SVGSVGElement {
    if (!this._defaultEl) {
      if (!this.defaultSvgStyle)
        this.defaultSvgStyle = {
          position: "absolute",
          left: "0px",
          "pointer-events": "none",
        };
      let styles = SvgCanvas.getStyleString(svgStyle);

      const id: string = `${ARROW_LINE_PREFIX}-svg-canvas`;
      this._defaultEl = createElement("svg", {
        id: id,
        style: styles,
        width:
          document.body.clientWidth -
          (typeof svgStyle.right === "number"
            ? svgStyle.right
            : parseInt(svgStyle.right as string)),
        height:
          document.body.clientHeight -
          (typeof svgStyle.top === "number"
            ? svgStyle.top
            : parseInt(svgStyle.top as string)),
      }) as SVGSVGElement;
      document.body.appendChild(this._defaultEl);
    }
    return this._defaultEl;
  }

  private static _defaultEl?: SVGSVGElement;
  private static defaultSvgStyle?: any = {
    position: "absolute",
    left: "0px",
    "pointer-events": "none",
  };

  private static getStyleString(svgStyle: { [key: string]: string | number }) {
    this.defaultSvgStyle = { ...this.defaultSvgStyle, ...svgStyle };
    let keys = Object.keys(this.defaultSvgStyle);
    let styles = "";
    for (let i = 0; i < keys.length; i++) {
      let postfix = "";
      if (typeof keys[i] === "number") postfix = "px";
      styles += `${keys[i]}:${this.defaultSvgStyle[keys[i]]}${postfix};`;
    }
    return styles;
  }
}

export default SvgCanvas;
