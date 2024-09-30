import { Editor } from "@/app/features/editor/types/editor.types";
import { ActiveTool } from "@/app/features/editor/types/active-tool.types";
import { cn } from "@/lib/utils";
import { ToolSidebarHeader } from "@/app/features/editor/components/sidebar/tool-sidebar-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ToolSidebarClose } from "@/app/features/editor/components/sidebar/tool-sidebar-close";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface AiSidebarProps {
  editor: Editor | undefined;
  activeTool: ActiveTool;
  onChangeActiveTool: (tool: ActiveTool) => void;
}

export const AiSidebar = ({
  editor,
  activeTool,
  onChangeActiveTool,
}: AiSidebarProps) => {
  const onClose = () => {
    onChangeActiveTool("select");
  };

  const [value, setValue] = useState("");
  let mutation;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: block with paywall

    // mutation.mutate(
    //   { prompt: value },
    //   {
    //     onSuccess: ({ data }) => {
    //       editor?.addImage(data);
    //     },
    //   },
    // );
  };

  return (
    <aside
      className={cn(
        "relative z-[40] flex h-full w-[360px] flex-col border-r bg-white",
        activeTool === "ai" ? "visible" : "hidden",
      )}
    >
      <ToolSidebarHeader title="AI" description="Generate an image using AI" />

      <ScrollArea>
        <form onSubmit={onSubmit} className="space-y-6 p-4">
          <Textarea
            disabled={mutation.isPending}
            placeholder="An astronaut riding a horse on mars, hd, dramatic lighting"
            cols={30}
            rows={10}
            required
            minLength={3}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <Button
            disabled={mutation.isPending}
            type="submit"
            className="w-full"
          >
            Generate
          </Button>
        </form>
      </ScrollArea>

      <ToolSidebarClose onClick={onClose} />
    </aside>
  );
};
