"use client";
import { useState } from "react";
import ToolShell from "@/components/ui/ToolShell";
import ResultBox from "@/components/ui/ResultBox";
import RunButton from "@/components/ui/RunButton";

export default function ClientTool() {
  const [name, setName] = useState("");
  const [stated, setStated] = useState("");
  const [notes, setNotes] = useState("");
  const [budget, setBudget] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!stated && !notes) return;
    setLoading(true);
    setResult("");
    const prompt = `You are a buyer psychology expert. Profile this real estate client and identify the gap between what they say they want vs. what they actually need.

Client name: ${name || "Not provided"}
Budget: ${budget || "Not specified"}
What they say they want: ${stated}
Realtor's observations and notes: ${notes}

Provide:
1. **Psychological buyer profile** (2-3 sentences): What kind of buyer are they really? What's their underlying anxiety or desire driving this purchase?
2. **Stated wants vs. actual needs**: A side-by-side breakdown
3. **Green light attributes** ✅: Features to prioritize in your search
4. **Red flags to avoid** ❌: Listing types to skip even if they match stated criteria
5. **How to talk to them**: Communication style, what language resonates, how often to follow up
6. **Predicted friction points**: Where in the process will they likely get cold feet, and how to prevent it

Be insightful and specific. This is about reading between the lines.`;

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
      title="Client personality matcher"
      subtitle="Understand what your buyers actually need — not just what they say they want."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Client name</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. The Hendersons"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. $600K–$700K"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            What they say they want
          </label>
          <textarea
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
            placeholder="Open floor plan, 4BR, big yard, good schools, under $700K, 2-car garage…"
            value={stated}
            onChange={(e) => setStated(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your observations from conversations
          </label>
          <textarea
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={4}
            placeholder="Both work from home, 2 kids ages 4 and 7, mentioned noise 3 times, host dinner parties monthly, dog owner, seemed anxious about HOA rules…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <RunButton onClick={run} loading={loading} label="Profile client" />
      </div>

      <ResultBox loading={loading} result={result} label="Client psychological profile" />
    </ToolShell>
  );
}
