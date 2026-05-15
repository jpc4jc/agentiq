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
      max_tokens: 1024,
      tools: [
        {
          type: "web_search_20250305",
          name: "web_search",
        },
      ],
      system: systemPrompt || "You are an expert real estate AI assistant helping realtors close more deals. When given a zip code or neighborhood name, ALWAYS search the web first to verify facts before writing anything. Follow these rules strictly: (1) NEVER mention sidewalks, walkability, or walking distance to any specific location unless you find explicit web sources confirming it. (2) NEVER claim a neighborhood is 'walkable' or use walk scores unless verified. (3) NEVER mention specific parks, trails, or amenities by name unless you find them in web search results. (4) NEVER describe physical neighborhood features like streets, paths, or infrastructure you cannot verify. (5) For schools, only mention rankings if the school is in the top 20% statewide — otherwise say 'served by local public schools' and nothing more. (6) If you are unsure whether something is true, leave it out entirely. It is far better to write a shorter, accurate narrative than a longer one with invented details. Stick to verifiable facts: location, community character, nearby towns, general lifestyle, and confirmed amenities only.",
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
