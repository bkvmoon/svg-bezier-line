import { ElementRect } from "components/curveLine/types";

export const isElementPartiallyInViewport = function (el: HTMLElement): [boolean, number, DOMRect] {
  const rect: DOMRect = el.getBoundingClientRect();
  const windowHeight: number = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth: number = window.innerWidth || document.documentElement.clientWidth;

  let top: number = rect.top;
  const topEl: HTMLElement | null = document.getElementById("origOSD");
  if (topEl) top = top - topEl.getBoundingClientRect().top;

  const vertInView: boolean = top <= windowHeight && top + rect.height >= 0;
  const horInView: boolean = rect.left <= windowWidth && rect.left + rect.width >= 0;
  return [vertInView && horInView, top, rect];
};

export const isRectPartiallyInViewportById = function (rect: ElementRect, parentRect: any, isYcalculated: boolean) {
  // const rect = el.getBoundingClientRect();
  // const parentRect = el?.parentElement?.parentElement?.getBoundingClientRect() || { x: 0, y:0, height:0, width: 0 };
  const windowHeight =
    (isYcalculated ? parentRect.y : 0) + parentRect.height ||
    window.innerHeight ||
    document.documentElement.clientHeight;
  const windowWidth = parentRect.x + parentRect.width || window.innerWidth || document.documentElement.clientWidth;

  let top = rect?.y || 0;
  // const topEl = document.getElementById(isYcalculated ? "copyOSD" : "origOSD");
  // if (topEl) top = top - topEl.getBoundingClientRect().top;
  top = top - parentRect.top;

  const vertInView = top <= windowHeight && top + (rect?.height || 0) >= 0;
  const horInView = (rect?.left || 0) <= windowWidth && (rect?.left || 0) + (rect?.width || 0) >= 0;
  return vertInView && horInView; //[vertInView && horInView, top, rect];
};

export const isElementPartiallyInViewportById = function (id: string, isYcalculated: boolean) {
  const el = document.getElementById(id);
  if (!el) {
    return false;
  }
  const rect = el.getBoundingClientRect();
  const parentRect = el?.parentElement?.parentElement?.getBoundingClientRect() || { x: 0, y: 0, height: 0, width: 0 };
  const windowHeight =
    (isYcalculated ? parentRect.y : 0) + parentRect.height ||
    window.innerHeight ||
    document.documentElement.clientHeight;
  const windowWidth = parentRect.x + parentRect.width || window.innerWidth || document.documentElement.clientWidth;

  let top = rect?.top || 0;
  const topEl = document.getElementById(isYcalculated ? "copyOSD" : "origOSD");
  if (topEl) top = top - topEl.getBoundingClientRect().top;

  const vertInView = top <= windowHeight && top + (rect?.height || 0) >= 0;
  const horInView = (rect?.left || 0) <= windowWidth && (rect?.left || 0) + (rect?.width || 0) >= 0;
  return vertInView && horInView; //[vertInView && horInView, top, rect];
};

export const isElementInViewportById = function (id: string, isYcalculated: boolean): boolean {
  const el = document.getElementById(id);
  if (!el) {
    return false;
  }
  const rect: DOMRect = el.getBoundingClientRect();
  const parentRect = el?.parentElement?.parentElement?.getBoundingClientRect();
  const windowWidth: number = window.innerWidth || document.documentElement.clientWidth;
  let top: number = rect.top;
  let windowHeight: number = 0;
  if (isYcalculated && parentRect) {
    windowHeight = parentRect.height;
  } else if (!parentRect) {
    window.innerHeight || document.documentElement.clientHeight;
  }

  const topEl: HTMLElement | null = document.getElementById(isYcalculated ? "copyOSD" : "origOSD");
  if (topEl) top = top - topEl.getBoundingClientRect().top;

  const ribbonHeader: HTMLElement | null = document.getElementById("ribbon-original");
  if (ribbonHeader) top = top - ribbonHeader.getBoundingClientRect().height;

  return rect.left >= 0 && top >= 0 && rect.left + rect.width <= windowWidth && top + rect.height <= windowHeight;
};

export const isElementInViewport = function (el: HTMLElement): boolean {
  const rect: DOMRect = el.getBoundingClientRect();
  const windowHeight: number = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth: number = window.innerWidth || document.documentElement.clientWidth;

  let top: number = rect.top;
  const topEl: HTMLElement | null = document.getElementById("origOSD");
  if (topEl) top = top - topEl.getBoundingClientRect().top;

  const ribbonHeader: HTMLElement | null = document.getElementById("ribbon-original");
  if (ribbonHeader) top = top - ribbonHeader.getBoundingClientRect().height;

  return rect.left >= 0 && top >= 0 && rect.left + rect.width <= windowWidth && top + rect.height <= windowHeight;
};
