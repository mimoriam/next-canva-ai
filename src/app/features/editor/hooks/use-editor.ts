import { useCallback } from "react";
import * as fabric from "fabric";

export type useEditorProps = {
  initialCanvas: fabric.Canvas;
  initialContainer: HTMLDivElement;
};

export const useEditor = () => {
  const init = useCallback(
    ({ initialCanvas, initialContainer }: useEditorProps) => {
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
        // selectable: false,
        // hasControls: false,
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

      // If an object goes outside of workspace's defined boundaries, it would get clipped:
      initialCanvas.clipPath = initialWorkspace;
    },
    [],
  );

  return { init };
};
