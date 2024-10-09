import { Navbar } from "@/app/(dashboard)/navbar";
import { Sidebar } from "@/app/(dashboard)/sidebar";
import React from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="h-full bg-muted">
      <Sidebar />
      <div className="flex h-full flex-col lg:pl-[300px]">
        <Navbar />
        <main className="flex-1 overflow-auto bg-white p-8 lg:rounded-tl-2xl">
          {children}
        </main>
      </div>
    </div>
  );
};
export default DashboardLayout;
