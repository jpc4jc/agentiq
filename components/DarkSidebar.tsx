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
          color: #7a8fa8;
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
          color: #7a8fa8;
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
        .ds-item:hover { background: rgba(255,255,255,0.06); }
        .ds-item.active {
          background: rgba(79,142,247,0.15);
          border-color: rgba(79,142,247,0.25);
        }
        .ds-item-icon {
          font-size: 0.95rem;
          width: 18px;
          text-align: center;
          flex-shrink: 0;
        }
        .ds-item-label {
          font-size: 0.82rem;
          font-weight: 500;
          color: #8fa3c0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ds-item.active .ds-item-label { color: #7eb3ff; }
        .ds-item:hover:not(.active) .ds-item-label { color: #e2e8f0; }
        .ds-footer {
          padding: 1rem 1.25rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .ds-back {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.72rem;
          color: #7a8fa8;
          text-decoration: none;
          margin-bottom: 0.6rem;
          transition: color 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .ds-back:hover { color: #4f8ef7; }
        .ds-footer-text { font-size: 0.65rem; color: #7a8fa8; }

        .mobile-tab-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #0a0f1e;
          border-top: 1px solid rgba(255,255,255,0.08);
          z-index: 200;
          padding-bottom: env(safe-area-inset-bottom);
        }
        .mobile-tab-inner {
          display: flex;
          justify-content: space-around;
          align-items: stretch;
        }
        .mobile-tab-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0.6rem 0.25rem;
          cursor: pointer;
          border: none;
          background: none;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.15s;
          gap: 0.2rem;
        }
        .mobile-tab-item.active { background: rgba(79,142,247,0.1); }
        .mobile-tab-icon { font-size: 1.2rem; line-height: 1; }
        .mobile-tab-label {
          font-size: 0.58rem;
          font-weight: 500;
          color: #5a6a80;
          text-align: center;
          letter-spacing: 0.02em;
        }
        .mobile-tab-item.active .mobile-tab-label { color: #7eb3ff; }

        .mobile-header {
          display: none;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          background: #0a0f1e;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .mobile-header-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 1.2rem;
          color: #fff;
          text-decoration: none;
          letter-spacing: -0.02em;
        }
        .mobile-header-logo span { color: #4f8ef7; }
        .mobile-header-back {
          font-size: 0.75rem;
          color: #7a8fa8;
          text-decoration: none;
          font-family: 'DM Sans', sans-serif;
        }

        @media (max-width: 768px) {
          .dark-sidebar { display: none; }
          .mobile-tab-bar { display: block; }
          .mobile-header { display: flex; }
        }
      `}</style>

      {/* Desktop sidebar */}
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

      {/* Mobile top header */}
      <div className="mobile-header">
        <a href="/" className="mobile-header-logo">Agent<span>IQ</span></a>
        <a href="/" className="mobile-header-back">← Home</a>
      </div>

      {/* Mobile bottom tab bar */}
      <div className="mobile-tab-bar">
        <div className="mobile-tab-inner">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`mobile-tab-item${activeTool === tool.id ? " active" : ""}`}
            >
              <span className="mobile-tab-icon">{tool.icon}</span>
              <span className="mobile-tab-label">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
