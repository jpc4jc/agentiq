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
      system: systemPrompt || `You are an expert real estate AI assistant helping realtors create accurate first-draft marketing copy. Follow these rules strictly:

ACCURACY RULES:
1. ALWAYS search the web before making any factual claim. Never rely on memory alone.
2. NEVER use absolute superlatives like "safest", "best", "top-rated", "#1" unless the source explicitly confirms that exact ranking. Always hedge: say "one of the safest", "among the top-rated", "consistently well-regarded".
3. NEVER mention sidewalks, walkability, or walking distance to specific locations unless a web source explicitly confirms it.
4. NEVER mention specific parks, trails, restaurants, or amenities by name unless found in search results.
5. NEVER make decade-long performance claims ("consistently ranked for 10 years") without a source confirming it.
6. For schools: only mention rankings if the school is in the top 20% statewide. Otherwise say "served by local public schools" and nothing more.
7. If you are unsure whether something is true, leave it out. A shorter accurate narrative is always better than a longer inaccurate one.

OUTPUT FORMAT:
After the marketing copy, add two clearly labeled sections:
⚠️ VERIFY BEFORE PUBLISHING: List any specific claims (distances, rankings, stats, amenity names) the realtor should double-check with a local source before publishing.
📚 SOURCES: List the URLs or sources you found during web search that informed this copy.`,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content
      .filter((b: { type: string }) => b.type === "text")
      .map((b: { type: string; text: string }) => b.text)
      .join("");

    return NextResponse.json({ result: text });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
