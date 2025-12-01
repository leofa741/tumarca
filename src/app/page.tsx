import Image from 'next/image';
import { Playfair_Display } from 'next/font/google';
import ImageAccordion from '@/components/ImagenAcordeon';
import type { Metadata } from 'next';
import ValorDestacado from '@/components/ValorDestacado';
import AplicacionesAMedida from '@/components/AplicacionesAMedida';
import ServicioSEO from '@/components/ServicioSEO';
import AplicacionesIA from '@/components/AplicacionesIA';
import GrowthGif from '@/components/GrowthGif';


const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
});
export const metadata: Metadata = {
  keywords: [
    'diseño web profesional Argentina',
    'tienda online Argentina',
    'desarrollo web para pymes',
    'branding Argentina',
    'marketing digital para empresas',
    'SEO Argentina',
    'posicionamiento en Google Argentina',
    'agencia digital Buenos Aires',
    'diseño de marca Argentina',
    'consultoría digital para pymes',
    'soporte técnico web',
    'aplicaciones a medida',
    'aplicaciones web Argentina',
    'aplicaciones móviles Argentina',
    'inteligencia artificial para negocios',
  ],
  title: 'Creamos sitios web modernos que generan clientes para tu negocio” | Tu Marca AR',
  description:
    'Agencia digital en Argentina especializada en diseño web, branding, SEO, marketing digital y desarrollo de aplicaciones a medida. Potenciamos tu marca para atraer más clientes.',
  openGraph: {
    title: 'Diseño Web y Marketing Digital en Argentina | Tu Marca AR',
    description:
      'Agencia digital en Argentina especializada en diseño web, branding, SEO, marketing digital y desarrollo de aplicaciones a medida.',
    url: 'https://www.tumarca.ar',
    siteName: 'Tu Marca AR',
    type: 'website',
    locale: 'es_ES',
    images: [
      {
        url: 'https://www.tumarca.ar/marca-2-ar.png',
        width: 800,
        height: 600,
        alt: 'Tu Marca AR - Agencia de diseño web y marketing digital en Argentina',
      },
    ],
  },
};


export default function Home() {
  return (
    <>
      {/* Sección principal: Hero con texto e imagen */}
      <section id="intro" className="*:relative text-white py-20">
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
             “Branding, desarrollo web y estrategias digitales para pymes y profesionales”
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



      {/* Sección de servicios */}
      <section className="py-20 px-6">
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