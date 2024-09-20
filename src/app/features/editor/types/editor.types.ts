import * as fabric from "fabric";

export type BuildEditorProps = {
  canvas: fabric.Canvas;
};

export interface Editor {
  addCircle: () => void;
}
