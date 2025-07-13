import { NextResponse } from "next/server";
import { Groq } from "groq-sdk"; // or openai, or other lib

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!, // stored in .env file
});

export async function POST(req: Request) {
  const { text } = await req.json();
  const prompt = `Translate the following text to Urdu:\n\n${text}`;
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "llama3-70b-8192",
    temperature: 1,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null,
  });

  const translation = chatCompletion.choices[0].message.content;
  return NextResponse.json({ translation });
}
