import { Editor } from "@/app/features/editor/types/editor.types";
import { ActiveTool } from "@/app/features/editor/types/active-tool.types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/app/features/editor/components/sidebar/tool-sidebar-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolSidebarClose } from "@/app/features/editor/components/sidebar/tool-sidebar-close";
import { Button } from "@/components/ui/button";
import { fonts } from "@/app/features/editor/types/fonts.types";

interface FontSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const FontSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: FontSidebarProps) => {
  const value = editor?.getActiveFontFamily();

  const onClose = () => {
    onChangeActiveTool("select");
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "font" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader title="Font" description="Change the text font" />

      <ScrollArea>
        <div className="space-y-1 border-b p-4">
          {fonts.map((font) => (
            <Button
              key={font}
              variant="secondary"
              size="lg"
              className={cn(
                "h-16 w-full justify-start text-left",
                value === font && "border-2 border-blue-500",
              )}
              style={{
                fontFamily: font,
                fontSize: "16px",
                padding: "8px 16px",
              }}
              onClick={() => editor?.changeFontFamily(font)}
            >
              {font}
            </Button>
          ))}
        </div>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
