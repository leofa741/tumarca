// components/OnlineIndicator.tsx
'use client';

export default function OnlineIndicator({ online }: { online: boolean }) {
  if (!online) {
    return (
      <span 
        className="relative flex h-3 w-3"
        title="Operador fuera de horario"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-30 animate-ping" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500 border-2 border-white dark:border-gray-800" />
      </span>
    );
  }

  return (
    <span 
      className="relative flex h-3 w-3"
      title="Operador disponible"
    >
      {/* Onda expansiva */}
      <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-60" />
      {/* Círculo central */}
      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white dark:border-gray-800 shadow-sm" />
    </span>
  );
}