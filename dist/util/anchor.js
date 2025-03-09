"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAnchor = exports.parseEdgeShape = exports.getShortestLine = exports.calcAnchors = exports.getAnchorsDefaultOffsets = void 0;
const helper_1 = require("./helper");
const const_1 = require("../const");
const getAnchorsDefaultOffsets = function (width, height) {
    return {
        middle: { x: width * 0.5, y: height * 0.5 },
        left: { x: 0, y: height * 0.5 },
        right: { x: width, y: height * 0.5 },
        top: { x: width * 0.5, y: 0 },
        bottom: { x: width * 0.5, y: height },
    };
};
exports.getAnchorsDefaultOffsets = getAnchorsDefaultOffsets;
const calcAnchors = function (anchors, anchorPos) {
    return anchors.map(anchor => {
        const defsOffsets = (0, exports.getAnchorsDefaultOffsets)(anchorPos.right - anchorPos.x, anchorPos.bottom - anchorPos.y);
        const { x, y } = defsOffsets[anchor.position];
        return {
            x: anchorPos.x + x + anchor.offset.x,
            y: anchorPos.y + y + anchor.offset.y,
            anchor: anchor,
        };
    });
};
exports.calcAnchors = calcAnchors;
const getShortestLine = function (sPoints, ePoints) {
    let minDist = Infinity, d = Infinity;
    let closestPair = { chosenStart: { x: 0, y: 0 }, chosenEnd: { x: 0, y: 0 } };
    sPoints.forEach(sp => {
        ePoints.forEach(ep => {
            d = (0, helper_1.dist)(ep, sp);
            if (d < minDist) {
                minDist = d;
                closestPair = { chosenStart: sp, chosenEnd: ep };
            }
        });
    });
    return closestPair;
};
exports.getShortestLine = getShortestLine;
const parseEdgeShape = function (svgEdge) {
    if (typeof svgEdge === "string") {
        if (svgEdge in const_1.arrowShapes)
            svgEdge = const_1.arrowShapes[svgEdge];
        else {
            console.warn(`'${svgEdge}' is not supported arrow shape. the supported arrow shapes is one of ${const_1.cArrowShapes}.
                reverting to default shape.`);
            svgEdge = const_1.arrowShapes["arrow1"];
        }
    }
    if (svgEdge && svgEdge.offsetForward === undefined)
        svgEdge.offsetForward = 0.25;
    if (svgEdge && svgEdge.svgElem === undefined)
        svgEdge.svgElem = "path";
    return svgEdge;
};
exports.parseEdgeShape = parseEdgeShape;
const parseAnchor = function (anchor) {
    let anchorChoice = Array.isArray(anchor) ? anchor : [anchor];
    let anchorChoice2 = anchorChoice.map(anchorChoice => {
        if (typeof anchorChoice === "string") {
            return { position: anchorChoice, offset: { x: 0, y: 0 } };
        }
        else
            return anchorChoice;
    });
    anchorChoice2 = anchorChoice2.filter(an => const_1.cAnchorEdge.includes(an.position));
    if (anchorChoice2.length === 0)
        anchorChoice2 = [{ position: "auto", offset: { x: 0, y: 0 } }];
    let autosAncs = anchorChoice2.filter(an => an.position === "auto");
    if (autosAncs.length > 0) {
        anchorChoice2 = anchorChoice2.filter(an => an.position !== "auto");
        anchorChoice2.push(...autosAncs.flatMap(anchorObj => {
            return ["left", "right", "top", "bottom"].map(anchorName => {
                return Object.assign(Object.assign({}, anchorObj), { position: anchorName });
            });
        }));
    }
    let anchorChoice3 = anchorChoice2.map(anchorChoice => {
        if (typeof anchorChoice === "object") {
            let anchorChoiceCustom = anchorChoice;
            if (!anchorChoiceCustom.position)
                anchorChoiceCustom.position = "auto";
            if (!anchorChoiceCustom.offset)
                anchorChoiceCustom.offset = { x: 0, y: 0 };
            return anchorChoiceCustom;
        }
        else
            return anchorChoice;
    });
    return anchorChoice3;
};
exports.parseAnchor = parseAnchor;
//# sourceMappingURL=anchor.js.map