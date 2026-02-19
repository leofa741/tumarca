// components/ServicioSEO.tsx
'use client';
import { Playfair_Display } from 'next/font/google';
import { useSectionTracker } from '@/app/(marketing)/components/useSectionTracker';

import Image from 'next/image';


const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
});



export default function IntroHome() {

  const { ref: introRef } = useSectionTracker({
    sectionId: 'introHome',
    sectionName: 'introHome ',
    minReadTime: 2000, // 4 segundos para considerar lectura
    onEngagement: (data) => {
      // console.log("ladata",data)
      // Opcional: lógica extra en cliente
      if (data.eventType === 'read') {
        console.log('🎯 Usuario leyó introHome');
      }
    },
  });
  return (
    <>
      {/* Sección principal: Hero con texto e imagen */}
      <section className="*:relative text-white py-20" ref={introRef} id="introHome" >

      
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 animate-fadeIn"
          style={{ animationDelay: '0.2s', letterSpacing: '-0.02em' }}>
          Creamos sitios web modernos que generan clientes para tu negocio
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

          {/* Columna del texto */}
          <div className="flex flex-col items-center justify-center text-center space-y-6 px-6 lg:px-0 order-2 lg:order-1">

            <h2
              className={`${playfair.className} text-amber-500 font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center leading-tight animate-fadeIn`}
              style={{ animationDelay: '0.5s', letterSpacing: '-0.03em' }}
            >
              “Branding, desarrollo web y estrategias digitales para pymes y profesionales“
            </h2>
            {/* Descripción */}
            <p
              className="text-gray-400 mt-6 text-lg md:text-xl max-w-lg animate-fadeIn"
              style={{ animationDelay: '1.1s' }}
            >
              En <strong>Tu Marca AR</strong>, somos más que una agencia digital. Somos tu socio estratégico en el mundo online. Te ayudamos a construir una presencia digital sólida y atractiva que no solo refleje la esencia de tu marca, sino que también atraiga y convierta a tus visitantes en clientes fieles.
            </p>
          </div>


          {/* Columna de la imagen */}
          <div className="flex justify-center lg:justify-center order-1 lg:order-2 px-6">
            <figure
              className="group relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
              style={{ animationDelay: '1.3s' }}
            >
              <Image
                src="/logo-red.png"
                alt="Logo de Tu Marca AR"
                width={800}
                height={600}
                className="rounded-xl object-cover transition-transform duration-700 ease-in-out transform group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </figure>
          </div>
        </div>
        {/* CTA especial para pedir presupuesto */}
        <div className="text-center mt-16">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:from-blue-400 hover:to-purple-500 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          >
            💬
            <span className="text-lg">Solicitá tu presupuesto gratis</span>
          </a>
          <p className="text-gray-500 text-sm mt-3">
            ¿Tenés una idea? Hablemos y la hacemos realidad.

          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">

          <div className="max-w-lg mx-auto md:mx-0">
            <Image
              src="/brand-1.png"
              alt="Gestión de marca digital"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg mask-blob shadow-xl hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>


          <div className="space-y-6 text-center md:text-left">

            <h2 className="text-2xl md:text-3xl font-bold text-gray-100 dark:text-white animate-fadeIn" style={{ animationDelay: '0.3s' }}>
              Gestionamos tu marca con pasión y creatividad
            </h2>
            <p className="text-lg text-gray-300 dark:text-gray-300">
              Somos un equipo de profesionales dedicados a potenciar tu presencia digital. Desde el diseño de marca hasta el desarrollo web y el marketing digital, te acompañamos en cada paso del camino.
            </p>

            <div className="flex justify-center md:justify-start">
              <a
                href="/contact"
                className="px-6 py-3 bg-amber-500 text-black font-semibold rounded hover:bg-amber-600 transition-colors duration-300"
              >
                Contáctanos
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}