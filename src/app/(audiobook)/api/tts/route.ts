import { NextRequest } from 'next/server';
import { generateAudio } from './providers';
import { TTSRequest } from './types';
import { estimateCost, estimateDuration } from './providers/elevenlabs';

export async function POST(request: NextRequest) {
  try {
    const body: TTSRequest = await request.json();

    // Validaciones
    if (!body.text?.trim()) {
      return Response.json({ error: 'El texto es requerido' }, { status: 400 });
    }
    if (!body.voiceId) {
      return Response.json({ error: 'Debe seleccionar una voz' }, { status: 400 });
    }
    if (body.text.length > 5000) {
      return Response.json({ 
        error: 'Texto muy largo. Máximo 5000 caracteres por solicitud.' 
      }, { status: 400 });
    }

    // Configuración del proveedor (fácil de cambiar)
    const providerConfig = {
      provider: 'elevenlabs' as const,
      apiKey: process.env.ELEVENLABS_API_KEY,
    };

    // Generar audio
    const audioBuffer = await generateAudio(body, providerConfig);

    // Headers para descarga directa
    const headers = new Headers();
    headers.set('Content-Type', 'audio/mpeg');
    headers.set(
      'Content-Disposition', 
      `attachment; filename="audiobook-${Date.now()}.mp3"`
    );
    headers.set('X-Character-Count', body.text.length.toString());
    headers.set('X-Estimated-Duration', 
      estimateDuration(body.text.length, body.settings.speed).toString()
    );

    return new Response(audioBuffer, { headers });

  } catch (error: any) {
    console.error('[TTS API Error]:', error);
    
    // Manejo de errores específicos de ElevenLabs
    if (error.message?.includes('401')) {
      return Response.json(
        { error: 'API key inválida o no configurada' }, 
        { status: 401 }
      );
    }
    if (error.message?.includes('429')) {
      return Response.json(
        { error: 'Límite de caracteres excedido. Actualizá tu plan en ElevenLabs.' }, 
        { status: 429 }
      );
    }

    return Response.json(
      { error: error.message || 'Error interno al generar audio' }, 
      { status: 500 }
    );
  }
}

// Endpoint para obtener voces disponibles (opcional, para caching)
export async function GET() {
  try {
    // En producción, podrías fetchear desde ElevenLabs API
    // Por ahora usamos el listado estático
    const { ARGENTINE_VOICES } = await import('./types');
    
    return Response.json({ 
      voices: ARGENTINE_VOICES,
      limits: {
        freeTier: 10000, // caracteres/mes
        maxPerRequest: 5000,
      }
    });
  } catch (error) {
    return Response.json({ error: 'Error al cargar voces' }, { status: 500 });
  }
}