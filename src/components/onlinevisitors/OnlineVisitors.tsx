'use client';

import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function OnlineVisitors() {
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let visitorId = localStorage.getItem("visitorId");

    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem("visitorId", visitorId);
    }

    const registerPresence = async () => {
      if (document.visibilityState !== "visible") return;

      await fetch('/api/online/heartbeat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitorId,
          page: pathname
        }),
      });
    };

    const fetchOnlineCount = async () => {
      const res = await fetch('/api/online/count');
      if (res.ok) {
        const data = await res.json();
        setOnlineCount(data.count ?? 0);
      }
    };

    registerPresence();
    fetchOnlineCount();

    const interval = setInterval(() => {
      registerPresence();
      fetchOnlineCount();
    }, 20000);

    const timer = setTimeout(() => setIsVisible(true), 1500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };

  }, [pathname]);

  if (onlineCount <= 1) return null;

  return (
    <div
      className={`fixed bottom-6 right-26 z-1050 flex items-center gap-2.5 px-4 py-2.5 
        bg-gray-900/95 backdrop-blur-md 
        border border-gray-700/50 rounded-full shadow-2xl shadow-black/30
        text-white text-sm font-medium transition-all duration-500 ease-out
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}
        hover:scale-[1.02] hover:border-emerald-500/50 select-none`}
    >
      <Users size={18} className="text-emerald-400" />
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