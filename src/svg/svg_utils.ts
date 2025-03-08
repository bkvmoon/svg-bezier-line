import { PathArray } from "../types";

const createSvgElement = (tag: string): any => {
  if (typeof window === "undefined") return null;
  return document.createElementNS("http://www.w3.org/2000/svg", tag);
};

const createElement = (
  type: string,
  attributes: { [key: string]: string | number }
): SVGElement => {
  const el: SVGElement = createSvgElement(type);
  for (let attr in attributes) {
    if (el != null && attributes[attr]) {
      el.setAttribute(attr, attributes[attr].toString());
    }
  }
  return el;
};

const drawArrow = (gtag: SVGElement): void => {
  const animate: SVGElement = createElement("animate", {
    dur: "0.4",
    attributeName: "opacity",
    from: "0",
    to: "1",
    begin: "indefinite",
    repeatCount: "0",
    fill: "freeze",
  });
  const path: SVGElement = createElement("path", {
    d: "M 0 0 L 1 0.5 L 0 1 L 0.25 0.5 z",
  });
  gtag.appendChild(animate);
  gtag.appendChild(path);
};

const getTranslateString = (pathArr: PathArray): string => {
  const xOffsetHead: number = pathArr.x2 - pathArr.arrowHeadOffset.x;
  const yOffsetHead: number = pathArr.y2 - pathArr.arrowHeadOffset.y;
  const xOffsetTail: number = pathArr.x1 - pathArr.arrowTailOffset.x;
  const yOffsetTail: number = pathArr.y1 - pathArr.arrowTailOffset.y;
  return `translate(${xOffsetHead},${yOffsetHead}) rotate(${pathArr.headOrient}) scale(${pathArr.fHeadSize})`;
};

export { createElement, createSvgElement, drawArrow, getTranslateString };
