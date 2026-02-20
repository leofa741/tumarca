'use client';

import { Playfair_Display } from 'next/font/google';
import ImageAccordion from '@/components/ImagenAcordeon';

import ValorDestacado from '@/components/ValorDestacado';
import AplicacionesAMedida from '@/components/AplicacionesAMedida';
import ServicioSEO from '@/components/ServicioSEO';
import AplicacionesIA from '@/components/AplicacionesIA';

import { useSectionTracker } from '../(marketing)/components/useSectionTracker';
import IntroHome from '@/components/IntroHome';
import VisitTracker from '../(marketing)/components/VisitTracker';

import { motion } from 'framer-motion';
import ScrollProgressBar from '@/components/scroolprogress/ScrollProgressBar';



const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
});



export default function Home() {






  const { ref: serviciosRef } = useSectionTracker({
    sectionId: 'serviciosHome',
    sectionName: 'serviciosHome ',
    minReadTime: 3000, // 4 segundos para considerar lectura
    onEngagement: (data) => {
      // Opcional: lógica extra en cliente
      if (data.eventType === 'read') {
        console.log('🎯 Usuario leyó serviciosHome');
      }
    },
  });



  return (
    <>


      <ScrollProgressBar
        gradient="from-pink-500 to-rose-500"
        opacity={0.9}
        className="shadow-lg shadow-pink-500/20"

      />
      <IntroHome />

      <VisitTracker
        pageName="introHome"
      />


      {/* Sección de servicios */}
      <section className="py-20 px-6" ref={serviciosRef} id="serviciosHome" >
        <div className="max-w-6xl mx-auto">
          {/* H2 único para la sección */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-100 dark:text-white animate-fadeIn" style={{ animationDelay: '0.3s' }}>
            Cómo te ayudamos a crecer
          </h2>

          <div className="space-y-6">
            <ValorDestacado
              titulo="Diseño de Marca"
              descripcion="Creamos identidades visuales únicas que comunican la esencia de tu marca. Desde el logo hasta la paleta de colores y la tipografía, cada elemento está diseñado para transmitir profesionalismo, confianza y personalidad."
              imagenSrc="/d-marca.png"
              alt="Diseño de Marca"
              delay={0.4}
            />
            <ValorDestacado
              titulo="Desarrollo Web"
              descripcion="Diseñamos y desarrollamos la plataforma web ideal para tu proyecto con tecnologías de vanguardia, y te proporcionamos las herramientas necesarias para administrarla de manera eficiente."
              imagenSrc="/desarrollo.png"
              alt="Desarrollo Web"
              delay={0.5}
            />
            <ValorDestacado
              titulo="SEO & Posicionamiento"
              descripcion="Optimizamos tu sitio web para que sea fácilmente encontrado por los motores de búsqueda, mejorando su visibilidad y atrayendo más tráfico orgánico."
              imagenSrc="/seo.png"
              alt="SEO & Posicionamiento"
              delay={0.6}
            />
            <ValorDestacado
              titulo="Soporte Técnico"
              descripcion="Mantené tu web siempre activa, actualizada y segura con nuestro soporte técnico especializado. Estamos aquí para resolver cualquier inconveniente."
              imagenSrc="/soporte-1.png"
              alt="Soporte Técnico"
              delay={0.7}
            />
            <ValorDestacado
              titulo="Consultoría Estratégica"
              descripcion="Impulsá tu marca con decisiones estratégicas. Te acompañamos con asesoramiento experto para construir, optimizar o redefinir tu presencia digital."
              imagenSrc="/consultoria.png"
              alt="Consultoría Estratégica"
              delay={0.8}
            />
          </div>
        </div>
      </section>

      <ServicioSEO />
      <ImageAccordion />
      <AplicacionesAMedida />
      <AplicacionesIA />


    </>
  );
}