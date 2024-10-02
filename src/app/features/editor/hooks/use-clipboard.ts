import * as fabric from "fabric";
import { useCallback, useRef } from "react";

interface UseClipboardProps {
  canvas: fabric.Canvas | null;
}
export const useClipboard = ({ canvas }: UseClipboardProps) => {
  const clipboard = useRef<any>(null);

  const copy = () => {
    canvas
      ?.getActiveObject()
      ?.clone()
      .then((cloned) => {
        clipboard.current = cloned;
      });
  };

  // const copy = useCallback(async () => {
  //   const cloned = await canvas?.getActiveObject()?.clone();
  //
  //   clipboard.current = cloned;
  // }, [canvas]);

  const paste = async () => {
    if (!clipboard.current) return;

    const clonedObj = await clipboard.current.clone();

    canvas?.discardActiveObject();

    clonedObj.set({
      left: clonedObj.left + 10,
      top: clonedObj.top + 10,
      evented: true,
    });

    if (clonedObj instanceof fabric.ActiveSelection) {
      clonedObj.canvas = canvas as fabric.Canvas;

      clonedObj.forEachObject((obj) => {
        canvas?.add(obj);
      });

      clonedObj.setCoords();
    } else {
      canvas?.add(clonedObj);
    }

    clipboard.current.top += 10;
    clipboard.current.left += 10;

    canvas?.setActiveObject(clonedObj);

    canvas?.requestRenderAll();
  };

  // const paste = useCallback(async () => {
  //   if (!clipboard.current) return;
  //
  //   const clonedObj = await clipboard.current.clone();
  //
  //   canvas?.discardActiveObject();
  //
  //   clonedObj.set({
  //     left: clonedObj.left + 10,
  //     top: clonedObj.top + 10,
  //     evented: true,
  //   });
  //
  //   if (clonedObj.type === "activeSelection") {
  //     clonedObj.canvas = canvas;
  //     clonedObj.forEachObject((obj) => {
  //       canvas?.add(obj);
  //     });
  //
  //     clonedObj.setCoords();
  //   } else {
  //     canvas?.add(clonedObj);
  //   }
  //
  //   clipboard.current.top += 10;
  //   clipboard.current.left += 10;
  //
  //   canvas?.setActiveObject(clonedObj);
  //
  //   canvas?.requestRenderAll();
  // }, [canvas]);

  return { copy, paste };
};
