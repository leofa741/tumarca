'use client';
import { useEffect, useState } from 'react';

export default function VisitCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/visits', { cache: 'no-store' });
        const data = await res.json();
        setCount(data.today || 0);
      } catch (error) {
        console.error('Error loading visit count:', error);
      }
    };

    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  if (!count) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-xl shadow-lg z-50">
      👁️ {count} visitas hoy
    </div>
  );
}