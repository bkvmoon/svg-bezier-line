import get from "lodash/get";
import SvgCanvas from "./svg/svg_canvas";
import { getCounter, reduceCounter } from "./util/helper";
import { ArrowOptions, Options, PathArray } from "./types";
import { ARROW_LINE_PREFIX, EndpointType } from "./const";
import { getTranslateString } from "./svg/svg_utils";

const ARROW_ID_PREFIX: string = `${ARROW_LINE_PREFIX}-MARKER-`;
const nextArrowId: () => number = getCounter();
const arrowCache: Map<string, string> = new Map();

const getArrowOptionsAndKey = (
  options: Options
): {
  key: string;
  options: ArrowOptions;
} => {
  const arrowType = get(options, "endpoint.type");
  const fillColor = get(options, "endpoint.fillColor");
  const id = get(options, "endpoint.arrowIdentifier");
  const opts: ArrowOptions = {
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

const removeArrow = (baseOpts: Options): void => {
  const { key, options } = getArrowOptionsAndKey(baseOpts);
  if (arrowCache.has(key)) {
    const arrow: string | undefined = arrowCache.get(key);
    if (arrow) {
      document.getElementById(arrow)?.remove();
      arrowCache.delete(key);
      reduceCounter();
    }
  }
};

const getArrow = (
  svg: SvgCanvas,
  baseOpts: Options,
  pathArr: PathArray
): string => {
  const { key, options } = getArrowOptionsAndKey(baseOpts);
  const arrow: string | undefined = arrowCache.get(key);
  if (!arrow) {
    const arrowId: string = `${ARROW_ID_PREFIX}${
      get(baseOpts, "endpoint.arrowIdentifier") || nextArrowId()
    }`;
    svg.createArrow(arrowId, options, pathArr);
    arrowCache.set(key, arrowId);
    return arrowId;
  } else {
    const gEl: HTMLElement | null = document.getElementById(arrow);
    if (gEl) {
      // const xOffsetHead: number = pathArr.x2 - pathArr.arrowHeadOffset.x;
      // const yOffsetHead: number = pathArr.y2 - pathArr.arrowHeadOffset.y;
      // const xOffsetTail: number = pathArr.x1 - pathArr.arrowTailOffset.x;
      // const yOffsetTail: number = pathArr.y1 - pathArr.arrowTailOffset.y;
      // const translate: string = `translate(${xOffsetHead},${yOffsetHead}) rotate(${pathArr.headOrient}) scale(${pathArr.fHeadSize})`;
      gEl.setAttribute("transform", getTranslateString(pathArr));
    }
  }
  return arrow;
};

const createOrUpdateArrow = (
  svg: SvgCanvas,
  options: Options,
  pathArr: PathArray
): string => {
  const endpointType = get(options, "endpoint.type");
  if (endpointType === EndpointType.none) {
    return "";
  }
  let arrowId: string | undefined = get(options, "endpoint.arrowIdentifier");
  if (!arrowId || !document.getElementById(arrowId)) {
    arrowId = getArrow(svg, options, pathArr);
  }
  return arrowId;
};

export { createOrUpdateArrow, removeArrow };
