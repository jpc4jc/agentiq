"use client";
import { useState } from "react";
import { Tool } from "@/types/tools";
import DarkSidebar from "@/components/DarkSidebar";
import dynamic from "next/dynamic";

export type { Tool } from "@/types/tools";

const NeighborhoodTool = dynamic(() => import("@/components/tools/NeighborhoodTool"), { ssr: false, loading: () => <p style={{padding:"2rem", color:"#666"}}>Loading...</p> });
const OfferTool = dynamic(() => import("@/components/tools/OfferTool"), { ssr: false, loading: () => <p style={{padding:"2rem", color:"#666"}}>Loading...</p> });
const PhotoTool = dynamic(() => import("@/components/tools/PhotoTool"), { ssr: false, loading: () => <p style={{padding:"2rem", color:"#666"}}>Loading...</p> });
const ClientTool = dynamic(() => import("@/components/tools/ClientTool"), { ssr: false, loading: () => <p style={{padding:"2rem", color:"#666"}}>Loading...</p> });
const DocTool = dynamic(() => import("@/components/tools/DocTool"), { ssr: false, loading: () => <p style={{padding:"2rem", color:"#666"}}>Loading...</p> });
const DiagnosticTool = dynamic(() => import("@/components/tools/DiagnosticTool"), { ssr: false, loading: () => <p style={{padding:"2rem", color:"#666"}}>Loading...</p> });

export default function DashboardPage() {
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
          .dashboard-inner { padding: 1.25rem 1rem; }
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
