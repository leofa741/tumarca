import { TTSRequest } from '../types';
import { generateWithElevenLabs } from './elevenlabs';

export type TTSProvider = 'elevenlabs' | 'azure' | 'self-hosted';

export interface ProviderConfig {
  provider: TTSProvider;
  apiKey?: string;
  endpoint?: string;
}

export async function generateAudio(
  request: TTSRequest,
  config: ProviderConfig = { provider: 'elevenlabs' }
): Promise<ArrayBuffer> {
  
  switch (config.provider) {
    case 'elevenlabs':
      return generateWithElevenLabs(request);
    
    case 'azure':
      // TODO: Implementar Azure TTS con SSML
      throw new Error('Proveedor Azure no implementado aún');
    
    case 'self-hosted':
      // TODO: Implementar Coqui TTS / Piper local
      throw new Error('Proveedor self-hosted no implementado aún');
    
    default:
      throw new Error(`Proveedor desconocido: ${config.provider}`);
  }
}