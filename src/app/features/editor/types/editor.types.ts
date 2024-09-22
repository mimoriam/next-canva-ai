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

  selectedObjects: fabric.Object[];
};

export interface Editor {
  addCircle: () => void;
  addSoftRectangle: () => void;
  addRectangle: () => void;
  addTriangle: () => void;
  addInverseTriangle: () => void;
  addDiamond: () => void;

  getActiveFillColor: () => string;
  getActiveStrokeColor: () => string;
  getActiveStrokeWidth: () => number;
  getActiveStrokeDashArray: () => number[];

  canvas: fabric.Canvas;

  strokeColor: string;
  strokeWidth: number;

  changeFillColor: (value: string) => void;
  changeStrokeColor: (value: string) => void;
  changeStrokeWidth: (value: number) => void;
  changeStrokeDashArray: (value: number[]) => void;

  bringForward: () => void;
  sendBackwards: () => void;

  selectedObjects: fabric.Object[];
}

export interface EditorHookProps {
  clearSelectionCallback?: () => void;
}
