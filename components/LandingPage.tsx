"use client";
import Link from "next/link";

const tools = [
  { icon: "📍", title: "Neighborhood Storyteller", desc: "Generate persona-targeted MLS copy grounded in verified local data — not guesswork." },
  { icon: "📈", title: "Offer Strategy Advisor", desc: "Get a full negotiation playbook with opening offer, escalation logic, and contingency stance." },
  { icon: "📷", title: "Photo Critique", desc: "Brutally honest staging and composition feedback before the photographer shows up." },
  { icon: "🤝", title: "Client Matcher", desc: "Profile buyer psychology to surface what they actually need vs. what they say they want." },
  { icon: "🔍", title: "Doc Risk Scanner", desc: "Plain-English red flags from disclosures, HOA docs, and inspection reports." },
  { icon: "🩺", title: "Listing Diagnostic", desc: "Find out exactly why a listing isn't selling — with a ranked fix-it action plan." },
];

export default function LandingPage() {
  return (
    <div className="landing-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .landing-root {
          background: #0a0f1e;
          color: #e8eaf0;
          font-family: 'DM Sans', sans-serif;
          min-height: 100vh;
          overflow-x: hidden;
        }
        .nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 3rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          position: sticky;
          top: 0;
          background: rgba(10,15,30,0.92);
          backdrop-filter: blur(12px);
          z-index: 100;
        }
        .nav-logo {
          font-family: 'DM Serif Display', serif;
          font-size: 1.5rem;
          color: #fff;
          letter-spacing: -0.02em;
        }
        .nav-logo span { color: #4f8ef7; }
        .nav-cta {
          background: #4f8ef7;
          color: #fff;
          border: none;
          padding: 0.6rem 1.4rem;
          border-radius: 6px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s;
          display: inline-block;
        }
        .nav-cta:hover { background: #3a7ae8; }
        .hero {
          max-width: 900px;
          margin: 0 auto;
          padding: 7rem 2rem 5rem;
          text-align: center;
          position: relative;
        }
        .hero-glow {
          position: absolute;
          top: 10%;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 400px;
          background: radial-gradient(ellipse, rgba(79,142,247,0.12) 0%, transparent 70%);
          pointer-events: none;
          z-index: -1;
        }
        .hero-eyebrow {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #4f8ef7;
          background: rgba(79,142,247,0.1);
          border: 1px solid rgba(79,142,247,0.2);
          padding: 0.35rem 0.9rem;
          border-radius: 99px;
          margin-bottom: 2rem;
        }
        .hero h1 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          line-height: 1.08;
          letter-spacing: -0.03em;
          color: #fff;
          margin-bottom: 1.5rem;
        }
        .hero h1 em { font-style: italic; color: #4f8ef7; }
        .hero-sub {
          font-size: 1.125rem;
          color: #8892a4;
          line-height: 1.7;
          max-width: 600px;
          margin: 0 auto 2.5rem;
          font-weight: 300;
        }
        .hero-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        .btn-primary {
          background: #4f8ef7;
          color: #fff;
          border: none;
          padding: 0.85rem 2rem;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
          display: inline-block;
        }
        .btn-primary:hover { background: #3a7ae8; transform: translateY(-1px); }
        .btn-secondary {
          background: transparent;
          color: #8892a4;
          border: 1px solid rgba(255,255,255,0.12);
          padding: 0.85rem 2rem;
          border-radius: 8px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          font-weight: 400;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
          display: inline-block;
        }
        .btn-secondary:hover { border-color: rgba(255,255,255,0.25); color: #e8eaf0; }
        .stats {
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          justify-content: center;
        }
        .stat {
          padding: 2rem 3rem;
          text-align: center;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .stat:last-child { border-right: none; }
        .stat-val {
          font-family: 'DM Serif Display', serif;
          font-size: 2rem;
          color: #fff;
          display: block;
        }
        .stat-lbl {
          font-size: 0.75rem;
          color: #2e3a50;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 0.25rem;
          display: block;
        }
        .tools-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 6rem 2rem;
        }
        .section-label {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #4f8ef7;
          margin-bottom: 1rem;
        }
        .section-title {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.8rem, 4vw, 2.8rem);
          color: #fff;
          letter-spacing: -0.02em;
          margin-bottom: 1rem;
          line-height: 1.15;
        }
        .section-sub {
          font-size: 1rem;
          color: #5a6478;
          margin-bottom: 3.5rem;
          font-weight: 300;
        }
        .tools-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          overflow: hidden;
        }
        .tool-card {
          background: #0d1423;
          padding: 2rem;
          transition: background 0.2s;
        }
        .tool-card:hover { background: #111827; }
        .tool-icon { font-size: 1.75rem; margin-bottom: 1rem; display: block; }
        .tool-title { font-size: 0.95rem; font-weight: 600; color: #e8eaf0; margin-bottom: 0.5rem; }
        .tool-desc { font-size: 0.85rem; color: #5a6478; line-height: 1.6; font-weight: 300; }
        .cta-section {
          margin: 0 auto 6rem;
          background: linear-gradient(135deg, #111827 0%, #0d1a33 100%);
          border: 1px solid rgba(79,142,247,0.2);
          border-radius: 16px;
          padding: 4rem;
          text-align: center;
          max-width: 900px;
        }
        .cta-section h2 {
          font-family: 'DM Serif Display', serif;
          font-size: clamp(1.8rem, 4vw, 2.5rem);
          color: #fff;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }
        .cta-section p { color: #5a6478; font-size: 1rem; margin-bottom: 2rem; font-weight: 300; }
        .footer {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 2rem 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .footer-logo { font-family: 'DM Serif Display', serif; color: #2a3347; font-size: 1.1rem; }
        .footer-logo span { color: #1e3a6e; }
        .footer-copy { font-size: 0.8rem; color: #2a3347; }
        @media (max-width: 768px) {
          .nav { padding: 1rem 1.5rem; }
          .tools-grid { grid-template-columns: 1fr; }
          .stats { flex-wrap: wrap; }
          .stat { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); flex: 1 1 50%; }
          .cta-section { padding: 2.5rem 1.5rem; margin: 0 1rem 4rem; }
          .footer { flex-direction: column; gap: 0.5rem; text-align: center; }
        }
      `}</style>

      <nav className="nav">
        <div className="nav-logo">Agent<span>IQ</span></div>
        <Link href="/dashboard" className="nav-cta">Open app →</Link>
      </nav>

      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-eyebrow">AI-powered · Built for realtors</div>
        <h1>Close more deals with <em>smarter</em> tools</h1>
        <p className="hero-sub">Six AI tools that help realtors write better listings, negotiate sharper offers, understand their clients, and diagnose stale properties — all in one place.</p>
        <div className="hero-actions">
          <Link href="/dashboard" className="btn-primary">Launch AgentIQ →</Link>
          <a href="#tools" className="btn-secondary">See the tools</a>
        </div>
      </section>

      <div className="stats">
        <div className="stat"><span className="stat-val">6</span><span className="stat-lbl">AI tools</span></div>
        <div className="stat"><span className="stat-val">~30s</span><span className="stat-lbl">Per analysis</span></div>
        <div className="stat"><span className="stat-val">100%</span><span className="stat-lbl">Web-verified</span></div>
        <div className="stat"><span className="stat-val">0</span><span className="stat-lbl">Generic templates</span></div>
      </div>

      <section className="tools-section" id="tools">
        <p className="section-label">The toolkit</p>
        <h2 className="section-title">Every tool you need,<br />at every stage of the deal</h2>
        <p className="section-sub">From first showing to closing day — AgentIQ has you covered.</p>
        <div className="tools-grid">
          {tools.map((tool) => (
            <div key={tool.title} className="tool-card">
              <span className="tool-icon">{tool.icon}</span>
              <div className="tool-title">{tool.title}</div>
              <div className="tool-desc">{tool.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to work smarter?</h2>
        <p>No signup required. Start using all six tools instantly.</p>
        <Link href="/dashboard" className="btn-primary">Launch AgentIQ →</Link>
      </section>

      <footer className="footer">
        <div className="footer-logo">Agent<span>IQ</span></div>
        <div className="footer-copy">Powered by Claude AI · Built for real estate professionals</div>
      </footer>
    </div>
  );
}
