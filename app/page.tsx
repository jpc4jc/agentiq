"use client";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import NeighborhoodTool from "@/components/tools/NeighborhoodTool";
import OfferTool from "@/components/tools/OfferTool";
import PhotoTool from "@/components/tools/PhotoTool";
import ClientTool from "@/components/tools/ClientTool";
import DocTool from "@/components/tools/DocTool";
import DiagnosticTool from "@/components/tools/DiagnosticTool";

export type Tool = "neighborhood" | "offer" | "photo" | "client" | "docs" | "diagnostic";

export default function Home() {
  const [activeTool, setActiveTool] = useState<Tool>("neighborhood");

  const tools: Record<Tool, React.ReactNode> = {
    neighborhood: <NeighborhoodTool />,
    offer: <OfferTool />,
    photo: <PhotoTool />,
    client: <ClientTool />,
    docs: <DocTool />,
    diagnostic: <DiagnosticTool />,
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeTool={activeTool} setActiveTool={setActiveTool} />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-8 py-8">
          {tools[activeTool]}
        </div>
      </main>
    </div>
  );
}
