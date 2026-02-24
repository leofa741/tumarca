// components/OnlineVisitors.tsx
'use client';

import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

export default function OnlineVisitors() {
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const visitorId = `visitor_${Math.random().toString(36).slice(2, 9)}`;
    
    const registerPresence = async () => {
      try {
        await fetch('/api/online/heartbeat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            visitorId, 
            page: window.location.pathname,
            timestamp: Date.now()
          }),
        });
      } catch (e) {
        console.error('❌ Error registrando presencia:', e);
      }
    };

    const fetchOnlineCount = async () => {
      try {
        const res = await fetch('/api/online/count');
        if (res.ok) {
          const data = await res.json();
          setOnlineCount(data.count ?? 0);
        }
      } catch (e) {
        console.error('❌ Error fetching count:', e);
      }
    };

    // Registro inicial y polling
    registerPresence();
    fetchOnlineCount();
    
    const interval = setInterval(() => {
      registerPresence();
      fetchOnlineCount();
    }, 30000);

    // Mostrar con animación
    const timer = setTimeout(() => setIsVisible(true), 2000);

    // Cleanup al desmontar
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      // Intenta enviar el offline (best-effort)
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/online/offline', JSON.stringify({ visitorId }));
      }
    };
  }, []);

  // No mostrar si hay 0 o 1 visitante (el usuario actual)
  if (onlineCount <= 1) return null;

  return (
    <div
      className={`fixed bottom-6 right-26 z-50 flex items-center gap-2.5 px-4 py-2.5 
        bg-gray-900/95 dark:bg-gray-800/95 backdrop-blur-md 
        border border-gray-700/50 rounded-full shadow-2xl shadow-black/30
        text-white text-sm font-medium transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}
        hover:scale-[1.02] hover:border-emerald-500/50 cursor-default
        select-none`}
      role="status"
      aria-live="polite"
    >
      <div className="relative flex-shrink-0">
        <Users size={18} className="text-emerald-400 drop-shadow-sm" />
        <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full animate-pulse ring-2 ring-gray-900" />
      </div>
      
      <div className="flex flex-col leading-tight">
        <span className="font-semibold text-emerald-400">
          {onlineCount}
        </span>
        <span className="text-xs text-gray-300 -mt-0.5">
          {onlineCount === 2 ? 'persona más' : 'personas más'} online
        </span>
      </div>
    </div>
  );
}