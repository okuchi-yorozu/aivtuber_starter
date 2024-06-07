import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"], // This is the default and can be omitted
});

export async function POST(req: NextRequest) {
  const { prompt, userId, messages } = await req.json();

  if (!prompt || typeof prompt !== "string") {
    return NextResponse.json({ message: "Invalid prompt" }, { status: 400 });
  }

  messages.push({ role: "user", content: prompt });

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages,
      model: "gpt-4o",
      user: userId,
    });

    const message = chatCompletion.choices[0].message;

    return NextResponse.json(
      { id: chatCompletion.id, message },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
