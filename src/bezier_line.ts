import lineAttributes from "./line_attributes";
import getPosition from "./get_position";
import { createOrUpdateArrow, removeArrow } from "./arrow";
import SvgCanvas from "./svg/svg_canvas";
import { get, merge } from "lodash";
import * as Types from "./types";
import { EndpointType, LineStyle } from "./const";

const bezierLine = (
  source: string | string[] | Types.ElementRect[],
  destination: string | string[] | Types.ElementRect[],
  pOptions: Types.Options = DEFAULT_OPTIONS
): any => {
  const options: Types.Options = merge({}, DEFAULT_OPTIONS, pOptions);
  options.source = source;
  options.destination = destination;
  const svg: SvgCanvas = getSvgCanvas(
    options.svgParentSelector,
    options.svgStyle
  );
  const svgPath: SVGPathElement = svg.createPath();

  let valVars: Types.LineCoordinates = extractStartEndPos(options);
  let pathArr = getPosition(options, valVars);
  const id: string = `arrow-path-${get(options, "endpoint.arrowIdentifier")}`;
  let pathAttrs = {
    d: pathArr.arrowPath,
    id: id,
    ...lineAttributes(options),
  };
  setPathAttributes(svgPath, pathAttrs);
  const arrowId = createOrUpdateArrow(svg, options, pathArr);
  const arrow = document.getElementById(arrowId);
  return {
    getPathId(): string {
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
      removeArrow(options);
    },
    update: (pOptions: Types.RawOptions) => {
      const newOptions = merge({}, options, pOptions);
      let valVars: Types.LineCoordinates = extractStartEndPos(newOptions);
      let pathArr = getPosition(newOptions, valVars);
      let pathAttrs = {
        d: pathArr.arrowPath,
        id: id,
        ...lineAttributes(options),
      };
      setPathAttributes(svgPath, pathAttrs);
      svg.updateSvgStyle(newOptions.svgStyle);
      createOrUpdateArrow(svg, options, pathArr);
    },
    hide: () => {
      svgPath.style.display = "none";
      if (arrow) arrow.style.display = "none";
    },
    show: () => {
      svgPath.style.display = "block";
      if (arrow) arrow.style.display = "block";
    },
  };
};

const getPathAttributeNames = (svgPath: SVGPathElement): string[] => {
  const result: string[] = [];
  for (let i = 0; i < svgPath.attributes.length; i++) {
    const attr = svgPath.attributes.item(i);
    if (attr !== null) result.push(attr.name);
  }
  return result;
};

const setPathAttributes = (
  svgPath: SVGPathElement,
  pathAttributes: { [key: string]: string }
): void => {
  getPathAttributeNames(svgPath).forEach((attrName) =>
    svgPath.attributes.removeNamedItem(attrName)
  );
  for (let attributeName in pathAttributes) {
    svgPath.setAttributeNS(null, attributeName, pathAttributes[attributeName]);
  }
};

const getElemPos = (elem: HTMLElement | null): Types.ElementRect => {
  if (!elem) {
    return { x: 0, y: 0, left: 0, right: 0, bottom: 0, width: 0, height: 0 };
  } else {
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

const getSvgCanvas = (
  selector: string | undefined,
  svgStyle: { [key: string]: string | number }
): SvgCanvas => {
  let domElement: any;
  if (!selector) {
    domElement = SvgCanvas.defaultSvgElement(svgStyle);
    return new SvgCanvas(domElement);
  } else {
    domElement = document.querySelector(selector);
    if (!domElement) {
      console.error(`Could not find element with selector - '${selector}'`);
    }
  }
  return new SvgCanvas(domElement);
};

const DEFAULT_COLOR = "red";
const DEFAULT_STROKE_WIDTH = 2;
const DEFAULT_ARROW_SIZE = 14;
const DEFAULT_OPTIONS: Types.Options = {
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
    type: EndpointType.arrowHeadFilled,
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

const extractStartEndPos = (options: Types.Options): Types.LineCoordinates => {
  let valVars: Types.LineCoordinates = { startPos: [], endPos: [] };
  if (Array.isArray(options.source) && Array.isArray(options.destination)) {
    if (typeof options.source[0] === "string") {
      for (let i = 0; i < options.source.length; i++) {
        let ele = document.getElementById(options.source[i]);
        if (ele == null) {
          ele = document.querySelector(options.source[i]);
        }

        if (ele !== null) {
          const elePos: Types.ElementRect = getElemPos(ele);
          valVars.startPos.push(elePos);
        }
      }
    } else {
      valVars.startPos = options.source;
    }
    if (typeof options.destination[0] === "string") {
      for (let i = 0; i < options.destination.length; i++) {
        valVars.endPos.push(
          getElemPos(
            document.getElementById(options.destination[i]) ||
              document.querySelector(options.destination[i])
          )
        );
      }
    } else {
      valVars.endPos = options.destination;
    }
  } else if (
    typeof options.source === "string" &&
    typeof options.destination === "string"
  ) {
    valVars.startPos.push(getElemPos(document.querySelector(options.source)));
    valVars.endPos.push(
      getElemPos(document.querySelector(options.destination))
    );
  }
  return valVars;
};

export default bezierLine;
