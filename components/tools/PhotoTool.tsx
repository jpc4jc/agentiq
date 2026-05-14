"use client";
import { useState, useRef } from "react";
import ToolShell from "@/components/ui/ToolShell";
import ResultBox from "@/components/ui/ResultBox";
import RunButton from "@/components/ui/RunButton";

export default function PhotoTool() {
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const run = async () => {
    setLoading(true);
    setResult("");

    const prompt = `You are an expert real estate photography coach and home stager. Critique these listing photos for maximum buyer appeal.

${files.length > 0 ? `The agent has uploaded ${files.length} photo(s).` : ""}
${description ? `Agent's description of the photos/rooms: ${description}` : ""}

Provide:
1. **Overall score** (1-10) with one-sentence verdict
2. **Issue-by-issue breakdown** for each major problem found, formatted as:
   - 🔴 HIGH IMPACT: [issue] → [specific fix]
   - 🟡 MEDIUM: [issue] → [specific fix]
   - 🟢 MINOR: [issue] → [specific fix]
3. **Top 3 priority fixes** before the next showing
4. **One staging tip** that costs under $200 and has the biggest ROI

Be specific and brutally honest. Vague feedback like "improve lighting" is not acceptable — say exactly what to do.`;

    if (files.length > 0 && files[0].type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(",")[1];
        const res = await fetch("/api/ai/vision", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, imageBase64: base64, mediaType: files[0].type }),
        });
        const data = await res.json();
        setResult(data.result || data.error);
        setLoading(false);
      };
      reader.readAsDataURL(files[0]);
    } else {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setResult(data.result || data.error);
      setLoading(false);
    }
  };

  return (
    <ToolShell
      title="Listing photo critique"
      subtitle="Get brutally honest AI feedback on your listing photos before the shoot."
    >
      <div className="space-y-4">
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50/30 transition-all"
        >
          <div className="text-3xl mb-2">📷</div>
          {files.length > 0 ? (
            <p className="text-sm font-medium text-blue-600">{files.length} photo(s) selected</p>
          ) : (
            <>
              <p className="text-sm font-medium text-gray-700">Drop listing photos here</p>
              <p className="text-xs text-gray-400 mt-1">JPG, PNG · up to 20 images</p>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFiles}
          />
        </div>

        {files.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {files.map((f, i) => (
              <span key={i} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {f.name}
              </span>
            ))}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Describe the photos or rooms (optional but improves accuracy)
          </label>
          <textarea
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={3}
            placeholder="e.g. Kitchen shot from corner, living room with red sectional, primary bedroom with low light…"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <RunButton onClick={run} loading={loading} label="Critique photos" />
      </div>

      <ResultBox loading={loading} result={result} label="Photo critique report" />
    </ToolShell>
  );
}
