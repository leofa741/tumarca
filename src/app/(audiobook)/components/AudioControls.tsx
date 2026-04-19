'use client';

import { TTSSettings } from '../api/tts/types';
import { TTS_PRESETS } from '../lib/tts-utils';

interface AudioControlsProps {
  settings: TTSSettings;
  onChange: (settings: TTSSettings) => void;
  darkMode: boolean;
}

export default function AudioControls({ 
  settings, 
  onChange, 
  darkMode 
}: AudioControlsProps) {
  
  const updateSetting = (key: keyof TTSSettings, value: number) => {
    onChange({ ...settings, [key]: value });
  };

  const applyPreset = (presetName: string) => {
    if (TTS_PRESETS[presetName]) {
      onChange(TTS_PRESETS[presetName]);
    }
  };

  return (
    <div className={`rounded-xl p-4 ${
      darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow border border-gray-100'
    }`}>
      <label className="font-medium block mb-3">🎚️ Ajustes de voz</label>
      
      {/* Presets rápidos */}
      <div className="flex flex-wrap gap-2 mb-4">
        {Object.entries(TTS_PRESETS).map(([name, preset]) => (
          <button
            key={name}
            type="button"
            onClick={() => applyPreset(name)}
            className={`text-xs px-3 py-1.5 rounded-full capitalize transition-colors ${
              settings.stability === preset.stability && settings.style === preset.style
                ? 'bg-amber-500 text-black font-medium'
                : darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Sliders */}
      <div className="space-y-4">
        
        {/* Estilo emocional */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="flex items-center gap-1">
              🎭 Estilo emocional
              <Tooltip darkMode={darkMode} text="Más alto = más variación en tono y ritmo" />
            </span>
            <span className="font-mono">{Math.round(settings.style * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={settings.style}
            onChange={(e) => updateSetting('style', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-xs mt-1 opacity-60">
            <span>Neutral</span>
            <span>Expresivo</span>
          </div>
        </div>

        {/* Estabilidad */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="flex items-center gap-1">
              🎚️ Estabilidad
              <Tooltip darkMode={darkMode} text="Más bajo = más natural pero menos consistente" />
            </span>
            <span className="font-mono">{Math.round(settings.stability * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={settings.stability}
            onChange={(e) => updateSetting('stability', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-xs mt-1 opacity-60">
            <span>Variable</span>
            <span>Consistente</span>
          </div>
        </div>

        {/* Similaridad */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="flex items-center gap-1">
              🔊 Fidelidad a la voz
              <Tooltip darkMode={darkMode} text="Qué tan fiel a la voz original" />
            </span>
            <span className="font-mono">{Math.round(settings.similarityBoost * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={settings.similarityBoost}
            onChange={(e) => updateSetting('similarityBoost', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

        {/* Velocidad */}
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="flex items-center gap-1">⚡ Velocidad</span>
            <span className="font-mono">{settings.speed.toFixed(2)}x</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.05"
            value={settings.speed}
            onChange={(e) => updateSetting('speed', parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-xs mt-1 opacity-60">
            <span>0.5x</span>
            <span>1.0x</span>
            <span>2.0x</span>
          </div>
        </div>

      </div>

      {/* Reset */}
      <button
        type="button"
        onClick={() => onChange({ stability: 0.4, similarityBoost: 0.8, style: 0.3, speed: 1.0 })}
        className={`mt-4 text-xs underline ${
          darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        ↺ Restaurar valores por defecto
      </button>
    </div>
  );
}

// Componente tooltip simple
function Tooltip({ text, darkMode }: { text: string; darkMode: boolean }) {
  return (
    <span className="group relative inline-flex">
      <span className="cursor-help opacity-60 hover:opacity-100">ⓘ</span>
      <span className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 ${
        darkMode ? 'bg-gray-700 text-gray-200' : 'bg-gray-900 text-white'
      }`}>
        {text}
        <span className={`absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent ${
          darkMode ? 'border-t-gray-700' : 'border-t-gray-900'
        }`} />
      </span>
    </span>
  );
}