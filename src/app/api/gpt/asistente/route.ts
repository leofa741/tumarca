// api/gpt/asistente/route.ts

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, maxTokens } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const correctedText = await askChatWebAssistant({ prompt, maxTokens });

    return NextResponse.json({ correctedText });
  } catch (error: any) {
    console.error("Error correcting text:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

async function askChatWebAssistant({
  prompt,
  maxTokens,
}: {
  prompt: string;
  maxTokens?: number;
}): Promise<string> {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini", // económico y rápido
    messages: [
      {
        role: "system",
        content:
          "Eres un experto en desarrollo web, diseño UX/UI, marketing digital y branding. Responde de forma clara y útil. Si el max_tokens es menor a 200, proporciona una respuesta breve. Si es mayor, proporciona una respuesta y deja puntos suspensivos para que nos contacten. Y si no tienes una respuesta que el mail sea hola@tumarca.ar, solo responde sobre eso; cualquier otra pregunta no será respondida.",
      },
      { role: "user", content: prompt },
    ],
    max_tokens: maxTokens || 200,
    temperature: 0.7,
  });

  return response.choices[0].message?.content || "";
}
