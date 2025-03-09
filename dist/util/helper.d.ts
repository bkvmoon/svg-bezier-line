declare function getCounter(): () => number;
declare function reduceCounter(): () => number;
declare function reverseIf(arr: any[], bool: boolean): any[];
declare const dist: (p1: {
    x: number;
    y: number;
}, p2: {
    x: number;
    y: number;
}) => number;
declare const distInt: (p1: number, p2: number) => number;
declare const withUpdate: (propVal: any, updateRef: any) => any;
declare const parseGridBreak: (gridBreak: string | undefined) => {
    relative: number;
    abs: number;
};
export { getCounter, reverseIf, reduceCounter, dist, distInt, withUpdate, parseGridBreak, };
//# sourceMappingURL=helper.d.ts.map