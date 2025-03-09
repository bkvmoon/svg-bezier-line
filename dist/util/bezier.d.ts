/**
 * Cubic Bézier calculation formula derived from:
 *  https://blog.maximeheckel.com/posts/cubic-bezier-from-math-to-motion/
 * returns buzzier curve function with 2 controls points
 * bzCurve with 2 control points function(4 points total):  bz = (1−t)^3*p1 + 3(1−t)^2*t*p2 +3(1−t)*t^2*p3 + t^3*p4
 */
export declare const bzFunction: (p1: number, p2: number, p3: number, p4: number) => (t: number) => number;
/**
 * returns 2 solutions from extram points for buzzier curve with 2 controls points
 */
export declare const bezierMinSols: (p1: number, p2: number, p3: number, p4: number) => number[];
//# sourceMappingURL=bezier.d.ts.map