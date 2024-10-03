import { useCallback, useMemo, useState } from "react";
import * as fabric from "fabric";
import { useAutoResize } from "@/app/features/editor/hooks/use-auto-resize";
import {
  BuildEditorProps,
  Editor,
  EditorHookProps,
} from "@/app/features/editor/types/editor.types";
import {
  CIRCLE_OPTIONS,
  DIAMOND_OPTIONS,
  FILL_COLOR,
  FONT_FAMILY,
  FONT_SIZE,
  FONT_WEIGHT,
  RECTANGLE_OPTIONS,
  STROKE_COLOR,
  STROKE_DASH_ARRAY,
  STROKE_WIDTH,
  TEXT_OPTIONS,
  TRIANGLE_OPTIONS,
} from "@/app/features/editor/types/shape-options.types";
import { useCanvasEvents } from "@/app/features/editor/hooks/use-canvas-events";
import { isTextTypeObject } from "@/app/features/editor/utils/is-text-type";
import { createFilter } from "@/lib/utils";
import { useClipboard } from "@/app/features/editor/hooks/use-clipboard";
import { useHistory } from "@/app/features/editor/hooks/use-history";
import { JSON_KEYS } from "@/app/features/editor/types/json.types";

interface UseEditorProps {
  initialCanvas: fabric.Canvas;
  initialContainer: HTMLDivElement;
}

