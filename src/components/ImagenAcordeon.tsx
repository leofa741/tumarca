'use client';

import { useState } from 'react';

const ImageAccordion = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const images = [
    { src: '/d-marca.png', text: 'Diseño de Marca Creamos identidades visuales únicas que comunican la esencia de tu marca. Desde el logo hasta la paleta de colores y la tipografía, cada elemento está diseñado para transmitir profesionalismo, confianza y personalidad. ' },
    { src: '/soporte-1.png', text: 'Mantené tu web siempre activa, actualizada y segura con nuestro soporte técnico especializado. Nuestro equipo está disponible para resolver cualquier inconveniente y garantizar el óptimo funcionamiento de tu sitio.' },
    { src: '/desarrollo.png', text: 'Diseñamos y desarrollamos la plataforma web ideal para tu proyecto con tecnologías de vanguardia, y te proporcionamos las herramientas necesarias para administrarla de manera eficiente.' },
    { src: '/seo.png', text: 'Optimizamos tu sitio web para que sea fácilmente encontrado por los motores de búsqueda, mejorando su visibilidad y atrayendo más tráfico orgánico. Nuestro enfoque incluye investigación de palabras clave, optimización on-page y estrategias de contenido.' },
    { src: '/consultoria.png', text: 'Impulsá tu marca con decisiones estratégicas.Te acompañamos con asesoramiento experto para construir, optimizar o redefinir tu presencia digital.' },
  ];

  return (
    <section className="py-12">
      <div className="flex px-4 space-x-4 md:space-x-6 lg:space-x-8">
        {images.map((item, index) => (
          <div
            key={index}
            className="relative flex-1 min-w-0 transition-all duration-700 ease-out"
            style={{
              flex: hoveredIndex === null || hoveredIndex === index ? '1.5' : '0.8',
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="aspect-w-3 aspect-h-5 relative h-60 sm:h-72 md:h-100 rounded-lg overflow-hidden shadow-md transform transition-all duration-700 hover:scale-85 group">
              <img
                src={item.src}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {/* Fondo muy transparente pero overlay más suave */}
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-80 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">{item.text}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageAccordion;
