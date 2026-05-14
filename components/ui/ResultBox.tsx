"use client";

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
      ) : (
        <div
          className="ai-prose text-sm text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: result
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
