'use client';

import { useState } from 'react';

interface TTSInputProps {
  value: string;
  onChange: (value: string) => void;
  darkMode: boolean;
  maxLength?: number;
}

export default function TTSInput({ 
  value, 
  onChange, 
  darkMode, 
  maxLength = 5000 
}: TTSInputProps) {
  const [showSSMLHelp, setShowSSMLHelp] = useState(false);
  const remaining = maxLength - value.length;

  return (
    <div className={`rounded-xl p-4 ${
      darkMode ? 'bg-gray-800/50 border border-gray-700' : 'bg-white shadow border border-gray-100'
    }`}>
      <div className="flex justify-between items-center mb-2">
        <label className="font-medium flex items-center gap-2">
          📝 Texto a convertir
          <button
            type="button"
            onClick={() => setShowSSMLHelp(!showSSMLHelp)}
            className={`text-xs px-2 py-0.5 rounded ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            {showSSMLHelp ? 'Ocultar ayuda' : 'Ayuda SSML'}
          </button>
        </label>
        <span className={`text-sm ${
          remaining < 500 ? 'text-amber-500' : darkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          {value.length.toLocaleString()}/{maxLength.toLocaleString()}
        </span>
      </div>

      {showSSMLHelp && (
        <div className={`mb-3 p-3 rounded-lg text-xs ${
          darkMode ? 'bg-gray-700/50 text-gray-300' : 'bg-amber-50 text-amber-800'
        }`}>
          <p className="font-medium mb-1">💡 Tips para mejor naturalidad:</p>
          <ul className="list-disc list-inside space-y-0.5 opacity-90">
            <li>Usa <code className="bg-black/10 px-1 rounded">...</code> para pausas dramáticas</li>
            <li>Salto de línea = pausa breve • Doble salto = pausa larga</li>
            <li>¡Signos de exclamación! dan énfasis automático</li>
            <li>Para control avanzado: usa etiquetas SSML como <code>&lt;break time=&quot;500ms&quot;/&gt;</code></li>
          </ul>
        </div>
      )}

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
        placeholder="Escribí o pegá tu texto aquí...&#10;&#10;Ejemplo:&#10;Bienvenidos a Tu Marca AR...&#10;Hoy vamos a explorar soluciones digitales premium.&#10;&#10;¿En qué podemos ayudarte?"
        rows={8}
        className={`w-full p-3 rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors ${
          darkMode
            ? 'bg-gray-700 border border-gray-600 text-white placeholder-gray-400'
            : 'bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400'
        }`}
      />

      {/* Barra de progreso */}
      <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${
            remaining < 500 
              ? 'bg-gradient-to-r from-amber-400 to-red-500' 
              : 'bg-gradient-to-r from-amber-400 to-purple-500'
          }`}
          style={{ width: `${(value.length / maxLength) * 100}%` }}
        />
      </div>

      {/* Acciones rápidas */}
      <div className="flex gap-2 mt-3">
        <button
          type="button"
          onClick={() => onChange('')}
          className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
            darkMode 
              ? 'hover:bg-gray-700 text-gray-400' 
              : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          🗑️ Limpiar
        </button>
        <button
          type="button"
          onClick={async () => {
            try {
              const text = await navigator.clipboard.readText();
              onChange(text.slice(0, maxLength));
            } catch {
              alert('No se pudo acceder al portapapeles');
            }
          }}
          className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
            darkMode 
              ? 'hover:bg-gray-700 text-gray-400' 
              : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          📋 Pegar desde portapapeles
        </button>
        <button
          type="button"
          onClick={() => {
            const sample = `Bienvenidos a Tu Marca AR...

Hoy vamos a explorar cómo la inteligencia artificial puede transformar tu presencia digital.

¿Estás listo para llevar tu proyecto al siguiente nivel?`;
            onChange(sample);
          }}
          className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
            darkMode 
              ? 'hover:bg-gray-700 text-gray-400' 
              : 'hover:bg-gray-100 text-gray-500'
          }`}
        >
          ✨ Usar ejemplo
        </button>
      </div>
    </div>
  );
}