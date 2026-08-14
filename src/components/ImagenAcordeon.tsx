'use client';

import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';

const ImageAccordion = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const projects = [
    {
      src: '/d-marca.png',
      title: 'Identidad Corporativa Estratégica',
      subtitle: 'Branding & Identity',
      description: 'Construimos sistemas de marca que transmiten autoridad y diferenciación en mercados competitivos. Logo, paleta cromática, tipografía y brand guidelines listos para escalar.',
      metrics: '+50 marcas',
    },
    {
      src: '/soporte-1.png',
      title: 'Soporte Ejecutivo',
      subtitle: 'Operations & Maintenance',
      description: 'Mantenimiento proactivo, seguridad, backups y actualizaciones bajo SLA. Tu infraestructura digital siempre operativa, protegida y evolucionando.',
      metrics: '24/7 uptime',
    },
    {
      src: '/desarrollo.png',
      title: 'Plataformas de Alto Rendimiento',
      subtitle: 'Web Development',
      description: 'Diseñamos y desarrollamos sitios corporativos, e-commerce y aplicaciones web diseñadas para convertir. Tecnología de vanguardia con arquitectura escalable.',
      metrics: '<1s load time',
    },
    {
      src: '/seo.png',
      title: 'Posicionamiento Orgánico',
      subtitle: 'SEO & Acquisition',
      description: 'Estrategias de SEO técnico y de contenidos para que tu empresa sea encontrada por los clientes correctos, en el momento exacto de su decisión de compra.',
      metrics: '+340% traffic',
    },
    {
      src: '/consultoria.png',
      title: 'Consultoría Estratégica',
      subtitle: 'Digital Strategy',
      description: 'Diagnóstico, planificación y acompañamiento ejecutivo para construir, optimizar o redefinir tu presencia digital con decisiones basadas en datos.',
      metrics: 'ROI garantizado',
    },
  ];

  return (
    <section className="py-20 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Layout Principal: Grid asimétrico premium */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          
          {/* Panel de Navegación (izquierda) */}
          <div className="lg:col-span-4 space-y-3">
            {projects.map((project, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`group relative w-full text-left p-6 rounded-2xl transition-all duration-500 ease-out ${
                  activeIndex === index
                    ? 'bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border-2 border-amber-500/30 shadow-2xl shadow-amber-500/20'
                    : 'bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-white/10'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-2 transition-colors ${
                      activeIndex === index ? 'text-amber-400' : 'text-gray-500'
                    }`}>
                      {project.subtitle}
                    </div>
                    <h3 className={`text-lg font-bold leading-tight transition-colors ${
                      activeIndex === index ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'
                    }`}>
                      {project.title}
                    </h3>
                  </div>
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    activeIndex === index
                      ? 'bg-amber-500 text-black scale-110'
                      : 'bg-white/5 text-gray-500 group-hover:bg-white/10 group-hover:text-white'
                  }`}>
                    <ArrowUpRight 
                      size={18} 
                      className={`transition-transform duration-500 ${
                        activeIndex === index ? 'rotate-45' : 'rotate-0'
                      }`}
                    />
                  </div>
                </div>

                {/* Indicador de progreso */}
                {activeIndex === index && (
                  <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Panel de Visualización (derecha) */}
          <div className="lg:col-span-8">
            <div className="relative h-[500px] lg:h-[700px] rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-white/10 shadow-2xl">
              
              {/* Imagen de fondo con transición */}
              {projects.map((project, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    activeIndex === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                  }`}
                >
                  <img
                    src={project.src}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay con gradiente sofisticado */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-purple-900/20 mix-blend-overlay" />
                  
                  {/* Glow effect */}
                  {activeIndex === index && (
                    <div className="absolute inset-0 bg-gradient-radial from-amber-500/10 via-transparent to-transparent animate-pulse" />
                  )}
                </div>
              ))}

              {/* Contenido superpuesto */}
              <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-12">
                
                {/* Header: Número de proyecto */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-7xl lg:text-8xl font-bold text-white/10 leading-none">
                      {String(activeIndex + 1).padStart(2, '0')}
                    </div>
                    <div className="w-px h-20 bg-gradient-to-b from-white/20 to-transparent" />
                    <div className="text-sm text-gray-400">
                      <div className="text-xs uppercase tracking-wider text-gray-500 mb-1">Proyecto</div>
                      <div className="text-lg font-semibold text-white">{activeIndex + 1} de {projects.length}</div>
                    </div>
                  </div>

                  {/* Badge de métrica */}
                  <div className="px-5 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full">
                    <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Resultado</div>
                    <div className="text-amber-400 font-bold text-sm">{projects[activeIndex].metrics}</div>
                  </div>
                </div>

                {/* Footer: Título y descripción */}
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
                      {projects[activeIndex].subtitle}
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-4">
                      {projects[activeIndex].title}
                    </h2>
                  </div>

                  <p className="text-gray-300 text-base lg:text-lg leading-relaxed">
                    {projects[activeIndex].description}
                  </p>

                  {/* CTA opcional */}
                  <button className="group/btn inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105">
                    Ver caso de estudio
                    <ArrowUpRight size={18} className="group-hover/btn:rotate-45 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Indicadores de navegación inferior */}
              <div className="absolute bottom-8 right-8 flex gap-2">
                {projects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`transition-all duration-500 rounded-full ${
                      activeIndex === index
                        ? 'w-12 h-2 bg-amber-500'
                        : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Ir al proyecto ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Navegación con flechas */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setActiveIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1))}
                className="group flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                <ArrowUpRight size={18} className="rotate-[225deg] group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-semibold">Anterior</span>
              </button>

              <div className="text-sm text-gray-500">
                {String(activeIndex + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
              </div>

              <button
                onClick={() => setActiveIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1))}
                className="group flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full text-gray-400 hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                <span className="text-sm font-semibold">Siguiente</span>
                <ArrowUpRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImageAccordion;