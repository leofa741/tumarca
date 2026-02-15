'use client';
import { useEffect } from 'react';

export default function VisitTracker({ pageName }: { pageName: string }) {
  useEffect(() => {
    // Solo en cliente
    if (typeof window === 'undefined') return;

    // Evitar duplicados en la misma sesión
    if (sessionStorage.getItem('visited_' + pageName)) return;
    sessionStorage.setItem('visited_' + pageName, '1');

    // Registrar visita después de 500ms
    const timer = setTimeout(() => {
      fetch('/api/visits', { method: 'POST' })
        .then(res => res.json())
        .then(data => console.log('Visita registrada:', data))
        .catch(err => console.error('Error registrando visita:', err));
    }, 500);

    return () => clearTimeout(timer);
  }, [pageName]);

  return null;
}