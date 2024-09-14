// noinspection t

import * as fabric from "fabric";
import { useCallback, useEffect } from "react";

interface UseAutoResizeProps {
  canvas: fabric.Canvas | null;
  container: HTMLDivElement | null;
}

// Added a custom property "name" to the FabricObject
declare module "fabric" {
  interface FabricObject {
    name?: string;
  }
}

export const useAutoResize = ({ canvas, container }: UseAutoResizeProps) => {
  const autoZoom = useCallback(() => {
    if (!canvas || !container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;
    canvas.setDimensions({ width, height });

    const center = canvas.getCenterPoint();
    const zoomRatio = 0.85;

    const localWorkSpace = canvas
      .getObjects()
      .find((object) => object.name === "clip");

    if (localWorkSpace === undefined) return;

    const scale = fabric.util.findScaleToFit(localWorkSpace, {
      width,
      height,
    });

    const zoom = zoomRatio * scale;
    canvas.setViewportTransform(fabric.iMatrix);

    // Top = y, Left = x
    canvas.zoomToPoint(new fabric.Point(center.x, center.y), zoom);

    if (!localWorkSpace) return;

    const workspaceCenter = localWorkSpace.getCenterPoint();
    const viewportTransform = canvas.viewportTransform;

    if (
      !canvas.width === undefined ||
      canvas.height === undefined ||
      !viewportTransform
    ) {
      return;
    }

    viewportTransform[4] =
      canvas.width / 2 - workspaceCenter.x * viewportTransform[0];

    viewportTransform[5] =
      canvas.height / 2 - workspaceCenter.y * viewportTransform[3];

    canvas.setViewportTransform(viewportTransform);

    // localWorkSpace.clone((cloned: fabric.Rect) => {
    //   canvas.clipPath = cloned;
    //   canvas.requestRenderAll();
    // });

    localWorkSpace.clone([]).then((cloned: fabric.FabricObject) => {
      canvas.clipPath = cloned;
      canvas.requestRenderAll();
    });
  }, [canvas, container]);

  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    if (canvas && container) {
      resizeObserver = new ResizeObserver(() => {
        autoZoom();
      });

      resizeObserver.observe(container);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [canvas, container, autoZoom]);
};
