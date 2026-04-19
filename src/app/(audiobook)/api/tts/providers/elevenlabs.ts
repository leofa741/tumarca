import { TTSRequest, TTSSettings } from '../types';

interface ElevenLabsOptions extends TTSRequest {}

export async function generateWithElevenLabs({
  text,
  voiceId,
  settings,
  format = 'mp3_44100_128',
  useSSML
}: ElevenLabsOptions): Promise<ArrayBuffer> {
  
  const processedText = preprocessText(text, useSSML);

  const response = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=${format}`,
    {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVENLABS_API_KEY || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: processedText,
        model_id: 'eleven_multilingual_v2',
        voice_settings: {
          stability: settings.stability,
          similarity_boost: settings.similarityBoost,
          style: settings.style,
          use_speaker_boost: true,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text().catch(() => 'Error desconocido');
    console.error('[ElevenLabs Error]:', error);
    throw new Error(`ElevenLabs API: ${response.status} - ${error.slice(0, 300)}`);
  }

  return await response.arrayBuffer();
}

/**
 * Pre-procesa el texto para mejorar naturalidad en la síntesis
 * - Convierte saltos de línea en pausas SSML
 * - Maneja puntos suspensivos, comas, y énfasis
 */
function preprocessText(text: string, useSSML = true): string {
  if (!useSSML) return text;

  return text
    // Escapar caracteres XML para SSML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
    // Párrafos → pausa larga
    .replace(/\n{3,}/g, '</p><p><break time="1.2s"/>')
    .replace(/\n{2}/g, '<break time="800ms"/>')
    .replace(/\n/g, '<break time="300ms"/>')
    // Puntos suspensivos → pausa dramática
    .replace(/\.{3,}/g, '<break time="1.5s"/>')
    // Comas → pausa breve
    .replace(/,\s*/g, ', <break time="200ms"/>')
    // Signos de exclamación/interrogación → énfasis sutil
    .replace(/([^\s]+)([!?])/g, '<emphasis level="moderate">$1</emphasis>$2')
    // Envolver en estructura SSML base
    .trim()
    ? `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="es-AR"><p>${text}</p></speak>`
    : text;
}

/**
 * Calcula el costo estimado en USD (referencial)
 * ElevenLabs: ~$0.30 USD por 1K caracteres en plan Creator
 */
export function estimateCost(characterCount: number): number {
  const COST_PER_1K = 0.30;
  return (characterCount / 1000) * COST_PER_1K;
}

/**
 * Estima duración en segundos (promedio: 15 caracteres/segundo en español)
 */
export function estimateDuration(characterCount: number, speedMultiplier = 1.0): number {
  const BASE_CHARS_PER_SECOND = 15;
  return Math.ceil(characterCount / (BASE_CHARS_PER_SECOND * speedMultiplier));
}