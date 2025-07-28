
import Image from 'next/image';
import { Playfair_Display } from 'next/font/google';
import ImageAccordion from '@/components/ImagenAcordeon';
import type { Metadata } from "next";

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export const metadata: Metadata = {
  title: 'Home | Tu Marca AR',
  description: 'Descubre nuestros servicios de branding, diseño web, marketing digital y lanzamientos para potenciar tu marca en el mundo digital.',
  openGraph: {
    title: 'Home | Tu Marca AR',
    description: 'Descubre nuestros servicios de branding, diseño web, marketing digital y lanzamientos para potenciar tu marca en el mundo digital.',
    images: [
      {
        url: '/logo-tumarca.png',
        width: 800,
        height: 600,
        alt: 'Tu Marca AR',
      },
    ],
  }
};

export default function Home() {
  return (
    <>
      <section
        id="intro"
        className="container mx-auto px-6 py-16 md:py-24 lg:py-32"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

          {/* Texto con estilo editorial */}
          <div className="space-y-6 lg:space-y-8">
            <div
              className="animate-fadeIn text-sm uppercase tracking-widest text-gray-400"
              style={{ animationDelay: '0.3s' }}
            >
              <span className="text-amber-500">Bienvenido a</span> <span className="text-white">Tu Marca AR</span>
            </div>
            <h1
              className={`${playfair.className} animate-slideUp font-semibold text-white text-6xl md:text-7xl lg:text-[6.5rem] leading-[1.1] tracking-tight`}
            >
              <span className="block text-neutral-300">tu.</span>
              <span className="block text-amber-500 font-bold text-9xl  *:**:not-[text-amber-500]">marca.</span>
              <span className="block text-neutral-300">ar</span>
            </h1>




          </div>

          {/* Imagen principal */}
          <figure className="w-full">
            <Image
              src="/marca-1-ar-logo.png"
              alt="Lounge Cafe"
              width={800}
              height={600}
              className="rounded-lg  object-cover w-full h-auto"
              priority
            />
          </figure>

          {/* Bloque secundario: imagen + texto + redes */}
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12">

            {/* Imagen secundaria */}
            <div className="max-w-lg mx-auto">
              <Image
                src="/brand.png"
                alt="Imagen con máscara"
                width={600}
                height={400}
                className="w-full h-auto object-cover rounded-lg mask-blob shadow-xl"
                priority
               
              />
            </div>

            {/* Texto y redes */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Gestionamos tu marca con pasión y creatividad. Desde el branding hasta el marketing digital, estamos aquí para ayudarte a destacar en el mundo digital.
              </p>

              <ul className="flex space-x-6 mt-4 text-sm uppercase tracking-wide">
                {['Facebook', 'Instagram', 'Pinterest', 'X'].map((name) => (
                  <li key={name}>
                    <a
                      href="#"
                      className="hover:text-amber-500 text-neutral-400 transition-colors duration-200"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="#contact" className="inline-block mt-8 px-6 py-3 bg-amber-500 text-black font-semibold rounded hover:bg-amber-600 transition">
                Contactanos
              </a>


            </div>

          </div>


        </div>
      </section>
      <ImageAccordion />
    </>
  );
}