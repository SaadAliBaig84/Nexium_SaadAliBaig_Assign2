import { NextResponse } from "next/server";
import { Groq } from "groq-sdk"; // or openai, or other lib

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!, // stored in .env file
});

export async function POST(req: Request) {
  const { text } = await req.json();
  const prompt = `Summarize this blog post clearly and thoroughly as if explaining to someone unfamiliar with the topic:\n\n${text}`;
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-8b-8192",
    temperature: 1,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null,
  });

  const summary = chatCompletion.choices[0].message.content;
  return NextResponse.json({ summary });
}
