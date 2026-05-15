"use client";

function parseResult(result: string): string {
  // Detect API error JSON and return friendly message
  if (result.includes("rate_limit_error") || result.includes("rate limit")) {
    return "⏳ Too many requests — please wait a moment and try again.";
  }
  if (result.includes("authentication_error") || result.includes("invalid x-api-key")) {
    return "🔑 API key issue — please check your Anthropic API key in Vercel settings.";
  }
  if (result.includes("overloaded_error")) {
    return "😅 Claude is currently overloaded — please try again in a few seconds.";
  }
  if (result.startsWith("{") || result.startsWith("4")) {
    return "⚠️ Something went wrong — please try again.";
  }
  return result;
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

  const displayResult = parseResult(result);

  return (
    <div className="mt-6 bg-white border border-gray-200 rounded-xl p-5">
      <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-3">
        {label}
      </p>
      {loading ? (
        <div className="space-y-2">
          <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
          <div className="h-3 bg-gray-100 rounded animate-pulse w-full" />
          <div className="h-3 bg-gray-100 rounded animate-pulse w-5/6" />
          <div className="h-3 bg-gray-100 rounded animate-pulse w-2/3" />
        </div>
      ) : displayResult.startsWith("⏳") || displayResult.startsWith("🔑") || displayResult.startsWith("😅") || displayResult.startsWith("⚠️") ? (
        <p className="text-sm text-amber-600 font-medium">{displayResult}</p>
      ) : (
        <div
          className="ai-prose text-sm text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: displayResult
              .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
              .replace(/\n\n/g, "</p><p>")
              .replace(/\n- /g, "</p><ul><li>")
              .replace(/\n/g, "<br/>")
              .replace(/^/, "<p>")
              .replace(/$/, "</p>"),
          }}
        />
      )}
    </div>
  );
}
