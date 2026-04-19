'use client';

import { useState, useEffect } from 'react';
import TTSInput from '../components/TTSInput';
import VoiceSelector from '../components/VoiceSelector';
import AudioControls from '../components/AudioControls';
import AudioPlayer from '../components/AudioPlayer';
import DownloadButton from '../components/DownloadButton';
import VisitTracker from '@/app/(marketing)/components/VisitTracker';
import { DEFAULT_SETTINGS } from '../api/tts/types';
import { cacheAudio, getCachedAudio, generateCacheKey } from '../lib/tts-utils';

export default function AudiobookPage() {
  const [text, setText] = useState('');
  const [voiceId, setVoiceId] = useState('pNInz6obpgDQGcFmaJgB');
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  // Detectar modo oscuro del sistema (CORREGIDO: usar useEffect)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setDarkMode(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  // Reemplazá TODA la función generateAudio por esta:

  const generateAudio = async (forceRegenerate = false) => {
    if (!text.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // 🔄 Revocar URL anterior para evitar memory leaks
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
        setAudioUrl(null);
      }

      // Generar clave de cache ÚNICA con SHA-256
      const cacheKey = await generateCacheKey(text, voiceId, settings);

      // 🔥 Si el usuario fuerza regeneración, saltar cache completamente
      if (!forceRegenerate) {
        const cached = await getCachedAudio(cacheKey);

        if (cached) {
          console.log('[TTS] ✅ Cache HIT:', cacheKey.slice(0, 12) + '...');
          const url = URL.createObjectURL(cached);
          setAudioUrl(url);
          return;
        }
      } else {
        console.log('[TTS] 🔄 Forzando regeneración (bypass cache)');
      }

      console.log('[TTS] ❌ Cache MISS - Generando nuevo audio...');

      // Generar nuevo audio desde API
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          voiceId,
          settings,
          format: 'mp3_44100_128'
        })
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Error ${response.status}: ${response.statusText}`);
      }

      const blob = await response.blob();

      // Guardar en cache PARA ESTA COMBINACIÓN EXACTA
      await cacheAudio(cacheKey, blob);

      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

    } catch (err: any) {
      console.error('[Generate Error]:', err);
      setError(err.message || 'Error al generar audio');
    } finally {
      setIsLoading(false);
    }
  };
  // Limpiar URLs de audio al desmontar
  useEffect(() => {
    return () => {
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-slate-50 to-slate-100 text-gray-900'
      }`}>
      <div className="max-w-5xl mx-auto p-4 md:p-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-500 to-purple-600 bg-clip-text text-transparent">
              🎧 Creador de Audiolibros
            </h1>
            <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Convierte tu texto en audio profesional con voz de lector
            </p>
          </div>
          <div className="flex items-center gap-2">
            <VisitTracker pageName="audiobook-creator" />
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50 shadow'
                }`}
              aria-label={darkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-6">

          {/* Panel Izquierdo: Configuración */}
          <div className="space-y-4">

            <TTSInput
              value={text}
              onChange={setText}
              darkMode={darkMode}
            />

            <VoiceSelector
              selectedVoice={voiceId}
              onChange={setVoiceId}
              darkMode={darkMode}
              filterByLanguage="es"
            />

            <AudioControls
              settings={settings}
              onChange={setSettings}
              darkMode={darkMode}
            />

            {/* Botones de acción */}
            <div className="flex gap-3">
              <button
                onClick={() => generateAudio(false)}
                disabled={isLoading || !text.trim()}
                className={`flex-1 py-4 rounded-xl font-semibold transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed ${isLoading
                    ? 'bg-gray-400 cursor-wait'
                    : 'bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                  }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Generando...
                  </span>
                ) : '🎙️ Generar Audio'}
              </button>

              {/* ✨ NUEVO: Botón para forzar regeneración (bypass cache) */}
              <button
                onClick={() => generateAudio(true)}
                disabled={isLoading || !text.trim() || !audioUrl}
                className={`px-4 py-4 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                  }`}
                title="Forzar nueva generación (ignorar cache)"
              >
                🔄
              </button>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm flex items-start gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Panel Derecho: Resultado */}
          <div className={`rounded-2xl p-6 ${darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow-lg border border-gray-100'
            }`}>
            <h3 className="font-semibold mb-4">🔊 Vista Previa</h3>

            {audioUrl ? (
              <div className="space-y-4">
                <AudioPlayer audioUrl={audioUrl} darkMode={darkMode} />
                <DownloadButton audioUrl={audioUrl} darkMode={darkMode} />

                <div className={`p-3 rounded-lg text-sm ${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}>
                  <p>⏱️ Duración: <strong>{Math.ceil(text.length / 15)} segundos</strong></p>
                  <p>📊 Caracteres: <strong>{text.length.toLocaleString()}</strong></p>
                  <p className="text-xs mt-2 opacity-70">
                    💡 Tip: Usá "..." para pausas dramáticas y saltos de línea para separar párrafos
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-48 flex flex-col items-center justify-center text-center opacity-60">
                <div className="text-5xl mb-3 animate-pulse">🎧</div>
                <p>El audio generado aparecerá aquí</p>
                <p className="text-sm mt-2">Escribí tu texto y hacé click en "Generar Audio"</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className={`mt-8 p-4 rounded-xl text-center text-sm ${darkMode ? 'bg-gray-800/30' : 'bg-white/50'
          }`}>
          <p className="opacity-80">
            🔹 Voces en español argentino •
            🔹 Calidad audiolibro profesional •
            🔹 <a href="https://elevenlabs.io/pricing" target="_blank" className="underline hover:text-amber-500 transition-colors">10k caracteres gratis/mes</a>
          </p>
        </div>
      </div>
    </div>
  );
}