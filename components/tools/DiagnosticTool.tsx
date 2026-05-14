"use client";
import { useState } from "react";
import ToolShell from "@/components/ui/ToolShell";
import ResultBox from "@/components/ui/ResultBox";
import RunButton from "@/components/ui/RunButton";

export default function DiagnosticTool() {
  const [address, setAddress] = useState("");
  const [listPrice, setListPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [dom, setDom] = useState("");
  const [showings, setShowings] = useState("");
  const [offers, setOffers] = useState("0");
  const [competitors, setCompetitors] = useState("");
  const [season, setSeason] = useState("Spring");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!dom && !listPrice) return;
    setLoading(true);
    setResult("");
    const prompt = `You are a real estate listing performance expert. Diagnose why this listing is not selling and provide a ranked action plan.

Listing data:
- Address: ${address || "Not specified"}
- Current list price: ${listPrice}
- Original list price: ${originalPrice || "same as current"}
- Days on market: ${dom}
- Showings this month: ${showings || "unknown"}
- Offers received: ${offers}
- Competing active listings nearby: ${competitors || "unknown"}
- Season listed: ${season}
- Agent notes: ${notes || "none"}

Diagnose and prescribe:

**Verdict** (1-2 sentences): What's the #1 reason this isn't selling?

**Ranked Action Plan**:
For each issue, format as:
🔴 #1 [Category]: [Specific problem] → [Specific fix with measurable outcome]
🟡 #2 ...
🟢 #3 ...
(Continue for all identified issues)

**Price analysis**: Is price the problem? If yes, what price would likely generate activity within 2 weeks? If no, explain why.

**Photography & marketing audit**: Based on typical patterns for this DOM and showing count, what's likely wrong with the listing presentation?

**Timing & seasonality**: How is the season affecting this listing and what's the optimal re-launch window?

**The one thing**: If the agent can only do one thing this week, what should it be?

Be specific and honest. This listing needs a real diagnosis, not cheerleading.`;

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
      title="Listing diagnostic"
      subtitle="Find out exactly why a listing isn't selling — and get a ranked fix-it plan."
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Property address</label>
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 42 Maple Street, Atlanta GA"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Days on market</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="67"
              value={dom}
              onChange={(e) => setDom(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Showings / mo</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="4"
              value={showings}
              onChange={(e) => setShowings(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Offers received</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
              value={offers}
              onChange={(e) => setOffers(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current list price</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="$649,000"
              value={listPrice}
              onChange={(e) => setListPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Original list price</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="$675,000"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Competing listings nearby</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 12 within 1 mile"
              value={competitors}
              onChange={(e) => setCompetitors(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Current season</label>
            <select
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            >
              <option>Spring</option>
              <option>Summer</option>
              <option>Fall</option>
              <option>Winter</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional context (optional)
          </label>
          <textarea
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
            placeholder="Feedback from showings, price reductions already done, unique features or issues, recent renovations…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <RunButton onClick={run} loading={loading} label="Run diagnostic" />
      </div>

      <ResultBox loading={loading} result={result} label="Listing diagnostic report" />
    </ToolShell>
  );
}
