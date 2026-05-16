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
- NEVER mention walking distance to any school, park, store, or location. Ever. Do not say a neighborhood is walkable to anything specific.
- NEVER mention sidewalks or pedestrian infrastructure of any kind.
- NEVER mention a neighborhood park, private amenity, or HOA feature unless the realtor has explicitly told you it exists in their prompt.
- NEVER include a school ranking number (e.g. "49th of 374") unless the school ranks in the TOP 20% of all schools statewide. Top 20% means the school's rank number is within the top 20% of the total schools ranked. For example: if there are 374 high schools, top 20% means ranked 75th or better. If the school does not meet this threshold, do not mention any ranking at all — say "served by local public schools" and nothing more.
- NEVER use absolute superlatives like "safest", "best", "top-rated", "#1" unless a source explicitly confirms that exact claim. Always hedge: "one of the safest", "among the top-rated".
- NEVER narrate your research process. Do not write "I'll search for..." or "Let me look up..." or "Based on my research...". Start directly with the marketing copy.
- NEVER invent or assume physical features of a neighborhood (trails, sidewalks, parks, gates, amenities) that the realtor has not confirmed.
- NEVER make time-span claims like "consistently ranked for 10 years" without a source.

REQUIRED BEHAVIORS:
1. Always search the web to verify facts before writing.
2. Only mention schools by name and with positive data if they are in the top 20% statewide — otherwise omit rankings entirely.
3. For commute times and distances, verify with a web source.
4. Keep copy grounded in verifiable facts. When in doubt, leave it out.
5. A shorter, accurate narrative is always better than a longer inaccurate one.

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

    const cleaned = rawText
      .split("\n")
      .filter((line: string) => {
        const l = line.trim().toLowerCase();
        return !(
          l.startsWith("now i'll") ||
          l.startsWith("now let me") ||
          l.startsWith("let me") ||
          l.startsWith("i'll search") ||
          l.startsWith("i will search") ||
          l.startsWith("based on my research") ||
          l.startsWith("let me write") ||
          (l.startsWith("i now have") || (l.startsWith("i have") && l.includes("information")))
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
