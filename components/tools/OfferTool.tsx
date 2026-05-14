"use client";
import { useState } from "react";
import ToolShell from "@/components/ui/ToolShell";
import ResultBox from "@/components/ui/ResultBox";
import RunButton from "@/components/ui/RunButton";

export default function OfferTool() {
  const [listPrice, setListPrice] = useState("");
  const [dom, setDom] = useState("");
  const [comps, setComps] = useState("");
  const [market, setMarket] = useState("balanced");
  const [notes, setNotes] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!listPrice) return;
    setLoading(true);
    setResult("");
    const prompt = `Build a detailed offer strategy playbook for a real estate purchase.

Property details:
- List price: ${listPrice}
- Days on market: ${dom || "unknown"}
- Comparable sales: ${comps || "not provided"}
- Market conditions: ${market}
- Additional notes: ${notes || "none"}

Provide:
1. **Recommended opening offer** with reasoning
2. **Escalation clause structure** (if applicable): increment amounts and ceiling
3. **Inspection contingency recommendation**: keep, waive, or inspection-for-information-only
4. **Financing contingency stance**
5. **Closing timeline leverage** (seller preferred close date if known)
6. **Negotiation tactics**: 2-3 specific moves if they counter
7. **Red flags to watch**: anything in these details that should concern the buyer

Be specific with dollar amounts. Format clearly with headers.`;

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
      title="Offer strategy advisor"
      subtitle="Data-driven negotiation playbook for any listing."
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">List price</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. $589,000"
              value={listPrice}
              onChange={(e) => setListPrice(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Days on market</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 18"
              value={dom}
              onChange={(e) => setDom(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Comparable sales range
          </label>
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. $560K – $610K (3 comps in last 90 days)"
            value={comps}
            onChange={(e) => setComps(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Market temperature
          </label>
          <select
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={market}
            onChange={(e) => setMarket(e.target.value)}
          >
            <option value="hot — multiple offers expected">🔥 Hot — multiple offers expected</option>
            <option value="balanced">⚖️ Balanced</option>
            <option value="cool — buyer has leverage">❄️ Cool — buyer has leverage</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional context (optional)
          </label>
          <textarea
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
            placeholder="Seller motivation, listing agent reputation, property history, open house traffic…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <RunButton onClick={run} loading={loading} label="Build playbook" />
      </div>

      <ResultBox loading={loading} result={result} label="Offer strategy playbook" />
    </ToolShell>
  );
}
