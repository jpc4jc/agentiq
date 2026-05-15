"use client";
import { useState } from "react";
import ToolShell from "@/components/ui/ToolShell";
import ResultBox from "@/components/ui/ResultBox";
import RunButton from "@/components/ui/RunButton";

const personas = ["Young families", "Remote workers", "Retirees", "Investors", "First-time buyers", "Luxury buyers"];

export default function NeighborhoodTool() {
  const [address, setAddress] = useState("");
  const [selectedPersonas, setSelectedPersonas] = useState<string[]>(["Young families"]);
  const [tone, setTone] = useState("warm and community-focused");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePersona = (p: string) => {
    setSelectedPersonas((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
  };

  const run = async () => {
    if (!address) return;
    setLoading(true);
    setResult("");
    const prompt = `Search the web to verify what city and neighborhood ${address} is in. Then write 2 punchy MLS-ready paragraphs targeting ${selectedPersonas.join(", ")} buyers with a ${tone} tone. Include verified commute times, community character, and confirmed local events or amenities. Do NOT mention walking distance to anything. Do NOT mention schools unless they rank in the top 20% statewide — if unsure, omit schools entirely. End with 4 data tags formatted as "📍 Label: Value". Be specific, no clichés.`;
    
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResult(data.result || data.error);
    setLoading(false);
  };

  return (
    <ToolShell
      title="Neighborhood storyteller"
      subtitle="Generate buyer-persona-targeted neighborhood copy in seconds."
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address, neighborhood, or ZIP code
          </label>
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Grant Park, Atlanta GA 30312"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Target buyer personas
          </label>
          <div className="flex flex-wrap gap-2">
            {personas.map((p) => (
              <button
                key={p}
                onClick={() => togglePersona(p)}
                className={`text-sm px-3 py-1.5 rounded-full border transition-all ${
                  selectedPersonas.includes(p)
                    ? "bg-blue-50 border-blue-300 text-blue-700 font-medium"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tone</label>
          <select
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
          >
            <option>warm and community-focused</option>
            <option>aspirational and lifestyle-driven</option>
            <option>data-forward and practical</option>
            <option>luxury and sophisticated</option>
          </select>
        </div>

        <RunButton onClick={run} loading={loading} label="Generate draft" />
      </div>

      <ResultBox loading={loading} result={result} label="Generated neighborhood copy" />
    </ToolShell>
  );
}
