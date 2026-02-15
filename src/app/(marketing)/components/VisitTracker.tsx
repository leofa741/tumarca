'use client';
import { useEffect } from 'react';

export default function VisitTracker({ pageName }: { pageName: string }) {
  useEffect(() => {
    // Solo en cliente
    if (typeof window === 'undefined') return;

    // Evitar duplicados en la misma sesión
    const sessionKey = `visited_${pageName}_${new Date().toISOString().slice(0, 10)}`;
    if (sessionStorage.getItem(sessionKey)) return;
    
    sessionStorage.setItem(sessionKey, '1');

    // Registrar visita
    fetch('/api/visits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageName }),
      credentials: 'same-origin'
    })
      .then(res => res.json())
      .then(data => console.log('Visita registrada:', data))
      .catch(err => console.error('Error registrando visita:', err));
  }, [pageName]);

  return null;
}