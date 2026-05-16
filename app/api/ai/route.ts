import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { prompt, systemPrompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const message = await (client.messages.create as any)({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search",
        },
      ],
      system: systemPrompt || `You are an expert real estate AI assistant helping realtors create accurate first-draft marketing copy. Follow these rules strictly and without exception:

ABSOLUTE PROHIBITIONS — never do these under any circumstances:
- NEVER mention schools, school rankings, school ratings, school scores, or school districts in any way. Do not mention schools at all — not by name, not by rating, not by district. Omit all school information entirely.
- NEVER mention specific dates, months, day numbers, or years for any event, festival, or activity. Events change dates annually. Instead use phrases like "held each summer", "an annual tradition", or "returns every fall" without specifying when.
- NEVER mention walking distance to any school, park, store, or location. Ever.
- NEVER mention sidewalks or pedestrian infrastructure of any kind.
- NEVER mention a neighborhood park, private amenity, or HOA feature unless the realtor has explicitly told you it exists in their prompt.
- NEVER use absolute superlatives like "safest", "best", "top-rated", "#1" unless a source explicitly confirms that exact claim. Always hedge: "one of the safest", "among the top-rated".
- NEVER narrate your research process. Do not write sentences like "Now I know...", "Let me search...", "Now let me search...", "Based on my research...", "I'll search for...", "Let me look up...", "Now I'll write...", or any similar meta-commentary. Start the response directly with the marketing copy — the very first word should be part of the actual listing narrative.
- NEVER invent or assume physical features of a neighborhood you cannot verify.
- NEVER make time-span claims like "consistently ranked for 10 years" without a source.

REQUIRED BEHAVIORS:
1. Always search the web to verify facts before writing.
2. For commute times and distances, verify with a web source.
3. Keep copy grounded in verifiable facts. When in doubt, leave it out.
4. A shorter, accurate narrative is always better than a longer inaccurate one.
5. The very first line of your response must be the start of the marketing copy. No preamble. No research narration.

OUTPUT FORMAT:
Write the marketing copy first — 2 paragraphs maximum, then data tags.
Then add:
⚠️ VERIFY BEFORE PUBLISHING: Bullet list of specific claims the realtor should confirm locally before publishing.
📚 SOURCES: Bullet list of sources used.`,
      messages: [{ role: "user", content: prompt }],
    });

    const rawText = message.content
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { type: string; text: string }) => b.text)
      .join("");

    // Aggressively strip any research narration lines
    const cleaned = rawText
      .split("\n")
      .filter((line: string) => {
        const l = line.trim().toLowerCase();
        return !(
          l.startsWith("now i") ||
          l.startsWith("now let me") ||
          l.startsWith("let me") ||
          l.startsWith("i'll search") ||
          l.startsWith("i will search") ||
          l.startsWith("based on my research") ||
          l.startsWith("let me write") ||
          l.startsWith("i now have") ||
          l.startsWith("i have gathered") ||
          l.startsWith("i've gathered") ||
          l.startsWith("i have comprehensive") ||
          l.startsWith("i know the address") ||
          l.includes("let me search") ||
          l.includes("now i'll write") ||
          l.includes("i'll write the marketing") ||
          l.includes("now i'll create") ||
          (l.startsWith("i have") && l.includes("information"))
        );
      })
      .join("\n")
      .trimStart();

    return NextResponse.json({ result: cleaned });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("AgentIQ API error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
