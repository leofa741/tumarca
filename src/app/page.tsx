import Image from 'next/image';
import { Playfair_Display } from 'next/font/google';
import ImageAccordion from '@/components/ImagenAcordeon';
import type { Metadata } from 'next';
import ValorDestacado from '@/components/ValorDestacado';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export const metadata: Metadata = {
  title: 'Home | Tu Marca AR',
  description:
    'Descubre nuestros servicios de branding, diseño web, marketing digital y lanzamientos para potenciar tu marca en el mundo digital.',
  openGraph: {
    title: 'Home | Tu Marca AR',
    description:
      'Descubre nuestros servicios de branding, diseño web, marketing digital y lanzamientos para potenciar tu marca en el mundo digital.',
    url: 'https://www.tumarca.ar',
    siteName: 'Tu Marca AR',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: 'https://www.tumarca.ar/marca-2-ar.png',
        width: 800,
        height: 600,
        alt: 'Logo de Tu Marca AR',
      },
    ],
  },
};


// ... (importaciones y metadata, que ya están bien)

export default function Home() {
  return (
    <>
      {/* Sección principal: Hero con texto e imagen */}
      <section id="intro" className="*:relative text-white py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          
          {/* Columna del texto */}
          <div className="flex flex-col items-center justify-center text-center space-y-6 px-6 lg:px-0 order-2 lg:order-1">
            {/* Subtítulo */}
            <div className="animate-fadeIn text-sm uppercase tracking-widest text-gray-400" style={{ animationDelay: '0.3s' }}>
              <span className="text-amber-500">Bienvenido a</span>{' '}
              <span className="text-white">TuMarca.AR</span>
            </div>

            {/* H1 ÚNICO, claro y descriptivo (más de 20 caracteres) */}
            <h1
              className={`${playfair.className} text-amber-500 font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-center leading-tight animate-fadeIn`}
              style={{ animationDelay: '0.5s', letterSpacing: '-0.03em' }}
            >
              Construí una marca personal auténtica, estratégica y con impacto
            </h1>

            {/* Descripción */}
            <p
              className="text-gray-400 mt-6 text-lg md:text-xl max-w-lg animate-fadeIn"
              style={{ animationDelay: '1.1s' }}
            >
              En Argentina y más allá.
            </p>
          </div>

          {/* Columna de la imagen */}
          <div className="flex justify-center lg:justify-center order-1 lg:order-2 px-6">
            <figure
              className="group relative max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
              style={{ animationDelay: '1.3s' }}
            >
              <Image
                src="/marca-2-ar-removebg.png"
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

        {/* Sección secundaria */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          {/* Imagen */}
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

          {/* Texto y CTA */}
          <div className="space-y-6 text-center md:text-left">
            {/* H2: Mensaje clave de valor */}
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

      {/* Sección de servicios */}
      <section className="py-20 px-6 dark:bg-gray-900">
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

      {/* Componente adicional: Acordion de imágenes */}
      <ImageAccordion />
    </>
  );
}