interface ElementRect {
    x: number;
    y: number;
    left: number;
    right: number;
    bottom: number;
    width: number;
    height: number;
}
interface ElementPoint {
    x?: number;
    y?: number;
}
interface AnchorPoint {
    x: number;
    y: number;
    anchor: Anchor;
}
interface LineCoordinates {
    startPos: ElementRect[];
    endPos: ElementRect[];
}
interface LineCoordinate {
    startPos: ElementPoint;
    endPos: ElementPoint;
}
interface ChosenCoordinates {
    chosenStart: {
        x: number;
        y: number;
        anchor?: Anchor;
    };
    chosenEnd: {
        x: number;
        y: number;
        anchor?: Anchor;
    };
}
interface EndpointOptions {
    type?: string;
    arrowIdentifier?: string;
    fillColor?: string;
    size: number;
}
interface ArrowShape {
    svgElem: string | undefined;
    offsetForward: number;
}
interface Offset {
    x: number;
    y: number;
}
interface Anchor {
    position: string;
    offset: Offset;
}
interface AnchorOffsets {
    [key: string]: Offset;
}
interface Options {
    source?: any;
    destination?: any;
    color: string;
    fill?: string;
    size?: number;
    sourcePosition?: any;
    destinationPosition?: any;
    startAnchor?: string | string[];
    endAnchor?: string | string[];
    strokeWidth?: number;
    path?: string;
    curvature?: number;
    gridBreak?: string;
    _extendSVGcanvas?: number;
    _cpx1Offset?: number;
    _cpy1Offset?: number;
    _cpx2Offset?: number;
    _cpy2Offset?: number;
    svgParentSelector?: string;
    svgStyle?: any;
    lineStyle?: string;
    endpoint?: {
        showHead?: boolean;
        headSize?: number;
        headShape?: ArrowShape;
        showTail?: boolean;
        tailSize?: number;
        tailShape?: ArrowShape;
        type?: string;
        fillColor?: string;
        arrowIdentifier?: string;
    };
    sourceCoord?: ElementPoint;
    destCoord?: ElementPoint;
}
interface RawOptions {
    [key: string]: any;
}
interface NormalizedOptions {
    [key: string]: any;
}
interface LinePosition {
    cx0: number;
    cy0: number;
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    cw: number;
    ch: number;
    cpx1: number;
    cpy1: number;
    cpx2: number;
    cpy2: number;
    dx: number;
    dy: number;
    absDx: number;
    absDy: number;
    headOrient: number;
    tailOrient: number;
    labelStartPos: {
        x: number;
        y: number;
    };
    labelMiddlePos: {
        x: number;
        y: number;
    };
    labelEndPos: {
        x: number;
        y: number;
    };
    excLeft: number;
    excRight: number;
    excUp: number;
    excDown: number;
    headOffset: number;
    arrowHeadOffset: Offset;
    arrowTailOffset: Offset;
    startPoints: {
        x: number;
        y: number;
        anchor: Anchor;
    }[];
    endPoints: {
        x: number;
        y: number;
        anchor: Anchor;
    }[];
    xSign: number;
    ySign: number;
    fHeadSize: number;
    fTailSize: number;
    arrowPath: string;
}
interface ArrowOptions {
    color: string;
    endpoint: {
        type?: string;
        fillColor?: string;
        size: number;
        arrowIdentifier?: string;
    };
}
interface PathArray {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    arrowHeadOffset: {
        x: number;
        y: number;
    };
    arrowTailOffset: {
        x: number;
        y: number;
    };
    headOrient: number;
    fHeadSize: number;
}
export type { ArrowOptions, ElementRect, AnchorPoint, LineCoordinates, LineCoordinate, ChosenCoordinates, Anchor, AnchorOffsets, RawOptions, Options, NormalizedOptions, Offset, ArrowShape, LinePosition, EndpointOptions, ElementPoint, PathArray, };
//# sourceMappingURL=types.d.ts.map