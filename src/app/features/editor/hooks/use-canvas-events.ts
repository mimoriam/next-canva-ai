import * as fabric from "fabric";
import { useEffect } from "react";

interface UseCanvasEventsProps {
  canvas: fabric.Canvas | null;
  setSelectedObjects: (objects: fabric.Object[]) => void;
}

export const useCanvasEvents = ({
  canvas,
  setSelectedObjects,
}: UseCanvasEventsProps) => {
  let disposeCreated: VoidFunction;
  let disposeUpdated: VoidFunction;
  let disposeCleared: VoidFunction;

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
      });
    }

    return () => {
      if (canvas) {
        // canvas.off("selection:created");
        // canvas.off("selection:updated");
        // canvas.off("selection:cleared");
        disposeCreated();
        disposeUpdated();
        disposeCleared();
      }
    };
  }, [canvas, setSelectedObjects]);
};
