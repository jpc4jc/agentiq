"use client";
import { Tool } from "@/app/page";

const tools: { id: Tool; label: string; icon: string; description: string }[] = [
  { id: "neighborhood", label: "Neighborhood story", icon: "📍", description: "Persona-targeted copy" },
  { id: "offer", label: "Offer strategy", icon: "📈", description: "Negotiation playbook" },
  { id: "photo", label: "Photo critique", icon: "📷", description: "Staging & composition" },
  { id: "client", label: "Client matcher", icon: "🤝", description: "Psych-fit profiling" },
  { id: "docs", label: "Doc risk scanner", icon: "🔍", description: "Disclosure red flags" },
  { id: "diagnostic", label: "Listing diagnostic", icon: "🩺", description: "Why isn't it selling?" },
];

export default function Sidebar({
  activeTool,
  setActiveTool,
}: {
  activeTool: Tool;
  setActiveTool: (t: Tool) => void;
}) {
  return (
    <aside className="w-60 shrink-0 bg-white border-r border-gray-200 flex flex-col h-screen">
      <div className="px-5 py-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-xl">🏡</span>
          <span className="font-semibold text-gray-900 text-lg">
            Agent<span className="text-blue-600">IQ</span>
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-0.5 ml-7">AI tools for realtors</p>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">
          Tools
        </p>
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(tool.id)}
            className={`w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-lg transition-all ${
              activeTool === tool.id
                ? "bg-blue-50 text-blue-700 border border-blue-100"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
            }`}
          >
            <span className="text-base mt-0.5">{tool.icon}</span>
            <div className="min-w-0">
              <div className={`text-sm font-medium truncate ${activeTool === tool.id ? "text-blue-700" : ""}`}>
                {tool.label}
              </div>
              <div className="text-[11px] text-gray-400 truncate">{tool.description}</div>
            </div>
          </button>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-gray-100">
        <p className="text-[11px] text-gray-400">Powered by Claude AI</p>
      </div>
    </aside>
  );
}
