"use client";

import { Editor } from "@/app/features/editor/types/editor.types";
import { ActiveTool } from "@/app/features/editor/types/active-tool.types";
import { useState } from "react";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsBorderWidth } from "react-icons/bs";

interface ToolbarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const Toolbar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ToolbarProps) => {
  const fillColor = editor?.getActiveFillColor();
  const strokeColor = editor?.getActiveStrokeColor();

  const [properties, setProperties] = useState({
    fillColor,
    strokeColor,
  });

  // Disable the fill icon if no object selected:
  if (editor?.selectedObjects.length === 0) {
    return (
      <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2" />
    );
  }

  return (
    <div className="z-[49] flex h-[56px] w-full shrink-0 items-center gap-x-2 overflow-x-auto border-b bg-white p-2">
      <div className="flex h-full items-center justify-center">
        <Hint label="Color" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("fill")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "fill" && "bg-gray-100")}
          >
            <div
              className="size-4 rounded-sm border"
              style={{ backgroundColor: properties.fillColor }}
            />
          </Button>
        </Hint>
      </div>

      <div className="flex h-full items-center justify-center">
        <Hint label="Stroke color" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("stroke-color")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "stroke-color" && "bg-gray-100")}
          >
            <div
              className="size-4 rounded-sm border-2 bg-white"
              style={{ borderColor: properties.strokeColor }}
            />
          </Button>
        </Hint>
      </div>

      <div className="flex h-full items-center justify-center">
        <Hint label="Stroke width" side="bottom" sideOffset={5}>
          <Button
            onClick={() => onChangeActiveTool("stroke-width")}
            size="icon"
            variant="ghost"
            className={cn(activeTool === "stroke-width" && "bg-gray-100")}
          >
            <BsBorderWidth className="size-4" />
          </Button>
        </Hint>
      </div>
    </div>
  );
};
