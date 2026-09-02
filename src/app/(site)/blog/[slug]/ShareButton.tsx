'use client';

import { Share2, Check } from 'lucide-react';
import { useState } from 'react';

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
    
    // 1. Intentar usar la API nativa de compartir (funciona genial en móviles)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: shareUrl,
        });
      } catch (err) {
        // El usuario canceló el diálogo de compartir, no hacemos nada
      }
    } else {
      // 2. Fallback para escritorio: copiar al portapapeles
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500); // Vuelve al estado original después de 2.5s
      } catch (err) {
        console.error('Error al copiar al portapapeles', err);
      }
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center gap-2 bg-gray-800/50 hover:bg-amber-500/10 border border-gray-700 hover:border-amber-500/50 text-gray-300 hover:text-amber-400 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300"
    >
      {copied ? <Check size={16} className="text-green-400" /> : <Share2 size={16} />}
      {copied ? '¡Enlace copiado!' : 'Compartir artículo'}
    </button>
  );
}