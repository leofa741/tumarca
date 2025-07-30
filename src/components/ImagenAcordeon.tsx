'use client';

import { useState } from 'react';

const ImageAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // Cambiamos a "abrir/cerrar"

  const images = [
    {
      src: '/d-marca.png',
      title: 'Diseño de Marca',
      text: 'Creamos identidades visuales únicas que comunican la esencia de tu marca. Desde el logo hasta la paleta de colores y la tipografía, cada elemento está diseñado para transmitir profesionalismo, confianza y personalidad.',
    },
    {
      src: '/soporte-1.png',
      title: 'Soporte Técnico',
      text: 'Mantené tu web siempre activa, actualizada y segura con nuestro soporte técnico especializado. Nuestro equipo está disponible para resolver cualquier inconveniente y garantizar el óptimo funcionamiento de tu sitio.',
    },
    {
      src: '/desarrollo.png',
      title: 'Desarrollo Web',
      text: 'Diseñamos y desarrollamos la plataforma web ideal para tu proyecto con tecnologías de vanguardia, y te proporcionamos las herramientas necesarias para administrarla de manera eficiente.',
    },
    {
      src: '/seo.png',
      title: 'SEO & Posicionamiento',
      text: 'Optimizamos tu sitio web para que sea fácilmente encontrado por los motores de búsqueda, mejorando su visibilidad y atrayendo más tráfico orgánico. Nuestro enfoque incluye investigación de palabras clave, optimización on-page y estrategias de contenido.',
    },
    {
      src: '/consultoria.png',
      title: 'Consultoría Estratégica',
      text: 'Impulsá tu marca con decisiones estratégicas. Te acompañamos con asesoramiento experto para construir, optimizar o redefinir tu presencia digital.',
    },
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index); // Cambiamos el estado para abrir/cerrar
   
  };

  return (
    <section className="py-12 px-4">
      {/* Versión MÓVIL: Lista vertical con acordeón */}
      <div className="lg:hidden space-y-6">
        {images.map((item, index) => (
          <div key={index} className="bg-white/5 rounded-xl overflow-hidden border border-gray-700">
            {/* Imagen + Botón para expandir */}
            <div
              className="relative h-64 cursor-pointer transition-all duration-700 ease-out group"
              onClick={() => toggleItem(index)}
              style={{
                transform: openIndex === index ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold">{item.title}</h3>
              </div>
              {/* Icono de flecha */}
              <button
                className="absolute top-4 right-4 w-8 h-8 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center text-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(index);
                }}
                aria-label={openIndex === index ? 'Cerrar' : 'Abrir'}
              >
                {openIndex === index ? '−' : '+'}
              </button>
            </div>

            {/* Contenido expandido */}
            {openIndex === index && (
              <div className="p-5 bg-gray-900 text-gray-200 text-sm leading-relaxed animate-fadeIn">
                <p>{item.text}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Versión DESKTOP: Acordeón horizontal */}
      <div className="hidden lg:flex space-x-8">
        {images.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 rounded-xl overflow-hidden border border-gray-700 cursor-pointer transition-all duration-700 ease-out group"
            onClick={() => toggleItem(index)}
            style={{
              transform: openIndex === index ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg transform transition-all duration-700 group">
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay oscuro con título */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4">
                <h3 className="text-white text-2xl font-bold mb-2 text-center">{item.title}</h3>
                <p
                  className={`text-white text-sm text-center transition-all duration-500 ${
                    openIndex === index ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'
                  } overflow-hidden`}
                >
                  {item.text}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageAccordion;