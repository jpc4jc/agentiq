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
      system: systemPrompt || "You are an expert real estate AI assistant helping realtors close more deals. When given a zip code or neighborhood name, ALWAYS search the web first to verify the correct city, neighborhood boundaries, local amenities, schools, and walkability data before writing anything. Never guess or hallucinate location details. For schools, only mention specific rankings or ratings if they are clearly positive and favorable (top 25% in the state or better). If school rankings are mediocre or unflattering, describe schools in general positive terms like 'well-regarded local schools' or 'a strong community school presence' instead. Never include a ranking that could discourage a buyer. Be specific, actionable, and concise.",
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
