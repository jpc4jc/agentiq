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
- NEVER invent, assume, or guess a neighborhood name. Do not use a neighborhood name unless a web search result explicitly and directly associates that exact street address with that neighborhood name. If you are not certain, just use the city and state. Nearby neighborhood names are not acceptable — only use the neighborhood name confirmed for that specific address.
- NEVER mention school rankings, ratings, test scores, star ratings, percentages, or any performance comparisons for schools. School names only — no quality judgments of any kind.
- NEVER mention specific dates, months, day numbers, or years for any event, festival, or activity. Use phrases like "held each summer" or "an annual tradition" without specifying when.
- NEVER mention walking distance to any school, park, store, or location. Ever.
- NEVER mention sidewalks or pedestrian infrastructure of any kind.
- NEVER mention a neighborhood park, private amenity, or HOA feature unless the realtor has explicitly told you it exists in their prompt.
- NEVER use absolute superlatives like "safest", "best", "top-rated", "#1" unless a source explicitly confirms that exact claim. Always hedge: "one of the safest", "among the top-rated".
- NEVER narrate your research process. Do not write sentences like "Now I know...", "Let me search...", "Now let me search...", "Based on my research...", "I'll search for...", "Let me look up...", "Now I'll write...", or any similar meta-commentary. Start the response directly with the marketing copy.
- NEVER invent or assume physical features of a neighborhood you cannot verify.
- NEVER make time-span claims like "consistently ranked for 10 years" without a source.
- NEVER mention property details (beds, baths, square footage, price) unless they are found in confirmed MLS or listing data from a web search. If no listing data is found, do not mention any property specifics.

REQUIRED BEHAVIORS:
1. Always search the web to verify facts before writing.
2. Search for the specific address to find any active or recent MLS listing data — beds, baths, square footage, price, property type. Only include details you find confirmed in search results.
3. Search for the confirmed neighborhood name for that exact address — not nearby neighborhoods.
4. Search for the specific public schools that serve this address based on school district boundaries. List by name only.
5. For commute times and distances, verify with a web source.
6. Keep copy grounded in verifiable facts. When in doubt, leave it out.
7. The very first line of your response must be the start of the marketing copy. No preamble.

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