const buildEditor = ({
  canvas,

  fillColor,
  strokeColor,
  strokeWidth,
  strokeDashArray,

  setFillColor,
  setStrokeColor,
  setStrokeWidth,
  setStrokeDashArray,

  fontFamily,
  setFontFamily,

  copy,
  paste,

  autoZoom,

  save,
  undo,
  redo,
  canUndo,
  canRedo,

  selectedObjects,
}: BuildEditorProps): Editor => {
  const getWorkspace = () => {
    return canvas.getObjects().find((object) => object.name === "clip");
  };

  const center = (object: fabric.Object) => {
    const workspace = getWorkspace();
    const center = workspace?.getCenterPoint();

    if (!center) return;

    canvas._centerObject(object, center);
  };

  const addToCanvas = (object: fabric.Object) => {
    center(object);
    canvas.add(object);
    canvas.setActiveObject(object);
  };

  return {
    getActiveFillColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return fillColor;
      }

      const value = selectedObject.get("fill") || fillColor;

      // Currently, gradients & patterns are not supported
      return value as string;
    },

    getActiveStrokeColor: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeColor;
      }

      const value = selectedObject.get("stroke") || strokeColor;

      return value;
    },

    getActiveStrokeWidth: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeWidth;
      }

      const value = selectedObject.get("strokeWidth") || strokeWidth;

      return value;
    },

    getActiveStrokeDashArray: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return strokeDashArray;
      }

      const value = selectedObject.get("strokeDashArray") || strokeDashArray;

      return value;
    },

    getActiveOpacity: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return 1;
      }

      const value = selectedObject.get("opacity") || 1;

      return value;
    },

    getActiveFontFamily: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return fontFamily;
      }

      const value = selectedObject.get("fontFamily") || fontFamily;

      return value;
    },

    getActiveFontWeight: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return FONT_WEIGHT;
      }

      const value = selectedObject.get("fontWeight") || FONT_WEIGHT;

      return value;
    },

    getActiveFontStyle: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return "normal";
      }

      const value = selectedObject.get("fontStyle") || "normal";

      return value;
    },

    getActiveFontUnderline: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return false;
      }

      const value = selectedObject.get("underline") || false;

      return value;
    },

    getActiveFontLinethrough: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return false;
      }

      const value = selectedObject.get("linethrough") || false;

      return value;
    },

    getActiveFontSize: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return FONT_SIZE;
      }

      const value = selectedObject.get("fontSize") || FONT_SIZE;

      return value;
    },

    getActiveTextAlign: () => {
      const selectedObject = selectedObjects[0];

      if (!selectedObject) {
        return "left";
      }

      const value = selectedObject.get("textAlign") || "left";

      return value;
    },

    changeFillColor: (value: string) => {
      setFillColor(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ fill: value });
      });

      canvas.renderAll();
    },

    changeStrokeColor: (value: string) => {
      setStrokeColor(value);
      canvas.getActiveObjects().forEach((object) => {
        // Text types don't have stroke
        // if (isTextType(object.type)) {

        if (isTextTypeObject(object)) {
          object.set({ fill: value });
          return;
        }

        object.set({ stroke: value });
      });

      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = value;
      }

      canvas.renderAll();
    },

    changeStrokeWidth: (value: number) => {
      setStrokeWidth(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeWidth: value });
      });

      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.width = value;
      }

      canvas.renderAll();
    },

    changeStrokeDashArray: (value: number[]) => {
      setStrokeDashArray(value);
      canvas.getActiveObjects().forEach((object) => {
        object.set({ strokeDashArray: value });
      });

      canvas.renderAll();
    },

    changeOpacity: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        object.set({ opacity: value });
      });

      canvas.renderAll();
    },

    changeFontFamily: (value: string) => {
      setFontFamily(value);
      canvas.getActiveObjects().forEach((object) => {
        if (isTextTypeObject(object)) {
          object.set({ fontFamily: value });
        }
      });

      canvas.renderAll();
    },

    changeFontWeight: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextTypeObject(object)) {
          object.set({ fontWeight: value });
        }
      });

      canvas.renderAll();
    },

    changeFontStyle: (value: string) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextTypeObject(object)) {
          object.set({ fontStyle: value });
        }
      });

      canvas.renderAll();
    },

    changeFontUnderline: (value: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextTypeObject(object)) {
          object.set({ underline: value });
        }
      });

      canvas.renderAll();
    },

    changeFontLinethrough: (value: boolean) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextTypeObject(object)) {
          object.set({ linethrough: value });
        }
      });

      canvas.renderAll();
    },

    changeFontSize: (value: number) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextTypeObject(object)) {
          object.set({ fontSize: value });
        }
      });

      canvas.renderAll();
    },

    changeTextAlign: (value: string) => {
      canvas.getActiveObjects().forEach((object) => {
        if (isTextTypeObject(object)) {
          object.set({ textAlign: value });
        }
      });

      canvas.renderAll();
    },

    bringForward: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.bringObjectForward(object);
      });

      canvas.renderAll();

      //* Bugfix: Items go above workspace (fixed):
      const workspace = getWorkspace();
      workspace?.canvas?.sendObjectBackwards(workspace);
    },

    sendBackwards: () => {
      canvas.getActiveObjects().forEach((object) => {
        canvas.sendObjectBackwards(object);
      });

      canvas.renderAll();

      //* Bugfix: Items go behind workspace (fixed):
      const workspace = getWorkspace();
      workspace?.canvas?.sendObjectBackwards(workspace);
    },

    addCircle: () => {
      const object = new fabric.Circle({
        ...CIRCLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },

    addSoftRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        rx: 50,
        ry: 50,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },

    addRectangle: () => {
      const object = new fabric.Rect({
        ...RECTANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },

    addTriangle: () => {
      const object = new fabric.Triangle({
        ...TRIANGLE_OPTIONS,
        fill: fillColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        strokeDashArray: strokeDashArray,
      });

      addToCanvas(object);
    },

    addInverseTriangle: () => {
      const HEIGHT = TRIANGLE_OPTIONS.height;
      const WIDTH = TRIANGLE_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          { x: 0, y: 0 },
          { x: WIDTH, y: 0 },
          { x: WIDTH / 2, y: HEIGHT },
        ],
        {
          ...TRIANGLE_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        },
      );

      addToCanvas(object);
    },

    addDiamond: () => {
      const HEIGHT = DIAMOND_OPTIONS.height;
      const WIDTH = DIAMOND_OPTIONS.width;

      const object = new fabric.Polygon(
        [
          { x: WIDTH / 2, y: 0 },
          { x: WIDTH, y: HEIGHT / 2 },
          { x: WIDTH / 2, y: HEIGHT },
          { x: 0, y: HEIGHT / 2 },
        ],
        {
          ...DIAMOND_OPTIONS,
          fill: fillColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          strokeDashArray: strokeDashArray,
        },
      );

      addToCanvas(object);
    },

    addText: (value, options) => {
      const object = new fabric.Textbox(value, {
        ...TEXT_OPTIONS,
        fill: fillColor,
        ...options,
      });

      addToCanvas(object);
    },

    addImage: (value: string) => {
      fabric.FabricImage.fromURL(value, {
        crossOrigin: "anonymous",
      }).then((image) => {
        const workspace = getWorkspace();

        image.scaleToWidth(workspace?.width || 0);
        image.scaleToHeight(workspace?.height || 0);

        addToCanvas(image);
      });
    },

    changeImageFilter: (value: string) => {
      const objects = canvas.getActiveObjects();

      objects.forEach((object) => {
        if (object.isType("image")) {
          const imageObject = object as fabric.FabricImage;

          const effect = createFilter(value);

          imageObject.filters = effect ? [effect] : [];
          imageObject.applyFilters();

          canvas.renderAll();
        }
      });
    },

    delete: () => {
      canvas.getActiveObjects().forEach((object) => canvas.remove(object));
      canvas.discardActiveObject();

      canvas.renderAll();
    },

    onCopy: () => copy(),
    onPaste: () => paste(),

    autoZoom,

    zoomIn: () => {
      let zoomRatio = canvas.getZoom();
      zoomRatio += 0.05;
      const center = canvas.getCenterPoint();

      canvas.zoomToPoint(
        new fabric.Point(center.x, center.y),
        zoomRatio > 1 ? 1 : zoomRatio,
      );
    },

    zoomOut: () => {
      let zoomRatio = canvas.getZoom();
      zoomRatio -= 0.05;
      const center = canvas.getCenterPoint();

      canvas.zoomToPoint(
        new fabric.Point(center.x, center.y),
        zoomRatio < 0.2 ? 0.2 : zoomRatio,
      );
    },

    canUndo,
    canRedo,

    onUndo: () => undo(),
    onRedo: () => redo(),

    enableDrawingMode: () => {
      canvas.discardActiveObject();
      canvas.renderAll();

      canvas.isDrawingMode = true;

      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);

      canvas.freeDrawingBrush.width = strokeWidth;
      canvas.freeDrawingBrush.color = strokeColor;
    },

    disableDrawingMode: () => {
      canvas.isDrawingMode = false;
    },

    changeSize: (value: { width: number; height: number }) => {
      const workspace = getWorkspace();
      workspace?.set(value);
      autoZoom();

      save();
    },

    changeBackground: (value: string) => {
      const workspace = getWorkspace();
      workspace?.set({ fill: value });

      canvas.renderAll();

      save();
    },

    getWorkspace,
    canvas,
    strokeColor,
    strokeWidth,

    selectedObjects,
  };
};

