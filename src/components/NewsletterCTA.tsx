// components/NewsletterCTA.tsx
'use client';

import { useState } from 'react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubscribe = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage({ type: 'error', text: 'Por favor ingresa un email válido.' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          type: 'newsletter',
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: 'success',
          text: '¡Gracias! Revisa tu correo para confirmar la suscripción.',
        });
        setEmail('');
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Hubo un error al suscribirte. Intenta más tarde.',
        });
      }
    } catch (err) {
      setMessage({
        type: 'error',
        text: 'No pudimos conectar con el servidor. Intenta más tarde.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-24 text-center max-w-2xl mx-auto bg-gradient-to-r from-gray-900 to-transparent border border-gray-700 rounded-2xl p-8">
      <h3 className="text-white text-2xl font-semibold mb-4">¿Querés más contenido como este?</h3>
      <p className="text-gray-400 mb-6">Suscríbete y recibí cada semana:</p>
      <ul className="text-gray-300 text-sm space-y-2 mb-6 text-left max-w-xs mx-auto">
        <li className="flex items-center gap-2">
          <span>✍️</span> Tips de branding aplicables
        </li>
        <li className="flex items-center gap-2">
          <span>🚀</span> Estrategias de lanzamiento
        </li>
        <li className="flex items-center gap-2">
          <span>🔍</span> Análisis de marcas reales
        </li>
      </ul>

      <div className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu correo electrónico"
          className="w-full px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
          required
        />
        <button
          type="button"
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full px-8 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 disabled:opacity-70 disabled:cursor-not-allowed transition"
        >
          {loading ? 'Suscibiendo...' : '🔔 Suscribirme al newsletter'}
        </button>
        {message && (
          <p
            className={`text-sm mt-2 ${
              message.type === 'success' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}