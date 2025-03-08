import { ArrowShape } from "./types";

export const cPaths: string[] = ["smooth", "grid", "straight"];
export const cAnchorEdge: string[] = [
  "middle",
  "left",
  "right",
  "top",
  "bottom",
  "auto",
];

export const arrowShapes: Record<string, ArrowShape> = {
  arrow1: {
    svgElem: '<path d="M 0 0 L 1 0.5 L 0 1 L 0.25 0.5 z" />',
    offsetForward: 0.25,
  },
  heart: {
    svgElem:
      '<path d="M 0,0.25 A 0.125,0.125 0,0,1 0.5,0.25 A 0.125,0.125 0,0,1 1,0.25 Q 1,0.625 0.5,1 Q 0,0.625 0,0.25 z" />',
    offsetForward: 0.1,
  },
  circle: {
    svgElem: "<circle r={0.5} cx={0.5} cy={0.5} />",
    offsetForward: 0,
  },
};

export const cArrowShapes: string[] = Object.keys(arrowShapes);

export const EndpointType = {
  arrowHeadFilled: "arrowHeadFilled" as const,
  arrowHead: "arrowHead" as const,
  squares: "squares" as const,
  circles: "circles" as const,
  custom: "custom" as const,
  none: "none" as const,
};

export const EndpointPosition: { START: string; END: string; BOTH: string } = {
  START: "start",
  END: "end",
  BOTH: "both",
};

export const LineStyle: { [key: string]: string } = {
  dot: "1 1",
  dash: "4 1",
  solid: "",
  dotdash: "1 1 4 1",
};

export const ARROW_LINE_PREFIX = `__arrowLineInternal`;
