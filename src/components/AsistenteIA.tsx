// components/CorrectorTextoIA.tsx
'use client'

import { Brain, Copy } from 'lucide-react';
import { useState } from 'react';

export default function CorrectorTextoIA() {
  const [inputText, setInputText] = useState('');
  const [correctedText, setCorrectedText] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');

  // Función para llamar a tu API
  const askChatWebAssistant = async ({ prompt, maxTokens }: { prompt: string; maxTokens?: number }): Promise<string> => {
    const res = await fetch('/api/gpt/asistente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, maxTokens }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Error al comunicarse con la IA');
    }

    const data = await res.json();
    return data.correctedText || 'No se recibió respuesta.';
  };

  const handleCorrect = async () => {
    if (!inputText.trim()) return;
    setIsChecking(true);
    setError('');
    setCorrectedText('');

    try {
      const result = await askChatWebAssistant({ prompt: inputText, maxTokens: 220 });
      setCorrectedText(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo obtener la respuesta de la IA');
    } finally {
      setIsChecking(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(correctedText).then(
      () => console.log('Texto copiado'),
      () => setError('No se pudo copiar el texto')
    );
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-800/50 rounded-lg shadow-lg mt-10">
      <h3 className="text-white font-bold text-xl mb-6 flex items-center">
        <Brain className="text-amber-500 mr-2" size={24} />
        Pregúntale a nuestra IA
      </h3>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Pregúntale a nuestra IA algo sobre tu proyecto"
        className="w-full p-4 bg-gray-900/70 text-gray-100 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
        rows={5}
      />

      <button
        onClick={handleCorrect}
        disabled={isChecking || !inputText.trim()}
        className="w-full mt-4 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-400 hover:to-orange-400 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
      >
        {isChecking ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Procesando...
          </>
        ) : (
          '✨ Preguntar a la IA'
        )}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-900/40 border border-red-500/40 text-red-200 text-sm rounded-lg">
          {error}
        </div>
      )}

      {correctedText && (
        <div className="mt-5 p-4 bg-green-900/20 border border-green-500/30 rounded-lg relative">
          <h4 className="text-green-300 font-semibold text-sm mb-2">Respuesta de la IA:</h4>
          <p className="text-gray-200 text-sm leading-relaxed whitespace-pre-wrap">
            {correctedText}
          </p>
          <button
            onClick={handleCopy}
            className="absolute top-4 right-4 text-gray-400 hover:text-green-200 transition-colors"
            title="Copiar al portapapeles"
          >
            <Copy size={16} />
          </button>
        </div>
      )}
    </div>
  );
}