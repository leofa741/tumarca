import Image from 'next/image';
import { Playfair_Display } from 'next/font/google';
import ImageAccordion from '@/components/ImagenAcordeon';
import type { Metadata } from 'next';

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
        url: 'https://www.tumarca.ar/marca-2.ar.png',
        width: 800,
        height: 600,
        alt: 'Logo de Tu Marca AR',
      },
    ],
  },
};

export default function Home() {
  return (
    <>
      {/* Sección principal: Hero con texto e imagen */}
      <section id="intro" className=" *:relative text-white py-20">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
  
  {/* Columna del texto - CENTRADO en su espacio */}
  <div className="flex flex-col items-center justify-center text-center space-y-6 px-6 lg:px-0 order-2 lg:order-1">
    {/* Subtítulo animado */}
    <div
      className="animate-fadeIn text-sm uppercase tracking-widest text-gray-400"
      style={{ animationDelay: '0.3s' }}
    >
      <span className="text-amber-500">Bienvenido a</span>{' '}
      <span className="text-white">TuMarca.AR</span>
    </div>

    {/* Título principal */}
    <h1 className="leading-none">
      <span
        className={`${playfair.className} block text-amber-500 uppercase tracking-wide font-black animate-fadeIn`}
        style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', lineHeight: 1, animationDelay: '0.5s' }}
      >
        tu
      </span>
      <span
        className={`${playfair.className} block text-amber-500 font-black mt-1 animate-fadeIn`}
        style={{
          fontSize: 'clamp(3.5rem, 8vw, 6rem)',
          lineHeight: 1,
          letterSpacing: '-0.05em',
          animationDelay: '0.7s',
        }}
      >
        marca.
      </span>
      <span
        className={`${playfair.className} block text-white font-black uppercase tracking-tighter mt-2 animate-fadeIn`}
        style={{
          fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
          letterSpacing: '-0.03em',
          animationDelay: '0.9s',
        }}
      >
        ar
      </span>
    </h1>

    {/* Descripción */}
    <p
      className="text-gray-400 mt-6 text-lg md:text-xl max-w-lg animate-fadeIn"
      style={{ animationDelay: '1.1s' }}
    >
      Construí una marca personal ,autentica, estrategica y con impacto real en Argentina y más allá.
    </p>
  </div>

  {/* Columna de la imagen - A la derecha, centrada verticalmente */}
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
      {/* Overlay sutil al hacer hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </figure>
  </div>
</div>

        {/* Sección secundaria: imagen + texto + redes */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-6xl mx-auto">
          
          {/* Imagen con máscara blob */}
          <div className="max-w-lg mx-auto md:mx-0">
            <Image
              src="/brand-1.png"
              alt="Gestión de marca digital"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg mask-blob shadow-xl transparent hover:scale-105 transition-transform duration-500"
              priority
            />
          </div>

          {/* Contenido: texto, redes y CTA */}
          <div className="space-y-6 text-center md:text-left">
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Gestionamos tu marca con pasión y creatividad. Desde el branding hasta el marketing digital, estamos aquí para ayudarte a destacar en el mundo digital.
            </p>

        

            {/* Botón de contacto */}
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

      {/* Componente adicional: Acordion de imágenes */}
      <ImageAccordion />
    </>
  );
}