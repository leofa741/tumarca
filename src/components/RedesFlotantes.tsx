'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Definición de redes sociales
const redes = [
  {
    nombre: 'WhatsApp',
    url: 'https://wa.me/+541141461312',
    icono: '/WhatsApp_icon.png',
    color: '#25D366',
  },  
  {
    nombre: 'Email',
    url: '/contact',
    icono: '/email.webp',
    color: '#EA4335',
  },
  {
    nombre: 'LinkedIn',
    url: 'https://www.linkedin.com/in/tu-marca-ar-8b6777378?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
    icono: '/linkedin.webp',
    color: '#0077B5',
  },
];

export default function RedesFlotantesFuturo() {
  const [activo, setActivo] = useState(false);
  const [visible, setVisible] = useState(false);

  // Mostrar el botón después de hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
        setActivo(false); // Cierra el menú si se esconde
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-3 right-4 z-50 flex items-end justify-end h-32 md:h-40">
      {/* Redes emergentes */}
      <div className="flex space-x-3 md:space-x-4 mr-2">
        {activo &&
          redes.map((red, i) => (
            <Link
              key={red.nombre}
              href={red.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setActivo(false)}
              className="group relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-125 hover:-rotate-6"
              style={{
                background: red.color,
                animation: `slideUpRotate 0.4s ease-out ${i * 0.1}s forwards`,
                opacity: 0,
                transform: 'translateY(30px) rotate(10deg)',
              }}
            >
              <Image
                src={red.icono}
                alt={red.nombre}
                width={28}
                height={28}
                className="w-8 h-8 md:w-10 md:h-10 object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <span className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/70 text-white text-xs py-1 px-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
                {red.nombre}
              </span>
            </Link>
          ))}
      </div>

      {/* Botón principal: glassmorphism con transformación a X */}
      <button
        onClick={() => setActivo(!activo)}
        className="w-13 h-13 md:w-16 md:h-16 bg-white/50 backdrop-blur-lg border border-white/30 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:shadow-xl relative"
        aria-label={activo ? 'Cerrar menú' : 'Abrir menú de redes'}
      >
        {/* Línea horizontal superior (gira para formar la X) */}
        <span
          className={`absolute w-6 h-0.5 bg-gradient-to-r from-amber-400 to-pink-500 rounded-full transition-transform duration-300 ease-in-out ${
            activo ? 'rotate-45 translate-y-0' : '-rotate-45 translate-y-1'
          }`}
        ></span>
        {/* Línea horizontal inferior (gira para formar la X) */}
        <span
          className={`absolute w-6 h-0.5 bg-gradient-to-r from-amber-400 to-pink-500 rounded-full transition-transform duration-300 ease-in-out ${
            activo ? '-rotate-45 -translate-y-0' : 'rotate-45 -translate-y-1'
          }`}
        ></span>
      </button>

      {/* Estilos de animación */}
      <style jsx>{`
        @keyframes slideUpRotate {
          to {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
        }

        /* Efecto de pulso sutil (opcional) */
        .animate-pulse-slow {
          animation: pulseSlow 2s infinite;
        }

        @keyframes pulseSlow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}