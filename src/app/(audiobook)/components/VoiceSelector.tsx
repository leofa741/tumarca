'use client';

import { ARGENTINE_VOICES, Voice } from '../api/tts/types';

interface VoiceSelectorProps {
  selectedVoice: string;
  onChange: (voiceId: string) => void;
  darkMode: boolean;
  filterByLanguage?: string;
}

export default function VoiceSelector({ 
  selectedVoice, 
  onChange, 
  darkMode,
  filterByLanguage 
}: VoiceSelectorProps) {
  
  const voices = filterByLanguage 
    ? ARGENTINE_VOICES.filter(v => v.language.startsWith(filterByLanguage))
    : ARGENTINE_VOICES;

  const playSample = (sampleUrl?: string, e?: React.MouseEvent) => {
    e?.stopPropagation(); // Evitar que el click propague al padre
    if (sampleUrl) {
      const audio = new Audio(sampleUrl);
      audio.play().catch(() => {
        alert('Sample no disponible. La voz se escuchará al generar el audio.');
      });
    }
  };

  // Manejar teclado para el botón de preview (accesibilidad)
  const handlePreviewKey = (e: React.KeyboardEvent, sampleUrl?: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      playSample(sampleUrl);
    }
  };

  return (
    <div className={`rounded-xl p-4 ${
      darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow border border-gray-100'
    }`}>
      <label className="font-medium block mb-3">🎙️ Seleccionar voz</label>
      
      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {voices.map((voice) => (
          <button
            key={voice.id}
            type="button"
            onClick={() => onChange(voice.id)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
              selectedVoice === voice.id
                ? 'ring-2 ring-amber-500 bg-amber-500/10'
                : darkMode 
                  ? 'hover:bg-gray-700/50' 
                  : 'hover:bg-gray-50'
            }`}
          >
            {/* Avatar de voz */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
              voice.gender === 'female' 
                ? 'bg-pink-500/20 text-pink-400' 
                : voice.gender === 'male'
                  ? 'bg-blue-500/20 text-blue-400'
                  : 'bg-purple-500/20 text-purple-400'
            }`}>
              {voice.gender === 'female' ? '♀' : voice.gender === 'male' ? '♂' : '⚥'}
            </div>
            
            {/* Info de voz */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-medium truncate">{voice.name}</span>
                {voice.accent && (
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {voice.accent}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs opacity-70">
                <span>{voice.language.toUpperCase()}</span>
                <span>•</span>
                <span className="capitalize">{voice.category}</span>
              </div>
            </div>
            
            {/* ✅ CORREGIDO: Usar span en lugar de button para evitar anidación */}
            {voice.sampleUrl && (
              <span
                role="button"
                tabIndex={0}
                onClick={(e) => playSample(voice.sampleUrl, e)}
                onKeyDown={(e) => handlePreviewKey(e, voice.sampleUrl)}
                className={`p-2 rounded-full transition-colors cursor-pointer ${
                  darkMode 
                    ? 'hover:bg-gray-600 text-gray-400 focus:ring-2 focus:ring-amber-500' 
                    : 'hover:bg-gray-200 text-gray-500 focus:ring-2 focus:ring-amber-500'
                } focus:outline-none`}
                title="Escuchar sample"
                aria-label={`Escutar sample de ${voice.name}`}
              >
                🔊
              </span>
            )}
          </button>
        ))}
      </div>
      
      <p className={`mt-3 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
        💡 Todas las voces soportan español. Las marcadas como "Argentino" tienen acento de Buenos Aires.
      </p>
    </div>
  );
}