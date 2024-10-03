import * as fabric from "fabric";
import { useEffect } from "react";

interface UseCanvasEventsProps {
  save: () => void;
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
  clearSelectionCallback?: () => void;
}

export const useCanvasEvents = ({
  save,
  canvas,
  setSelectedObjects,
  clearSelectionCallback,
}: UseCanvasEventsProps) => {
  let disposeCreated: VoidFunction;
  let disposeUpdated: VoidFunction;
  let disposeCleared: VoidFunction;

  let disposeAdded: VoidFunction;
  let disposeRemoved: VoidFunction;
  let disposeModified: VoidFunction;

  useEffect(() => {
    if (canvas) {
      disposeCreated = canvas.on("selection:created", (e) => {
        setSelectedObjects(e.selected || []);
      });
      disposeUpdated = canvas.on("selection:updated", (e) => {
        setSelectedObjects(e.selected || []);
      });
      disposeCleared = canvas.on("selection:cleared", () => {
        setSelectedObjects([]);
        clearSelectionCallback?.();
      });

      disposeAdded = canvas.on("object:added", () => save());
      disposeRemoved = canvas.on("object:removed", () => save());
      disposeModified = canvas.on("object:modified", () => save());
    }

    return () => {
      if (canvas) {
        disposeCreated();
        disposeUpdated();
        disposeCleared();

        disposeAdded();
        disposeRemoved();
        disposeModified();
      }
    };
  }, [save, canvas, setSelectedObjects, clearSelectionCallback]);
};
