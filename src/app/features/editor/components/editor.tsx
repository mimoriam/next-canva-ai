"use client";

import { useEditor } from "@/app/features/editor/hooks/use-editor";
import { useCallback, useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { Navbar } from "@/app/features/editor/components/navbar";
import { Sidebar } from "@/app/features/editor/components/sidebar/sidebar";
import { Toolbar } from "@/app/features/editor/components/toolbar";
import { Footer } from "@/app/features/editor/components/footer";
import { ActiveTool } from "@/app/features/editor/types/active-tool.types";
import { ShapeSidebar } from "@/app/features/editor/components/sidebar/shape-tool/shape-sidebar";
import { FillColorSidebar } from "@/app/features/editor/components/sidebar/fill-color/fill-color-sidebar";

export const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        return setActiveTool("select");
      }

      if (tool === "draw") {
        //* TODO: Enable draw mode
      }

      if (activeTool === "draw") {
        //* TODO: Disable draw mode
      }

      setActiveTool(tool);
    },
    [activeTool],
  );

  const { init, editor } = useEditor();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = new fabric.Canvas(canvasRef.current, {
      controlsAboveOverlay: true,
      preserveObjectStacking: true,
    });

    init({
      initialCanvas: canvas,
      initialContainer: containerRef.current!,
    });

    return () => {
      canvas.dispose().then();
    };
  }, [init]);

  return (
    <div className="flex h-full flex-col">
      <Navbar onChangeActiveTool={onChangeActiveTool} activeTool={activeTool} />
      <div className="absolute top-[68px] flex h-[calc(100%-68px)] w-full">
        <Sidebar
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        {/* Conditional Rendering from here till <main>: */}
        <ShapeSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <FillColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <main className="relative flex flex-1 flex-col overflow-auto bg-muted">
          <Toolbar
            editor={editor}
            activeTool={activeTool}
            onChangeActiveTool={onChangeActiveTool}
            key={JSON.stringify(editor?.canvas.getActiveObject())}
          />
          <div
            className="h-[calc(100%-124px)] flex-1 bg-muted"
            ref={containerRef}
          >
            <canvas ref={canvasRef} />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};
