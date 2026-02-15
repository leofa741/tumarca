'use client';
import { useEffect } from 'react';

export default function VisitTracker({ pageName }: { pageName: string }) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (sessionStorage.getItem('visited_' + pageName)) return;
    sessionStorage.setItem('visited_' + pageName, '1');

    const timer = setTimeout(() => {
      fetch('/api/visits', { method: 'POST' }).catch(() => {});
    }, 500);

    return () => clearTimeout(timer);
  }, [pageName]);

  return null;
}
