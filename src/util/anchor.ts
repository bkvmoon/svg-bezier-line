import * as Types from "../types";
import { dist } from "./helper";
import { arrowShapes, cArrowShapes, cPaths, cAnchorEdge } from "../const";

export const getAnchorsDefaultOffsets = function (width: number, height: number): Types.AnchorOffsets {
  return {
    middle: { x: width * 0.5, y: height * 0.5 },
    left: { x: 0, y: height * 0.5 },
    right: { x: width, y: height * 0.5 },
    top: { x: width * 0.5, y: 0 },
    bottom: { x: width * 0.5, y: height },
  };
};

export const calcAnchors = function (anchors: Types.Anchor[], anchorPos: Types.ElementRect): Types.AnchorPoint[] {
  return anchors.map(anchor => {
    const defsOffsets = getAnchorsDefaultOffsets(anchorPos.right - anchorPos.x, anchorPos.bottom - anchorPos.y);
    const { x, y } = defsOffsets[anchor.position];
    return {
      x: anchorPos.x + x + anchor.offset.x,
      y: anchorPos.y + y + anchor.offset.y,
      anchor: anchor,
    };
  });
};

export const getShortestLine = function (
  sPoints: { x: number; y: number }[],
  ePoints: { x: number; y: number }[],
): Types.ChosenCoordinates {
  let minDist: number = Infinity,
    d: number = Infinity;
  let closestPair: Types.ChosenCoordinates = { chosenStart: { x: 0, y: 0 }, chosenEnd: { x: 0, y: 0 } };
  sPoints.forEach(sp => {
    ePoints.forEach(ep => {
      d = dist(ep, sp);
      if (d < minDist) {
        minDist = d;
        closestPair = { chosenStart: sp, chosenEnd: ep };
      }
    });
  });
  return closestPair;
};

export const parseEdgeShape = function (svgEdge: string | Types.ArrowShape): Types.ArrowShape {
  if (typeof svgEdge === "string") {
    if (svgEdge in arrowShapes) svgEdge = arrowShapes[svgEdge];
    else {
      console.warn(
        `'${svgEdge}' is not supported arrow shape. the supported arrow shapes is one of ${cArrowShapes}.
                reverting to default shape.`,
      );
      svgEdge = arrowShapes["arrow1"];
    }
  }
  if (svgEdge && svgEdge.offsetForward === undefined) svgEdge.offsetForward = 0.25;
  if (svgEdge && svgEdge.svgElem === undefined) svgEdge.svgElem = "path";
  return svgEdge;
};

export const parseAnchor = function (anchor: string | string[]): Types.Anchor[] {
  let anchorChoice: string[] = Array.isArray(anchor) ? anchor : [anchor];

  let anchorChoice2: Types.Anchor[] = anchorChoice.map(anchorChoice => {
    if (typeof anchorChoice === "string") {
      return { position: anchorChoice, offset: { x: 0, y: 0 } };
    } else return anchorChoice;
  });

  anchorChoice2 = anchorChoice2.filter(an => cAnchorEdge.includes(an.position));
  if (anchorChoice2.length === 0) anchorChoice2 = [{ position: "auto", offset: { x: 0, y: 0 } }];

  let autosAncs = anchorChoice2.filter(an => an.position === "auto");
  if (autosAncs.length > 0) {
    anchorChoice2 = anchorChoice2.filter(an => an.position !== "auto");
    anchorChoice2.push(
      ...autosAncs.flatMap(anchorObj => {
        return ["left", "right", "top", "bottom"].map(anchorName => {
          return { ...anchorObj, position: anchorName };
        });
      }),
    );
  }

  let anchorChoice3 = anchorChoice2.map(anchorChoice => {
    if (typeof anchorChoice === "object") {
      let anchorChoiceCustom = anchorChoice;
      if (!anchorChoiceCustom.position) anchorChoiceCustom.position = "auto";
      if (!anchorChoiceCustom.offset) anchorChoiceCustom.offset = { x: 0, y: 0 };
      return anchorChoiceCustom;
    } else return anchorChoice;
  });

  return anchorChoice3;
};
