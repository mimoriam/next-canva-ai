"use client";

import { SidebarItem } from "@/app/features/editor/components/sidebar-item";
import {
  LayoutTemplate,
  ImageIcon,
  Pencil,
  Settings,
  Shapes,
  Sparkles,
  Type,
} from "lucide-react";

export const Sidebar = () => {
  return (
    <aside className="flex h-full w-[100px] flex-col overflow-auto border-r bg-white">
      <ul className="flex flex-col">
        <SidebarItem icon={LayoutTemplate} label="Design" onClick={() => {}} />
        <SidebarItem
          icon={ImageIcon}
          label="Image"
          isActive={true}
          onClick={() => {}}
        />
        <SidebarItem icon={Type} label="Text" onClick={() => {}} />
        <SidebarItem icon={Shapes} label="Shapes" onClick={() => {}} />
        <SidebarItem icon={Pencil} label="Draw" onClick={() => {}} />
        <SidebarItem icon={Sparkles} label="AI" onClick={() => {}} />
        <SidebarItem icon={Settings} label="Settings" onClick={() => {}} />
      </ul>
    </aside>
  );
};
