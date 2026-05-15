"use client";
import { useState } from "react";
import DarkSidebar from "@/components/DarkSidebar";
import NeighborhoodTool from "@/components/tools/NeighborhoodTool";
import OfferTool from "@/components/tools/OfferTool";
import PhotoTool from "@/components/tools/PhotoTool";
import ClientTool from "@/components/tools/ClientTool";
import DocTool from "@/components/tools/DocTool";
import DiagnosticTool from "@/components/tools/DiagnosticTool";

export type Tool = "neighborhood" | "offer" | "photo" | "client" | "docs" | "diagnostic";

export default function Dashboard() {
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
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#0f1422" }}>
      <DarkSidebar activeTool={activeTool} setActiveTool={setActiveTool} />
      <main style={{ flex: 1, overflowY: "auto", background: "#f8f9fc" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "2.5rem 2rem" }}>
          {tools[activeTool]}
        </div>
      </main>
    </div>
  );
}
