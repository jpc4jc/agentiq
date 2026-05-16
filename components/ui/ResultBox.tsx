"use client";

function parseResult(result: string): { type: "error" | "success"; text: string } {
  if (result.includes("rate_limit_error") || result.includes("rate limit")) {
    return { type: "error", text: "⏳ Too many requests — please wait a moment and try again." };
  }
  if (result.includes("authentication_error") || result.includes("invalid x-api-key")) {
    return { type: "error", text: "🔑 API key issue — please check your Anthropic API key in Vercel settings." };
  }
  if (result.includes("overloaded_error")) {
    return { type: "error", text: "😅 Claude is currently overloaded — please try again in a few seconds." };
  }
  if (result.startsWith("{")) {
    try {
      const parsed = JSON.parse(result);
      const msg = parsed?.error?.message || parsed?.error || "Unknown error";
      return { type: "error", text: `⚠️ ${msg}` };
    } catch {
      return { type: "error", text: `⚠️ ${result.slice(0, 120)}` };
    }
  }
  return { type: "success", text: result };
}

function formatResult(text: string): string {
  let main = text;
  let verifyBlock = "";
  let sourcesBlock = "";

  const sourcesIndex = text.indexOf("📚 SOURCES:");
  if (sourcesIndex !== -1) {
    sourcesBlock = text.slice(sourcesIndex);
    main = text.slice(0, sourcesIndex);
  }

  const verifyIndex = main.indexOf("⚠️ VERIFY BEFORE PUBLISHING:");
  if (verifyIndex !== -1) {
    verifyBlock = main.slice(verifyIndex);
    main = main.slice(0, verifyIndex);
  }

  const format = (str: string): string => {
    const lines = str.split("\n");
    let html = "";
    let inList = false;

    for (const line of lines) {
      const trimmed = line.trim();

      if (!trimmed) {
        if (inList) { html += "</ul>"; inList = false; }
        html += "<br/>";
        continue;
      }

      if (trimmed.startsWith("### ")) {
        if (inList) { html += "</ul>"; inList = false; }
        html += `<p class="ai-section-header">${trimmed.replace(/^###\s+/, "")}</p>`;
        continue;
      }
      if (trimmed.startsWith("## ")) {
        if (inList) { html += "</ul>"; inList = false; }
        html += `<p class="ai-section-header">${trimmed.replace(/^##\s+/, "")}</p>`;
        continue;
      }
      if (trimmed.startsWith("# ")) {
        if (inList) { html += "</ul>"; inList = false; }
        html += `<p class="ai-main-header">${trimmed.replace(/^#\s+/, "")}</p>`;
        continue;
      }

      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        if (!inList) { html += "<ul>"; inList = true; }
        const content = trimmed.replace(/^[-*]\s+/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        html += `<li>${content}</li>`;
        continue;
      }

      if (/^\d+\.\s/.test(trimmed)) {
        if (inList) { html += "</ul>"; inList = false; }
        const content = trimmed.replace(/^\d+\.\s+/, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
        html += `<p class="ai-numbered">${content}</p>`;
        continue;
      }

      if (inList) { html += "</ul>"; inList = false; }
      const content = trimmed.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      html += `<p>${content}</p>`;
    }

    if (inList) html += "</ul>";
    return html;
  };

  return [
    format(main),
    verifyBlock ? `<div class="verify-block">${format(verifyBlock)}</div>` : "",
    sourcesBlock ? `<div class="sources-block">${format(sourcesBlock)}</div>` : "",
  ].join("");
}

export default function ResultBox({
  loading,
  result,
  label = "AI Analysis",
}: {
  loading: boolean;
  result: string;
  label?: string;
}) {
  if (!loading && !result) return null;

  const parsed = parseResult(result);

  return (
    <div className="mt-6 space-y-3">
      {!loading && parsed.type === "success" && (
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          <span className="text-amber-500 text-base mt-0.5">⚠️</span>
          <p className="text-xs text-amber-700 leading-relaxed">
            <strong>AI-generated first draft.</strong> Verify all facts, rankings, distances, and amenity names with local sources before publishing. Do not use as-is in MLS listings.
          </p>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-5">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
          {label}
        </p>

        {loading ? (
          <div className="space-y-2">
            <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
            <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
            <div className="h-3 bg-gray-100 rounded animate-pulse w-5/6" />
            <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3" />
            <p className="text-xs text-gray-400 mt-3">Searching web and generating copy…</p>
          </div>
        ) : parsed.type === "error" ? (
          <p className="text-sm text-amber-600 font-medium">{parsed.text}</p>
        ) : (
          <>
            <div
              className="ai-prose text-sm text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatResult(parsed.text) }}
            />
            <style>{`
              .ai-prose p { margin-bottom: 0.6rem; }
              .ai-prose ul {
                list-style: disc;
                padding-left: 1.25rem;
                margin-bottom: 0.6rem;
              }
              .ai-prose ul ul { padding-left: 0; list-style: disc; }
              .ai-prose li { margin-bottom: 0.2rem; line-height: 1.5; }
              .ai-section-header {
                font-weight: 600;
                font-size: 0.8rem;
                text-transform: uppercase;
                letter-spacing: 0.05em;
                color: #4b5563;
                margin-top: 1rem;
                margin-bottom: 0.3rem;
              }
              .ai-main-header {
                font-weight: 700;
                font-size: 0.95rem;
                color: #1f2937;
                margin-top: 0.5rem;
                margin-bottom: 0.3rem;
              }
              .ai-numbered {
                padding-left: 0.5rem;
                margin-bottom: 0.4rem;
                border-left: 2px solid #e5e7eb;
              }
              .verify-block {
                margin-top: 1rem;
                padding: 0.75rem 1rem;
                background: #fffbeb;
                border: 1px solid #fcd34d;
                border-radius: 0.5rem;
                font-size: 0.8rem;
                color: #92400e;
              }
              .sources-block {
                margin-top: 0.75rem;
                padding: 0.75rem 1rem;
                background: #f0f9ff;
                border: 1px solid #bae6fd;
                border-radius: 0.5rem;
                font-size: 0.8rem;
                color: #0369a1;
              }
            `}</style>
          </>
        )}
      </div>
    </div>
  );
}
