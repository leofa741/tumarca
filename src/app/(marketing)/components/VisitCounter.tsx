'use client';
import { useEffect, useState } from 'react';

export default function VisitCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/api/visits', { cache: 'no-store' });
      const data = await res.json();
      setCount(data.today || 0);
    };

    load();
    const i = setInterval(load, 30000);
    return () => clearInterval(i);
  }, []);

  if (!count) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-xl">
      👁️ {count} visitas hoy
    </div>
  );
}
