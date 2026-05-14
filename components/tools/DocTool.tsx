"use client";
import { useState, useRef } from "react";
import ToolShell from "@/components/ui/ToolShell";
import ResultBox from "@/components/ui/ResultBox";
import RunButton from "@/components/ui/RunButton";

const docTypes = [
  "Seller disclosure",
  "HOA governing docs",
  "Inspection report",
  "Title report",
  "Purchase agreement",
  "Condo docs",
];

export default function DocTool() {
  const [docType, setDocType] = useState("Seller disclosure");
  const [pastedText, setPastedText] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const run = async () => {
    if (!pastedText && files.length === 0) return;
    setLoading(true);
    setResult("");

    const prompt = `You are a real estate risk analyst. Scan this ${docType} and identify all red flags, risks, and items that require follow-up.

Document content:
${pastedText || "[Document uploaded — analyze based on document type and typical risk patterns for " + docType + "]"}

Provide a structured risk report:

**Overall Risk Level**: 🟢 Low / 🟡 Medium / 🔴 High (with one-sentence summary)

**Critical Flags** 🔴 (could kill the deal or create liability):
For each: Issue → Page/Section → Why it matters → What to do

**Review Items** 🟡 (need follow-up before closing):
For each: Issue → Why it matters → How to resolve

**Minor Notes** 🟢 (good to know, low risk):
Brief list

**Questions to ask the seller/HOA/inspector**:
3-5 specific questions this document raises

**Financing risk**: Will any of these issues likely affect loan approval or appraisal?

Be specific. Reference page numbers or section names when possible. Write for a realtor, not a lawyer.`;

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
      title="Document risk scanner"
      subtitle="Plain-English risk summary of disclosures, HOA docs, and inspection reports."
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Document type</label>
          <div className="flex flex-wrap gap-2">
            {docTypes.map((d) => (
              <button
                key={d}
                onClick={() => setDocType(d)}
                className={`text-sm px-3 py-1.5 rounded-full border transition-all ${
                  docType === d
                    ? "bg-blue-50 border-blue-300 text-blue-700 font-medium"
                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all"
        >
          <div className="text-2xl mb-1">📄</div>
          {files.length > 0 ? (
            <p className="text-sm font-medium text-blue-600">{files.map((f) => f.name).join(", ")}</p>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-700">Upload document (PDF)</p>
              <p className="text-xs text-gray-400 mt-0.5">or paste text below</p>
            </>
          )}
          <input ref={inputRef} type="file" accept=".pdf,.doc,.docx,.txt" multiple className="hidden" onChange={handleFiles} />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Or paste document text
          </label>
          <textarea
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={6}
            placeholder="Paste the full text of your disclosure, HOA docs, or inspection report here…"
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
          />
        </div>

        <RunButton onClick={run} loading={loading} label="Scan document" />
      </div>

      <ResultBox loading={loading} result={result} label="Risk analysis report" />
    </ToolShell>
  );
}
