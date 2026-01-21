// app/api/ai/route.ts
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages)) {
      return Response.json({ error: 'El campo "messages" debe ser un array' }, { status: 400 });
    }

    for (const msg of messages) {
      if (!msg || typeof msg.content !== 'string' || !['user', 'assistant'].includes(msg.role)) {
        return Response.json({ error: 'Formato de mensaje inválido' }, { status: 400 });
      }
    }

    // 👇 Personalización del comportamiento de Qwen
    const systemMessage = {
      role: 'system',
      content: `Eres un asistente experto de Tu Marca AR, una agencia digital premium. 
                Responde de forma profesional, clara y concisa. 
                Si preguntan sobre servicios, menciona diseño web, branding, SEO, marketing y desarrollo de aplicaciones.
                Usa un tono amable pero profesional.`
    };

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.tumarca.ar',
        'X-Title': 'Tu Marca AR - Chat AI'
      },
      body: JSON.stringify({
        model: 'qwen/qwen-plus',
        messages: [systemMessage, ...messages],
        temperature: 0.7,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Error de OpenRouter:', errorData);
      return Response.json({ error: 'Error al comunicarse con la IA' }, { status: response.status });
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return Response.json({ response: aiResponse });

  } catch (error) {
    console.error('Error en la API de IA:', error);
    return Response.json({ error: 'Error interno del servidor' }, { status: 500 });
  }
}