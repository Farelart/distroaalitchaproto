import { NextResponse } from "next/server";

const gatewayUrl = "https://ai-gateway.vercel.sh/v1/chat/completions";
const model = "google/gemini-2.5-flash-lite";

const workspace = {
  campaigns: [
    { name: "Autumn product launch", status: "In flight", progress: 72, spend: 12400, due: "Oct 02", risk: "Jordan video review due today" },
    { name: "Founder story series", status: "In review", progress: 48, spend: 6800, due: "Oct 08", risk: "None" },
    { name: "Creator tools push", status: "Briefing", progress: 22, spend: 3250, due: "Oct 16", risk: "Two creators not confirmed" }
  ],
  creators: [
    { name: "Sofia Chen", fit: 96, audience: "B2B operators and founders", reach: 71400, engagement: 6.8, platforms: ["LinkedIn", "Instagram", "YouTube"] },
    { name: "Jordan Okafor", fit: 94, audience: "Product leaders and SaaS founders", reach: 138000, engagement: 8.2, platforms: ["YouTube", "LinkedIn", "X"] },
    { name: "Maya Patel", fit: 91, audience: "Startup and creator economy", reach: 59000, engagement: 11.4, platforms: ["TikTok", "Instagram", "LinkedIn"] }
  ],
  performance: { totalReach: 2430000, engagedAudience: 186000, attributedTrials: 4218, bestFormat: "Founder-led stories", formatLift: "2.6x qualified trials", channelMix: { LinkedIn: 42, YouTube: 31, Instagram: 18, TikTok: 9 } }
};

const tools = [
  { type: "function", function: { name: "get_campaigns", description: "Get Arden Labs active campaigns, delivery status, spend, deadlines and risks.", parameters: { type: "object", properties: {}, additionalProperties: false } } },
  { type: "function", function: { name: "search_creators", description: "Search and rank creators in Arden Labs' network for a campaign or audience goal.", parameters: { type: "object", properties: { goal: { type: "string" } }, required: ["goal"], additionalProperties: false } } },
  { type: "function", function: { name: "get_performance", description: "Get current distribution performance, channel mix, conversions and best content format.", parameters: { type: "object", properties: {}, additionalProperties: false } } }
];

type GatewayMessage = { role: string; content: string | null; tool_calls?: Array<{ id: string; type: string; function: { name: string; arguments: string } }>; tool_call_id?: string };

async function callGateway(messages: GatewayMessage[]) {
  const key = process.env.AI_GATEWAY_API_KEY;
  if (!key) throw new Error("AI Gateway key is not configured");
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await fetch(gatewayUrl, { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` }, body: JSON.stringify({ model, messages, tools, tool_choice: "auto", temperature: 0.35, max_tokens: 1200 }) });
    if (response.ok) return response.json();
    const payload = await response.json().catch(() => ({}));
    const gatewayMessage = payload?.error?.message;
    if (response.status === 429 && attempt < 2) {
      const retryAfter = Number(response.headers.get("retry-after"));
      const delay = Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter * 1000 : 1200 * (attempt + 1);
      await new Promise(resolve => setTimeout(resolve, Math.min(delay, 5000)));
      continue;
    }
    if (response.status === 429) throw new Error("AI Gateway is busy. Please wait a few seconds and try again.");
    if (response.status === 402) throw new Error("AI Gateway credits are unavailable. Check the Vercel AI Gateway balance.");
    throw new Error(gatewayMessage || `AI Gateway request failed (${response.status})`);
  }
  throw new Error("AI Gateway is temporarily unavailable.");
}

function runTool(name: string, args: Record<string, unknown>) {
  if (name === "get_campaigns") return workspace.campaigns;
  if (name === "search_creators") return { goal: args.goal, matches: workspace.creators };
  if (name === "get_performance") return workspace.performance;
  return { error: "Unknown tool" };
}

export async function POST(request: Request) {
  let fallbackArtifact: "creators" | "plan" | undefined;
  try {
    const body = await request.json();
    const history = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
    const latestPrompt = String(history.at(-1)?.text || "").toLowerCase();
    fallbackArtifact = /(creator|influencer|voice|match|talent)/.test(latestPrompt) ? "creators" : /(campaign|plan|performance|analytics|reach|content|launch)/.test(latestPrompt) ? "plan" : undefined;
    const messages: GatewayMessage[] = [
      { role: "system", content: "You are Distroa AI, an incisive distribution strategist for Arden Labs. Use workspace tools before making factual claims. When a tool is used, the interface renders the detailed data as generative UI cards, so write only a brief 1-3 sentence interpretation and next action; do not repeat lists, metrics, creator profiles, or campaign details already returned by tools. Write clean plain text without Markdown symbols. Never claim a real-world action was completed; describe recommendations and prepared plans." },
      ...history.map((message: { role: string; text: string }) => ({ role: message.role === "ai" ? "assistant" : "user", content: message.text }))
    ];
    const usedTools: string[] = [];
    let finalText = "";
    for (let round = 0; round < 4; round++) {
      const result = await callGateway(messages);
      const assistant = result.choices?.[0]?.message;
      if (!assistant) break;
      const calls = assistant.tool_calls || [];
      if (!calls.length) { finalText = assistant.content || ""; break; }
      messages.push(assistant);
      for (const call of calls) {
        const args = JSON.parse(call.function.arguments || "{}");
        usedTools.push(call.function.name);
        messages.push({ role: "tool", tool_call_id: call.id, content: JSON.stringify(runTool(call.function.name, args)) });
      }
    }
    const artifact = usedTools.includes("search_creators") ? "creators" : usedTools.includes("get_campaigns") || usedTools.includes("get_performance") ? "plan" : undefined;
    return NextResponse.json({ text: finalText || "I reviewed the workspace, but couldn’t form a complete recommendation.", artifact, tools: [...new Set(usedTools)], model });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown chat error";
    if (message.includes("AI Gateway is busy")) {
      return NextResponse.json({ text: fallbackArtifact ? "The live model interpretation is temporarily rate-limited, but I pulled the relevant workspace data for you. You can keep working with these recommendations and retry the analysis shortly." : "The live model is temporarily rate-limited. Please try again in a few seconds.", artifact: fallbackArtifact, degraded: true, model });
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
