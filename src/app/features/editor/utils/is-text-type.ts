import * as fabric from "fabric";

export function isTextType(type: string | undefined) {
  return type === "text" || type === "i-text" || type === "textbox";
}

export function isTextTypeObject(object: fabric.FabricObject) {
  return (
    object.isType("text") || object.isType("i-text") || object.isType("textbox")
  );
}
