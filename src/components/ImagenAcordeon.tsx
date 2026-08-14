'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const ImageAccordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const images = [
    {
      src: '/d-marca.png',
      title: 'Identidad Corporativa Estratégica',
      text: 'Construimos sistemas de marca que transmiten autoridad y diferenciación en mercados competitivos. Logo, paleta cromática, tipografía y brand guidelines listos para escalar.',
    },
    {
      src: '/soporte-1.png',
      title: 'Soporte Ejecutivo y Continuidad Operativa',
      text: 'Mantenimiento proactivo, seguridad, backups y actualizaciones bajo SLA. Tu infraestructura digital siempre operativa, protegida y evolucionando.',
    },
    {
      src: '/desarrollo.png',
      title: 'Plataformas Digitales de Alto Rendimiento',
      text: 'Diseñamos y desarrollamos sitios corporativos, e-commerce y aplicaciones web diseñadas para convertir. Tecnología de vanguardia con arquitectura escalable y panel de autogestión.',
    },
    {
      src: '/seo.png',
      title: 'Posicionamiento Orgánico y Adquisición',
      text: 'Estrategias de SEO técnico y de contenidos para que tu empresa sea encontrada por los clientes correctos, en el momento exacto de su decisión de compra.',
    },
    {
      src: '/consultoria.png',
      title: 'Consultoría Estratégica Digital',
      text: 'Diagnóstico, planificación y acompañamiento ejecutivo para construir, optimizar o redefinir tu presencia digital con decisiones basadas en datos y resultados.',
    },
  ];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 px-4">
      {/* Versión MÓVIL: Lista vertical con acordeón */}
      <div className="lg:hidden space-y-4">
        {images.map((item, index) => (
          <div
            key={index}
            className="group relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm transition-all duration-500 hover:border-white/20"
          >
            {/* Imagen + Botón para expandir */}
            <div
              className="relative h-64 cursor-pointer transition-all duration-700 ease-out"
              onClick={() => toggleItem(index)}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-start p-6">
                <h3 className="text-white text-xl font-bold leading-tight pr-12">{item.title}</h3>
              </div>
              {/* Icono de toggle */}
              <button
                className="absolute top-4 right-4 w-10 h-10 bg-black/60 backdrop-blur-sm border border-white/20 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:bg-black/80 hover:scale-110"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(index);
                }}
                aria-label={openIndex === index ? 'Cerrar' : 'Abrir'}
              >
                {openIndex === index ? (
                  <Minus size={18} className="transition-transform duration-300" />
                ) : (
                  <Plus size={18} className="transition-transform duration-300" />
                )}
              </button>
            </div>

            {/* Contenido expandido */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-6 bg-gradient-to-br from-gray-900/50 to-gray-950/50 backdrop-blur-sm border-t border-white/10">
                <p className="text-gray-300 text-sm leading-relaxed">{item.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Versión DESKTOP: Acordeón horizontal */}
      <div className="hidden lg:flex gap-6">
        {images.map((item, index) => (
          <div
            key={index}
            className="group relative flex-1 min-w-0 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl overflow-hidden border border-white/10 backdrop-blur-sm cursor-pointer transition-all duration-700 ease-out hover:border-white/20"
            onClick={() => toggleItem(index)}
            style={{
              flex: openIndex === index ? '2.5' : '1',
            }}
          >
            <div className="relative h-[500px] overflow-hidden">
              <img
                src={item.src}
                alt={item.title}
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  openIndex === index ? 'scale-110' : 'scale-100 group-hover:scale-105'
                }`}
              />
              {/* Overlay con gradiente */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              
              {/* Contenido */}
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <div className="transform transition-all duration-500">
                  <h3 className="text-white text-2xl font-bold mb-3 leading-tight">
                    {item.title}
                  </h3>
                  <p
                    className={`text-gray-300 text-sm leading-relaxed transition-all duration-500 overflow-hidden ${
                      openIndex === index
                        ? 'opacity-100 max-h-40 translate-y-0'
                        : 'opacity-0 max-h-0 translate-y-4'
                    }`}
                  >
                    {item.text}
                  </p>
                </div>
              </div>

              {/* Indicador de estado */}
              <div className="absolute top-6 right-6 w-10 h-10 bg-black/60 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                {openIndex === index ? (
                  <Minus size={18} className="text-white transition-transform duration-300" />
                ) : (
                  <Plus size={18} className="text-white transition-transform duration-300" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageAccordion;