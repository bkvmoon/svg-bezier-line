"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const get_1 = __importDefault(require("lodash/get"));
const const_1 = require("./const");
const bezier_1 = require("./util/bezier");
const helper_1 = require("./util/helper");
const anchor_1 = require("./util/anchor");
const getPosition = (options, valVars) => {
    var _a, _b;
    const { startPos, endPos } = valVars;
    let updatePos = {};
    const startAnchor = (0, helper_1.withUpdate)((0, anchor_1.parseAnchor)(options.startAnchor || "auto"), updatePos);
    const endAnchor = (0, helper_1.withUpdate)((0, anchor_1.parseAnchor)(options.endAnchor || "auto"), updatePos);
    const gridBreak = (0, helper_1.parseGridBreak)(options.gridBreak);
    let path = options.path || "smooth";
    let headOrient = 0;
    let tailOrient = 0;
    let startPoints = [];
    let endPoints = [];
    for (let i = 0; i < startPos.length; i++) {
        startPoints = startPoints.concat((0, anchor_1.calcAnchors)(startAnchor, startPos[i]));
    }
    for (let i = 0; i < endPos.length; i++) {
        endPoints = endPoints.concat((0, anchor_1.calcAnchors)(endAnchor, endPos[i]));
    }
    let { chosenStart, chosenEnd } = (0, anchor_1.getShortestLine)(startPoints, endPoints);
    let top = 0;
    if (options.svgStyle && options.svgStyle.top) {
        const match = options.svgStyle.top.match(/(-?\d+(\.\d+)?)/);
        let top = parseFloat(match[1]);
        chosenStart.y -= top;
        chosenEnd.y -= top;
    }
    let startAnchorPosition = (_a = chosenStart.anchor) === null || _a === void 0 ? void 0 : _a.position;
    let endAnchorPosition = (_b = chosenEnd.anchor) === null || _b === void 0 ? void 0 : _b.position;
    const startPoint = lodash_1.default.pick(chosenStart, ["x", "y"]), endPoint = lodash_1.default.pick(chosenEnd, ["x", "y"]);
    if (options.sourceCoord && startPoint.x > options.sourceCoord.x) {
        startPoint.x = options.sourceCoord.x;
    }
    if (options.sourceCoord && startPoint.y > options.sourceCoord.y - top) {
        startPoint.y = options.sourceCoord.y - top;
    }
    if (options.svgStyle && options.svgStyle.left) {
        const match = options.svgStyle.left.match(/(-?\d+(\.\d+)?)/);
        let left = parseFloat(match[1]);
        startPoint.x = startPoint.x - left;
        endPoint.x = endPoint.x - left;
    }
    if (options.destCoord && endPoint.y < options.destCoord.y) {
        endPoint.y = options.destCoord.y;
    }
    if (options.sourceCoord && endPoint.x < options.sourceCoord.x + 35) {
        endPoint.x = options.sourceCoord.x + 35;
    }
    const endpoint = options.endpoint;
    let cx0 = Math.min(startPoint.x, endPoint.x);
    let cy0 = Math.min(startPoint.y, endPoint.y);
    const dx = endPoint.x - startPoint.x;
    const dy = endPoint.y - startPoint.y;
    const absDx = Math.abs(endPoint.x - startPoint.x);
    const absDy = Math.abs(endPoint.y - startPoint.y);
    const xSign = 1;
    const ySign = dy > 0 ? 1 : -1;
    const [headOffset, tailOffset] = [
        endpoint.headShape.offsetForward,
        endpoint.tailShape.offsetForward,
    ];
    const fHeadSize = endpoint.headSize;
    const fTailSize = endpoint.tailSize;
    let xHeadOffset = 0;
    let yHeadOffset = 0;
    let xTailOffset = 0;
    let yTailOffset = 0;
    const _headOffset = fHeadSize * headOffset;
    const _tailOffset = fTailSize * tailOffset;
    let arrowId = (0, get_1.default)(options, "endpoint.arrowIdentifier");
    let cu = Number(options.curvature);
    if (!const_1.cPaths.includes(path))
        path = "smooth";
    if (path === "straight") {
        cu = 0;
        path = "smooth";
    }
    const biggerSide = endpoint.headSize > endpoint.tailSize
        ? endpoint.headSize
        : endpoint.tailSize;
    const _calc = options.strokeWidth + (options.strokeWidth * biggerSide) / 2;
    let excRight = _calc;
    let excLeft = _calc;
    let excUp = _calc;
    let excDown = _calc;
    excLeft += Number(options._extendSVGcanvas);
    excRight += Number(options._extendSVGcanvas);
    excUp += Number(options._extendSVGcanvas);
    excDown += Number(options._extendSVGcanvas);
    let x1 = startPoint.x;
    let x2 = endPoint.x;
    let y1 = startPoint.y;
    let y2 = endPoint.y;
    if (cu === 0) {
        let headAngel = Math.atan(absDy / absDx);
        if (endpoint.showHead) {
            x2 -= fHeadSize * (1 - headOffset) * xSign * Math.cos(headAngel);
            y2 -= fHeadSize * (1 - headOffset) * ySign * Math.sin(headAngel);
            headAngel *= ySign;
            if (xSign < 0)
                headAngel = (Math.PI - headAngel * xSign) * xSign;
            xHeadOffset =
                Math.cos(headAngel) * _headOffset -
                    (Math.sin(headAngel) * fHeadSize) / 2;
            yHeadOffset =
                (Math.cos(headAngel) * fHeadSize) / 2 +
                    Math.sin(headAngel) * _headOffset;
            headOrient = (headAngel * 180) / Math.PI;
        }
        let tailAngel = Math.atan(absDy / absDx);
        if (endpoint.showTail) {
            x1 += fTailSize * (1 - tailOffset) * xSign * Math.cos(tailAngel);
            y1 += fTailSize * (1 - tailOffset) * ySign * Math.sin(tailAngel);
            tailAngel *= -ySign;
            if (xSign > 0)
                tailAngel = (Math.PI - tailAngel * xSign) * xSign;
            xTailOffset =
                Math.cos(tailAngel) * _tailOffset -
                    (Math.sin(tailAngel) * fTailSize) / 2;
            yTailOffset =
                (Math.cos(tailAngel) * fTailSize) / 2 +
                    Math.sin(tailAngel) * _tailOffset;
            tailOrient = (tailAngel * 180) / Math.PI;
        }
    }
    else {
        if (endAnchorPosition === "middle") {
            if (absDx > absDy) {
                endAnchorPosition = xSign ? "left" : "right";
            }
            else {
                endAnchorPosition = ySign ? "top" : "bottom";
            }
        }
        if (endpoint.showHead) {
            if (endAnchorPosition && ["left", "right"].includes(endAnchorPosition)) {
                xHeadOffset += _headOffset * xSign;
                x2 -= fHeadSize * (1 - headOffset) * xSign;
                yHeadOffset += (fHeadSize * xSign) / 2;
                if (endAnchorPosition === "left") {
                    headOrient = 0;
                    if (xSign < 0)
                        headOrient += 180;
                }
                else {
                    headOrient = 180;
                    if (xSign > 0)
                        headOrient += 180;
                }
            }
            else if (endAnchorPosition &&
                ["top", "bottom"].includes(endAnchorPosition)) {
                y2 -= fHeadSize * (1 - headOffset) * ySign;
                xHeadOffset += (fHeadSize * -ySign) / 2;
                yHeadOffset += _headOffset * ySign;
                if (endAnchorPosition === "top") {
                    headOrient = 270;
                    if (ySign > 0)
                        headOrient += 180;
                }
                else {
                    headOrient = 90;
                    if (ySign < 0)
                        headOrient += 180;
                }
            }
        }
    }
    if (endpoint.showTail && cu !== 0) {
        if (startAnchorPosition &&
            ["left", "right"].includes(startAnchorPosition)) {
            xTailOffset += _tailOffset * -xSign;
            x1 += fTailSize * xSign + xTailOffset;
            yTailOffset += -(fTailSize * xSign) / 2;
            if (startAnchorPosition === "left") {
                tailOrient = 180;
                if (xSign < 0)
                    tailOrient += 180;
            }
            else {
                tailOrient = 0;
                if (xSign > 0)
                    tailOrient += 180;
            }
        }
        else if ([startAnchorPosition && "top", "bottom"].includes(startAnchorPosition)) {
            yTailOffset += _tailOffset * -ySign;
            y1 += fTailSize * ySign + yTailOffset;
            xTailOffset += (fTailSize * ySign) / 2;
            if (startAnchorPosition === "top") {
                tailOrient = 90;
                if (ySign > 0)
                    tailOrient += 180;
            }
            else {
                tailOrient = 270;
                if (ySign < 0)
                    tailOrient += 180;
            }
        }
    }
    const arrowHeadOffset = { x: xHeadOffset, y: yHeadOffset };
    const arrowTailOffset = { x: xTailOffset, y: yTailOffset };
    let cpx1 = x1, cpy1 = y1, cpx2 = x2, cpy2 = y2;
    let curvesPossibilities = {};
    if (path === "smooth")
        curvesPossibilities = {
            hh: () => {
                cpx1 += absDx * cu * xSign;
                cpx2 -= absDx * cu * xSign;
            },
            vv: () => {
                cpy1 += absDy * cu * ySign;
                cpy2 -= absDy * cu * ySign;
            },
            hv: () => {
                cpx1 += absDx * cu * xSign;
                cpy2 -= absDy * cu * ySign;
            },
            vh: () => {
                cpy1 += absDy * cu * ySign;
                cpx2 -= absDx * cu * xSign;
            },
        };
    else if (path === "grid") {
        curvesPossibilities = {
            hh: () => {
                cpx1 += (absDx * gridBreak.relative + gridBreak.abs) * xSign;
                cpx2 -= (absDx * (1 - gridBreak.relative) - gridBreak.abs) * xSign;
                if (endpoint.showHead) {
                    cpx1 -= ((fHeadSize * (1 - headOffset)) / 2) * xSign;
                    cpx2 += ((fHeadSize * (1 - headOffset)) / 2) * xSign;
                }
                if (endpoint.showTail) {
                    cpx1 -= ((fTailSize * (1 - tailOffset)) / 2) * xSign;
                    cpx2 += ((fTailSize * (1 - tailOffset)) / 2) * xSign;
                }
            },
            vv: () => {
                cpy1 += (absDy * gridBreak.relative + gridBreak.abs) * ySign;
                cpy2 -= (absDy * (1 - gridBreak.relative) - gridBreak.abs) * ySign;
                if (endpoint.showHead) {
                    cpy1 -= ((fHeadSize * (1 - headOffset)) / 2) * ySign;
                    cpy2 += ((fHeadSize * (1 - headOffset)) / 2) * ySign;
                }
                if (endpoint.showTail) {
                    cpy1 -= ((fTailSize * (1 - tailOffset)) / 2) * ySign;
                    cpy2 += ((fTailSize * (1 - tailOffset)) / 2) * ySign;
                }
            },
            hv: () => {
                cpx1 = x2;
            },
            vh: () => {
                cpy1 = y2;
            },
        };
    }
    let selectedCurviness = "";
    if ([startAnchorPosition && "left", "right"].includes(startAnchorPosition))
        selectedCurviness += "h";
    else if ([startAnchorPosition && "bottom", "top"].includes(startAnchorPosition))
        selectedCurviness += "v";
    else if (startAnchorPosition === "middle")
        selectedCurviness += "m";
    if (endAnchorPosition && ["left", "right"].includes(endAnchorPosition))
        selectedCurviness += "h";
    else if (endAnchorPosition && ["bottom", "top"].includes(endAnchorPosition))
        selectedCurviness += "v";
    else if (endAnchorPosition === "middle")
        selectedCurviness += "m";
    if (absDx > absDy)
        selectedCurviness = selectedCurviness.replace(/m/g, "h");
    else
        selectedCurviness = selectedCurviness.replace(/m/g, "v");
    curvesPossibilities[selectedCurviness]();
    cpx1 += options._cpx1Offset;
    cpy1 += options._cpy1Offset;
    cpx2 += options._cpx2Offset;
    cpy2 += options._cpy2Offset;
    const [xSol1, xSol2] = (0, bezier_1.bezierMinSols)(x1, cpx1, cpx2, x2);
    const [ySol1, ySol2] = (0, bezier_1.bezierMinSols)(y1, cpy1, cpy2, y2);
    if (xSol1 < 0)
        excLeft += -xSol1;
    if (xSol2 > absDx)
        excRight += xSol2 - absDx;
    if (ySol1 < 0)
        excUp += -ySol1;
    if (ySol2 > absDy)
        excDown += ySol2 - absDy;
    if (path === "grid") {
        excLeft += _calc;
        excRight += _calc;
        excUp += _calc;
        excDown += _calc;
    }
    cpx1 += excLeft;
    cpx2 += excLeft;
    cpy1 += excUp;
    cpy2 += excUp;
    const cw = absDx + excLeft + excRight, ch = absDy + excUp + excDown;
    cx0 -= excLeft;
    cy0 -= excUp;
    const bzx = (0, bezier_1.bzFunction)(x1, cpx1, cpx2, x2);
    const bzy = (0, bezier_1.bzFunction)(y1, cpy1, cpy2, y2);
    const labelStartPos = { x: bzx(0.01), y: bzy(0.01) };
    const labelMiddlePos = { x: bzx(0.5), y: bzy(0.5) };
    const labelEndPos = { x: bzx(0.99), y: bzy(0.99) };
    let arrowPath = "";
    if (path === "grid") {
        arrowPath = `M ${x1} ${y1} L  ${cpx1} ${cpy1} L ${cpx2} ${cpy2} ${x2} ${y2}`;
    }
    else if (path === "smooth")
        arrowPath = `M ${x1} ${y1} C ${cpx1} ${cpy1}, ${cpx2} ${cpy2}, ${x2} ${y2}`;
    return {
        cx0,
        cy0,
        x1,
        x2,
        y1,
        y2,
        cw,
        ch,
        cpx1,
        cpy1,
        cpx2,
        cpy2,
        dx,
        dy,
        absDx,
        absDy,
        headOrient,
        tailOrient,
        labelStartPos,
        labelMiddlePos,
        labelEndPos,
        excLeft,
        excRight,
        excUp,
        excDown,
        headOffset: _headOffset,
        arrowHeadOffset,
        arrowTailOffset,
        startPoints,
        endPoints,
        xSign,
        ySign,
        fHeadSize,
        fTailSize,
        arrowPath,
    };
};
exports.default = getPosition;
//# sourceMappingURL=get_position.js.map