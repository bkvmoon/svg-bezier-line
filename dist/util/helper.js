"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGridBreak = exports.withUpdate = exports.distInt = exports.dist = void 0;
exports.getCounter = getCounter;
exports.reverseIf = reverseIf;
exports.reduceCounter = reduceCounter;
let cnt = 0;
function getCounter() {
    return () => cnt++;
}
function reduceCounter() {
    return () => --cnt;
}
function reverseIf(arr, bool) {
    if (bool) {
        return arr.reverse();
    }
    return arr;
}
const dist = (p1, p2) => {
    return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
};
exports.dist = dist;
const distInt = (p1, p2) => {
    return p1 - p2;
};
exports.distInt = distInt;
const withUpdate = (propVal, updateRef) => {
    if (updateRef)
        updateRef.current = true;
    return propVal;
};
exports.withUpdate = withUpdate;
const parseGridBreak = function (gridBreak) {
    let resGridBreak = xStr2absRelative(gridBreak);
    if (!resGridBreak)
        resGridBreak = { relative: 0.5, abs: 0 };
    return resGridBreak;
};
exports.parseGridBreak = parseGridBreak;
const xStr2absRelative = function (str) {
    if (typeof str !== "string" || !str)
        return { abs: 0, relative: 0.5 };
    const sp = str.split("%");
    let absLen = 0;
    let percentLen = 0;
    if (sp.length === 1) {
        const p = parseFloat(sp[0]);
        if (!isNaN(p)) {
            absLen = p;
            return { abs: absLen, relative: 0 };
        }
    }
    else if (sp.length === 2) {
        const [p1, p2] = [parseFloat(sp[0]), parseFloat(sp[1])];
        if (!isNaN(p1))
            percentLen = p1 / 100;
        if (!isNaN(p2))
            absLen = p2;
        if (!isNaN(p1) || !isNaN(p2))
            return { abs: absLen, relative: percentLen };
    }
    return { abs: 0, relative: 0.5 };
};
//# sourceMappingURL=helper.js.map