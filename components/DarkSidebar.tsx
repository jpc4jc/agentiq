"use client";
import Link from "next/link";
import { Tool } from "@/app/dashboard/page";

const tools: { id: Tool; label: string; icon: string }[] = [
  { id: "neighborhood", label: "Neighborhood story", icon: "📍" },
  { id: "offer", label: "Offer strategy", icon: "📈" },
  { id: "photo", label: "Photo critique", icon: "📷" },
  { id: "client", label: "Client matcher", icon: "🤝" },
  { id: "docs", label: "Doc risk scanner", icon: "🔍" },
  { id: "diagnostic", label: "Listing diagnostic", icon: "🩺" },
];

export default function DarkSidebar({
  activeTool,
  setActiveTool,
}: {
  activeTool: Tool;
  setActiveTool: (t: Tool) => void;
}) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        .dark-sidebar {
          width: 220px;
          min-width: 220px;
          background: #0a0f1e;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          height: 100vh;
          font-family: 'DM Sans', sans-serif;
        }
        .ds-logo-wrap {
          padding: 1.5rem 1.25rem 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .ds-logo-text {
          font-family: 'DM Serif Display', serif;
          font-size: 1.3rem;
          color: #fff;
          letter-spacing: -0.02em;
          text-decoration: none;
          display: block;
        }
        .ds-logo-text span { color: #4f8ef7; }
        .ds-logo-sub {
          font-size: 0.68rem;
          color: #2e3a50;
          margin-top: 0.2rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .ds-nav {
          flex: 1;
          padding: 1rem 0.75rem;
          overflow-y: auto;
        }
        .ds-section-label {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #2e3a50;
          padding: 0 0.5rem;
          margin-bottom: 0.5rem;
        }
        .ds-item {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          padding: 0.6rem 0.75rem;
          border-radius: 7px;
          cursor: pointer;
          border: 1px solid transparent;
          margin-bottom: 2px;
          transition: all 0.15s;
          width: 100%;
          text-align: left;
          background: none;
          font-family: 'DM Sans', sans-serif;
        }
        .ds-item:hover { background: rgba(255,255,255,0.04); }
        .ds-item.active {
          background: rgba(79,142,247,0.12);
          border-color: rgba(79,142,247,0.2);
        }
        .ds-item-icon { font-size: 0.95rem; width: 18px; text-align: center; flex-shrink: 0; }
        .ds-item-label {
          font-size: 0.82rem;
          font-weight: 500;
          color: #5a6a80;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ds-item.active .ds-item-label { color: #7eb3ff; }
        .ds-item:hover:not(.active) .ds-item-label { color: #c8d0e0; }
        .ds-footer {
          padding: 1rem 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .ds-back {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.72rem;
          color: #2e3a50;
          text-decoration: none;
          margin-bottom: 0.6rem;
          transition: color 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .ds-back:hover { color: #4f8ef7; }
        .ds-footer-text { font-size: 0.65rem; color: #1e2a3a; }
      `}</style>
      <aside className="dark-sidebar">
        <div className="ds-logo-wrap">
          <a href="/" className="ds-logo-text">Agent<span>IQ</span></a>
          <div className="ds-logo-sub">AI tools for realtors</div>
        </div>
        <nav className="ds-nav">
          <div className="ds-section-label">Tools</div>
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`ds-item${activeTool === tool.id ? " active" : ""}`}
            >
              <span className="ds-item-icon">{tool.icon}</span>
              <span className="ds-item-label">{tool.label}</span>
            </button>
          ))}
        </nav>
        <div className="ds-footer">
          <Link href="/" className="ds-back">← Home</Link>
          <div className="ds-footer-text">Powered by Claude AI</div>
        </div>
      </aside>
    </>
  );
}
