import { ActiveTool } from "@/app/features/editor/types/active-tool.types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/app/features/editor/components/sidebar/tool-sidebar-header";
import { ToolSidebarClose } from "@/app/features/editor/components/sidebar/tool-sidebar-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShapeTool } from "@/app/features/editor/components/sidebar/shape-tool/shape-tool";
import { FaCircle, FaDiamond, FaSquare, FaSquareFull } from "react-icons/fa6";
import { IoTriangle } from "react-icons/io5";
import { Editor } from "@/app/features/editor/types/editor.types";

interface ShapeSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const ShapeSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: ShapeSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "shapes" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader
        title="Shapes"
        description="Add shapes to your canvas"
      />

      <ScrollArea>
        <div className="grid grid-cols-3 gap-4 p-4">
          <ShapeTool onClick={() => editor?.addCircle()} icon={FaCircle} />

          <ShapeTool
            onClick={() => editor?.addSoftRectangle()}
            icon={FaSquare}
          />

          <ShapeTool
            onClick={() => editor?.addRectangle()}
            icon={FaSquareFull}
          />

          <ShapeTool onClick={() => editor?.addTriangle()} icon={IoTriangle} />

          <ShapeTool
            onClick={() => editor?.addInverseTriangle()}
            icon={IoTriangle}
            iconClassName="rotate-180"
          />

          <ShapeTool onClick={() => editor?.addDiamond()} icon={FaDiamond} />
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
