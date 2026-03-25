import { NextResponse } from "next/server";
import {
  contactLinks,
  education,
  experience,
  featuredProjects,
  profile,
  skillGroups,
} from "@/lib/projects";

type IncomingMessage = {
  role: "user" | "assistant";
  content: string;
};

function buildSystemPrompt() {
  const educationText = education
    .map((item) => `${item.degree} at ${item.university} (${item.graduation})`)
    .join("; ");
  const experienceText = experience
    .map((item) => `${item.role} at ${item.organization} (${item.duration})`)
    .join("; ");
  const skillsText = skillGroups
    .map((group) => `${group.category}: ${group.items.join(", ")}`)
    .join(" | ");
  const projectsText = featuredProjects
    .map((project) => `${project.title}: ${project.subtitle}`)
    .join("; ");

  return [
    "You are ShashBot, the portfolio assistant for Shashwat Singh.",
    "Answer only with facts from the profile context below. If unknown, say you do not have that info.",
    "Keep responses concise, direct, and friendly.",
    `Name: ${profile.name}`,
    `Headline: ${profile.headline}`,
    `Summary: ${profile.summary}`,
    `Goals: ${profile.goals}`,
    `Education: ${educationText}`,
    `Experience: ${experienceText}`,
    `Skills: ${skillsText}`,
    `Projects: ${projectsText}`,
    `Contact: Email ${contactLinks.email}, Phone ${contactLinks.phone}, Location ${contactLinks.location}`,
    `Links: LinkedIn ${contactLinks.linkedin}, GitHub ${contactLinks.github}, LeetCode ${contactLinks.leetcode}`,
  ].join("\n");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as { messages?: IncomingMessage[] };
    const messages = Array.isArray(body.messages) ? body.messages : [];

    if (!messages.length) {
      return NextResponse.json(
        { error: "No messages provided." },
        { status: 400 },
      );
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model =
      process.env.OPENROUTER_MODEL || "meta-llama/llama-3.1-8b-instruct:free";

    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Missing OPENROUTER_API_KEY. Add it in your environment to enable live chatbot responses.",
        },
        { status: 500 },
      );
    }

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Shashwat Terminal Portfolio",
        },
        body: JSON.stringify({
          model,
          temperature: 0.3,
          messages: [
            { role: "system", content: buildSystemPrompt() },
            ...messages,
          ],
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `LLM request failed: ${errorText}` },
        { status: 502 },
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };

    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
      return NextResponse.json(
        { error: "No response content received from LLM." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
