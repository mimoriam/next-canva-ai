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
import { selectionDependentTools } from "@/app/features/editor/types/selection-dependent-tools.types";
import { StrokeColorSidebar } from "@/app/features/editor/components/sidebar/stroke-color/stroke-color-sidebar";
import { StrokeWidthSidebar } from "@/app/features/editor/components/sidebar/stroke-width/stroke-width-sidebar";
import { OpacitySidebar } from "@/app/features/editor/components/sidebar/opacity/opacity-sidebar";
import { TextSidebar } from "@/app/features/editor/components/sidebar/text-tool/text-sidebar";
import { FontSidebar } from "@/app/features/editor/components/sidebar/font-tool/font-sidebar";
import { ImageSidebar } from "@/app/features/editor/components/sidebar/image-tool/image-sidebar";
import { FilterSidebar } from "@/app/features/editor/components/sidebar/filter-tool/filter-sidebar";
import { AiSidebar } from "@/app/features/editor/components/sidebar/ai-tool/ai-sidebar";
import { RemoveBgSidebar } from "@/app/features/editor/components/sidebar/bg-remove-tool/remove-bg-sidebar";
import { DrawSidebar } from "@/app/features/editor/components/sidebar/draw-tool/draw-sidebar";
import { SettingsSidebar } from "@/app/features/editor/components/sidebar/settings-tool/settings-sidebar";

export const Editor = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>("select");

  const onClearSelection = useCallback(() => {
    if (selectionDependentTools.includes(activeTool)) {
      setActiveTool("select");
    }
  }, [activeTool]);

  const { init, editor } = useEditor({
    clearSelectionCallback: onClearSelection,
  });

  const onChangeActiveTool = useCallback(
    (tool: ActiveTool) => {
      if (tool === activeTool) {
        return setActiveTool("select");
      }

      if (tool === "draw") {
        editor?.enableDrawingMode();
      }

      if (activeTool === "draw") {
        editor?.disableDrawingMode();
      }

      setActiveTool(tool);
    },
    [editor, activeTool],
  );

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

        <StrokeColorSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <StrokeWidthSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <OpacitySidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <TextSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <FontSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <ImageSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <FilterSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <AiSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <RemoveBgSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <DrawSidebar
          editor={editor}
          activeTool={activeTool}
          onChangeActiveTool={onChangeActiveTool}
        />

        <SettingsSidebar
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

          <Footer editor={editor} />
        </main>
      </div>
    </div>
  );
};
