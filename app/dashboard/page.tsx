"use client";
import { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const tools: Record<Tool, React.ReactNode> = {
    neighborhood: <NeighborhoodTool />,
    offer: <OfferTool />,
    photo: <PhotoTool />,
    client: <ClientTool />,
    docs: <DocTool />,
    diagnostic: <DiagnosticTool />,
  };

  const toolList = [
    { id: "neighborhood" as Tool, label: "Neighborhood story", icon: "📍" },
    { id: "offer" as Tool, label: "Offer strategy", icon: "📈" },
    { id: "photo" as Tool, label: "Photo critique", icon: "📷" },
    { id: "client" as Tool, label: "Client matcher", icon: "🤝" },
    { id: "docs" as Tool, label: "Doc risk scanner", icon: "🔍" },
    { id: "diagnostic" as Tool, label: "Listing diagnostic", icon: "🩺" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
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
        .mobile-top {
          background: #0a0f1e;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 1rem 1.25rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .mobile-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 1.2rem;
          color: #fff;
          text-decoration: none;
        }
        .mobile-logo span { color: #4f8ef7; }
        .mobile-home {
          font-size: 0.75rem;
          color: #7a8fa8;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
        }
        .mobile-tabs {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #0a0f1e;
          border-top: 1px solid rgba(255,255,255,0.08);
          z-index: 200;
          display: flex;
          padding-bottom: env(safe-area-inset-bottom);
        }
        .mobile-tab {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0.6rem 0.1rem;
          cursor: pointer;
          border: none;
          background: none;
          gap: 0.15rem;
          font-family: 'DM Sans', sans-serif;
        }
        .mobile-tab.active { background: rgba(79,142,247,0.1); }
        .mobile-tab-icon { font-size: 1.1rem; line-height: 1; }
        .mobile-tab-label {
          font-size: 0.5rem;
          color: #5a6a80;
          text-align: center;
        }
        .mobile-tab.active .mobile-tab-label { color: #7eb3ff; }
        @media (max-width: 900px) {
          .dashboard-inner { padding: 1rem; }
        }
      `}</style>

      {isMobile ? (
        /* Mobile layout */
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: "#f8f9fc" }}>
          <div className="mobile-top">
            <a href="/" className="mobile-logo">Agent<span>IQ</span></a>
            <a href="/" className="mobile-home">← Home</a>
          </div>
          <div style={{ flex: 1, overflowY: "auto", paddingBottom: "80px" }}>
            <div className="dashboard-inner">
              {tools[activeTool]}
            </div>
          </div>
          <div className="mobile-tabs">
            {toolList.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`mobile-tab${activeTool === tool.id ? " active" : ""}`}
              >
                <span className="mobile-tab-icon">{tool.icon}</span>
                <span className="mobile-tab-label">{tool.label}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Desktop layout */
        <div className="dashboard-shell">
          <DarkSidebar activeTool={activeTool} setActiveTool={setActiveTool} />
          <main className="dashboard-main">
            <div className="dashboard-inner">
              {tools[activeTool]}
            </div>
          </main>
        </div>
      )}
    </>
  );
}
