import * as fabric from "fabric";

export type BuildEditorProps = {
  canvas: fabric.Canvas;

  fillColor: string;
  strokeColor: string;
  strokeWidth: number;
  strokeDashArray: number[];

  setFillColor: (value: string) => void;
  setStrokeColor: (value: string) => void;
  setStrokeWidth: (value: number) => void;
  setStrokeDashArray: (value: number[]) => void;

  fontFamily: string;
  setFontFamily: (value: string) => void;

  selectedObjects: fabric.Object[];
};

export interface Editor {
  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];
  getActiveOpacity: () => number;

  getActiveFontFamily: () => string;
  getActiveFontWeight: () => number;
  getActiveFontStyle: () => string;
  getActiveFontUnderline: () => boolean;
  getActiveFontLinethrough: () => boolean;
  getActiveFontSize: () => number;

  getActiveTextAlign: () => string;

  changeFillColor: (value: string) => void;
  changeStrokeColor: (value: string) => void;
  changeStrokeWidth: (value: number) => void;
  changeStrokeDashArray: (value: number[]) => void;
  changeOpacity: (value: number) => void;

  changeFontFamily: (value: string) => void;
  changeFontWeight: (value: number) => void;
  changeFontStyle: (value: string) => void;
  changeFontUnderline: (value: boolean) => void;
  changeFontLinethrough: (value: boolean) => void;
  changeFontSize: (value: number) => void;

  changeTextAlign: (value: string) => void;

  bringForward: () => void;
  sendBackwards: () => void;

  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;

  addText: (value: string, options?: Partial<fabric.TextboxProps>) => void;

  canvas: fabric.Canvas;
  strokeColor: string;
  strokeWidth: number;
  selectedObjects: fabric.Object[];
}

export interface EditorHookProps {
  clearSelectionCallback?: () => void;
}
