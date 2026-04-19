// Tipos compartidos para todo el módulo TTS

export interface TTSSettings {
  stability: number;        // 0.0 - 1.0: más bajo = más expresivo
  similarityBoost: number;  // 0.0 - 1.0: fidelidad a la voz original
  style: number;            // 0.0 - 1.0: intensidad emocional
  speed: number;            // 0.5 - 2.0: velocidad de reproducción
}

export interface Voice {
  id: string;
  name: string;
  language: string;
  accent?: string;
  sampleUrl?: string;
  category: 'premade' | 'cloned' | 'professional';
  gender: 'male' | 'female' | 'neutral';
}

export interface TTSRequest {
  text: string;
  voiceId: string;
  settings: TTSSettings;
  format?: 'mp3_44100_128' | 'mp3_44100_64' | 'pcm_16000' | 'pcm_22050';
  useSSML?: boolean;
}

export interface TTSResponse {
  audioUrl: string;
  duration: number;
  characterCount: number;
  cost?: number;
}

export const DEFAULT_SETTINGS: TTSSettings = {
  stability: 0.4,
  similarityBoost: 0.8,
  style: 0.3,
  speed: 1.0,
};

export const ARGENTINE_VOICES: Voice[] = [
  {
    id: 'pNInz6obpgDQGcFmaJgB',
    name: 'Adam',
    language: 'es-AR',
    accent: 'Argentino',
    sampleUrl: '/samples/adam-es-ar.mp3',
    category: 'premade',
    gender: 'male',
  },
  {
    id: 'EXAVITQu4vr4xnSDxMaL',
    name: 'Bella',
    language: 'es-AR',
    accent: 'Argentino',
    sampleUrl: '/samples/bella-es-ar.mp3',
    category: 'premade',
    gender: 'female',
  },
  {
    id: 'imFXYz8XIletRKLZZQaA',
    name: 'Kate',
    language: 'es-AR',
    accent: 'Neutral Latino',
    sampleUrl: 'https://elevenlabs.io/app/voice-library?voiceId=imFXYz8XIletRKLZZQaA',
    category: 'professional',
    gender: 'female',
  },







  
];