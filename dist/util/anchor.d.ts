import * as Types from "../types";
export declare const getAnchorsDefaultOffsets: (width: number, height: number) => Types.AnchorOffsets;
export declare const calcAnchors: (anchors: Types.Anchor[], anchorPos: Types.ElementRect) => Types.AnchorPoint[];
export declare const getShortestLine: (sPoints: {
    x: number;
    y: number;
}[], ePoints: {
    x: number;
    y: number;
}[]) => Types.ChosenCoordinates;
export declare const parseEdgeShape: (svgEdge: string | Types.ArrowShape) => Types.ArrowShape;
export declare const parseAnchor: (anchor: string | string[]) => Types.Anchor[];
//# sourceMappingURL=anchor.d.ts.map