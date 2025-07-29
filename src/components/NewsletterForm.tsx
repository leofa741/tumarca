'use client';
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Newsletter Subscriber',
          email,
          message: `Nuevo suscriptor: ${email}`,
          type: 'newsletter', // marcamos que es una suscripción
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({ type: 'success', text: '¡Gracias por suscribirte! Revisa tu correo para confirmar.' });
        setEmail('');
      } else {
        setMessage({ type: 'error', text: data.error || 'Hubo un error. Intenta nuevamente.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Conexión fallida. Intenta más tarde.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu correo electrónico"
          className="flex-grow px-4 py-3 bg-gray-800 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Suscibiendo...' : 'Suscribirme'}
        </button>
      </div>
      {message && (
        <div className={`text-sm mt-2 ${message.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message.text}
        </div>
      )}
    </form>
  );
}