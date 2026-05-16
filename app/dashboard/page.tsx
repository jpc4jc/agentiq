"use client";
import { useState } from "react";
import DarkSidebar from "@/components/DarkSidebar";
import NeighborhoodTool from "@/components/tools/NeighborhoodTool";
import OfferTool from "@/components/tools/OfferTool";
import PhotoTool from "@/components/tools/PhotoTool";
import ClientTool from "@/components/tools/ClientTool";
import DocTool from "@/components/tools/DocTool";
import DiagnosticTool from "@/components/tools/DiagnosticTool";

export const dynamic = "force-dynamic";

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
    <>
      <style>{`
        .dashboard-shell {
          display: flex;
          height: 100vh;
          overflow: hidden;
          background: #0f1422;
        }
        .dashboard-main {
          flex: 1;
          overflow-y: auto;
          background: #f8f9fc;
          padding-bottom: 80px;
        }
        .dashboard-inner {
          max-width: 760px;
          margin: 0 auto;
          padding: 2.5rem 2rem;
        }
        @media (max-width: 768px) {
          .dashboard-inner {
            padding: 1.25rem 1rem;
          }
        }
      `}</style>
      <div className="dashboard-shell">
        <DarkSidebar activeTool={activeTool} setActiveTool={setActiveTool} />
        <main className="dashboard-main">
          <div className="dashboard-inner">
            {tools[activeTool]}
          </div>
        </main>
      </div>
    </>
  );
}
