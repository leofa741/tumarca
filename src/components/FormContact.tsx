'use client';
import { useState } from 'react';

export default function FormContact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSent(false);

    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.ok) {
        setSent(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setError(data.error || 'Error desconocido');
      }
    } catch (err) {
      setError('Hubo un problema al enviar el mensaje. Intentá más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white/5 backdrop-blur-md p-8 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-4">Formulario de Contacto</h2>

      {sent ? (
        <p className="text-green-400 text-center">¡Gracias! Tu mensaje fue enviado. Te responderemos pronto.</p>
      ) : (
        <>
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
            <textarea
              placeholder="Mensaje"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-3 bg-gray-800 text-white rounded focus:outline-none focus:ring-2 focus:ring-amber-500 h-32"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-500 text-white font-semibold rounded hover:bg-amber-600 transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </>
      )}
    </form>
  );
}