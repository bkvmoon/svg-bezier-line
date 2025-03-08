let cnt: number = 0;

function getCounter(): () => number {
  return () => cnt++;
}

function reduceCounter(): () => number {
  return () => --cnt;
}

function reverseIf(arr: any[], bool: boolean): any[] {
  if (bool) {
    return arr.reverse();
  }
  return arr;
}

const dist = (
  p1: { x: number; y: number },
  p2: { x: number; y: number }
): number => {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
};

const distInt = (p1: number, p2: number): number => {
  return p1 - p2;
};

const withUpdate = (propVal: any, updateRef: any): any => {
  if (updateRef) updateRef.current = true;
  return propVal;
};

const parseGridBreak = function (gridBreak: string | undefined): {
  relative: number;
  abs: number;
} {
  let resGridBreak = xStr2absRelative(gridBreak);
  if (!resGridBreak) resGridBreak = { relative: 0.5, abs: 0 };
  return resGridBreak;
};

const xStr2absRelative = function (str: string | undefined): {
  abs: number;
  relative: number;
} {
  if (typeof str !== "string" || !str) return { abs: 0, relative: 0.5 };
  const sp: string[] = str.split("%");
  let absLen: number = 0;
  let percentLen: number = 0;

  if (sp.length === 1) {
    const p: number = parseFloat(sp[0]);
    if (!isNaN(p)) {
      absLen = p;
      return { abs: absLen, relative: 0 };
    }
  } else if (sp.length === 2) {
    const [p1, p2] = [parseFloat(sp[0]), parseFloat(sp[1])];
    if (!isNaN(p1)) percentLen = p1 / 100;
    if (!isNaN(p2)) absLen = p2;
    if (!isNaN(p1) || !isNaN(p2)) return { abs: absLen, relative: percentLen };
  }
  return { abs: 0, relative: 0.5 };
};

export {
  getCounter,
  reverseIf,
  reduceCounter,
  dist,
  distInt,
  withUpdate,
  parseGridBreak,
};