export const useEditor = ({
  clearSelectionCallback,
  saveCallback,
}: EditorHookProps) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const [selectedObjects, setSelectedObjects] = useState<fabric.Object[]>([]);

  const [fontFamily, setFontFamily] = useState(FONT_FAMILY);
  const [fillColor, setFillColor] = useState(FILL_COLOR);
  const [strokeColor, setStrokeColor] = useState(STROKE_COLOR);
  const [strokeWidth, setStrokeWidth] = useState(STROKE_WIDTH);
  const [strokeDashArray, setStrokeDashArray] =
    useState<number[]>(STROKE_DASH_ARRAY);

  const { save, canRedo, canUndo, undo, redo, canvasHistory, setHistoryIndex } =
    useHistory({
      canvas,
      saveCallback,
    });

  const { copy, paste } = useClipboard({ canvas });

  const { autoZoom } = useAutoResize({ canvas, container });

  useCanvasEvents({ save, canvas, setSelectedObjects, clearSelectionCallback });

  const editor = useMemo(() => {
    if (canvas) {
      return buildEditor({
        canvas,
        fillColor,
        strokeWidth,
        strokeColor,
        strokeDashArray,

        setFillColor,
        setStrokeColor,
        setStrokeWidth,
        setStrokeDashArray,

        fontFamily,
        setFontFamily,

        copy,
        paste,

        autoZoom,

        save,
        undo,
        redo,
        canUndo,
        canRedo,

        selectedObjects,
      });
    }

    return undefined;
  }, [
    canvas,
    fillColor,
    strokeWidth,
    strokeColor,
    strokeDashArray,

    fontFamily,

    copy,
    paste,

    autoZoom,

    save,
    undo,
    redo,
    canUndo,
    canRedo,

    selectedObjects,
  ]);

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

      // If an object goes outside of workspace's defined boundaries, it would get clipped:
      initialCanvas.clipPath = initialWorkspace;

      setCanvas(initialCanvas);
      setContainer(initialContainer);

      const currentState = JSON.stringify(initialCanvas.toJSON(JSON_KEYS));
      canvasHistory.current = [currentState];
      setHistoryIndex(0);
    },
    [canvasHistory, setHistoryIndex],
  );

  return { init, editor };
};
