import { useCallback, useState } from "react";
import * as fabric from "fabric";
import { useAutoResize } from "@/app/features/editor/hooks/use-auto-resize";

interface UseEditorProps {
  initialCanvas: fabric.Canvas;
  initialContainer: HTMLDivElement;
}

export const useEditor = () => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useAutoResize({ canvas, container });

  const init = useCallback(
    ({ initialCanvas, initialContainer }: UseEditorProps) => {
      // Overriding Fabric's defaults:
      fabric.InteractiveFabricObject.ownDefaults = {
        ...fabric.InteractiveFabricObject.ownDefaults,
        cornerColor: "#FFF",
        cornerStyle: "circle",
        cornerStrokeColor: "#3b82f6",
        transparentCorners: false,
        borderColor: "#3b82f6",
        borderScaleFactor: 1.5,
        borderOpacityWhenMoving: 1,
      };

      const initialWorkspace = new fabric.Rect({
        width: 900,
        height: 1200,
        name: "clip",
        fill: "white",
        selectable: false,
        hasControls: false,
        shadow: new fabric.Shadow({
          color: "rgba(0, 0, 0, 0.8)",
          blur: 5,
        }),
      });

      initialCanvas.setDimensions({
        width: initialContainer.offsetWidth,
        height: initialContainer.offsetHeight,
      });

      initialCanvas.add(initialWorkspace);
      initialCanvas.centerObject(initialWorkspace);

      const test = new fabric.Rect({
        height: 100,
        width: 100,
        fill: "black",
      });

      initialCanvas.add(test);
      initialCanvas.centerObject(test);

      // If an object goes outside of workspace's defined boundaries, it would get clipped:
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);
    },
    [],
  );

  return { init };
};
