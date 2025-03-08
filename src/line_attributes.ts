import { LineStyle } from "./const";
import * as Types from "./types";

interface LineAttributesResult {
  [key: string]: string | number;
}

function lineAttributes(options: Types.Options): LineAttributesResult {
  const result: LineAttributesResult = {};
  if (options.lineStyle) {
    result["stroke-dasharray"] = LineStyle[options.lineStyle];
  }
  if (options.strokeWidth) {
    result["stroke-width"] = options.strokeWidth;
  }

  result["stroke"] = options.color || "red";
  result["fill"] = options.fill || "transparent";
  result["pointer-events"] = "visibleStroke";
  return result;
}

export default lineAttributes;
