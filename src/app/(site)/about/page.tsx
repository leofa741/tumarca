// app/about/page.tsx

import Image from 'next/image';
import { Playfair_Display } from 'next/font/google';
import { Star, Target, Lightbulb, Heart, Award } from 'lucide-react';
import type { Metadata } from "next";
import AplicacionesAMedida from '@/components/AplicacionesAMedida';
import ServicioSEO from '@/components/ServicioSEO';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Tu Marca AR',
  description: 'Conocé a Tu Marca AR: diseñamos identidades auténticas, sitios web que convierten y estrategias digitales para marcas con propósito.',
  openGraph: {
    title: 'Sobre Nosotros | Tu Marca AR',
    description: 'Somos creativos estratégicos que ayudamos a emprendedores y pequeñas empresas a construir marcas memorables y auténticas.',
    images: [
      {
        url: 'https://www.tumarca.ar/marca-2-ar.png',
        width: 800,
        height: 600,
        alt: 'Tu Marca AR - Sobre Nosotros',
      },
    ],
  }
};

export default function AboutPage() {
  return (
    <>
      <section className="container mx-auto px-6 py-16 md:py-24 lg:py-32">
        {/* Sección principal: Presentación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <span className="text-amber-500 text-sm uppercase tracking-widest font-semibold">
              Conocé al equipo
            </span>
            <h1
              className={`${playfair.className} text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight`}
            >
              Somos <span className="text-amber-500">creativos</span> con estrategia
              <br />
              y <span className="text-neutral-300">pasión por las marcas</span>
            </h1>
            <p className="text-gray-300 text-lg leading-relaxed">
              En <strong>TUMARCA.AR</strong>, no creamos logos al azar ni sitios web genéricos.
              <strong> Construimos identidades con propósito</strong>, diseñadas para conectar,
              diferenciarse y crecer en el mundo digital.
            </p>
            <p className="text-gray-400 text-sm">
              Desde 2015, hemos acompañado a más de 50 emprendedores, coaches y pequeñas empresas
              a transformar su imagen y posicionarse con autenticidad.
            </p>
          </div>

          <figure className="w-full rounded-xl overflow-hidden shadow-2xl">
            <Image
              src="/tu1.png"
              alt="Equipo creativo de Tu Marca AR"
              width={800}
              height={600}
              className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
              priority
            />
          </figure>
        </div>

        {/* Valores / Pilares */}
        <div className="mt-32 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2
              className={`${playfair.className} text-3xl md:text-5xl font-semibold text-white mb-4`}
            >
              Lo que nos mueve
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Cada decisión que tomamos está guiada por estos valores. Porque una marca fuerte nace de principios claros.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Valor 1 */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center">
              <Target className="mx-auto mb-5 text-amber-500" size={40} />
              <h3 className="text-white font-semibold text-xl mb-3">Propósito antes que estética</h3>
              <p className="text-gray-400 text-sm">
                El diseño sin estrategia es ruido. Trabajamos desde tu "por qué" para crear marcas con significado.
              </p>
            </div>

            {/* Valor 2 */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center">
              <Lightbulb className="mx-auto mb-5 text-amber-500" size={40} />
              <h3 className="text-white font-semibold text-xl mb-3">Creatividad con resultados</h3>
              <p className="text-gray-400 text-sm">
                No solo buscamos que se vea bien: buscamos que <strong>convierta, venda y fidelice</strong>.
              </p>
            </div>

            {/* Valor 3 */}
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 text-center">
              <Heart className="mx-auto mb-5 text-amber-500" size={40} />
              <h3 className="text-white font-semibold text-xl mb-3">Empatía como motor</h3>
              <p className="text-gray-400 text-sm">
                Escuchamos, entendemos y nos metemos en tu lugar. Porque tu marca también es tu historia.
              </p>
            </div>
          </div>
        </div>

        {/* Diferencial + CTA */}
        <div className="mt-32 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5 pointer-events-none"></div>
          <Star className="mx-auto text-amber-500 mb-6" size={48} />
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            ¿Por qué elegirnos?
          </h2>
          <div className="max-w-3xl mx-auto text-gray-300 space-y-4 text-lg">
            <p>
              <strong>No somos una agencia más.</strong> Somos tu aliado estratégico: te acompañamos en cada paso,
              sin jerga innecesaria, con entregas puntuales y un enfoque 100% personalizado.
            </p>
            <p>
              Trabajamos con emprendedores que <strong>quieren destacar con autenticidad</strong>,
              no con más ruido. Y lo hacemos con un proceso claro, transparente y centrado en tus objetivos.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-amber-300 font-medium">
            <span className="flex items-center gap-1"><Award size={16} /> +50 marcas transformadas</span>
            <span className="flex items-center gap-1"><Star size={16} /> 100% de satisfacción</span>
            <span className="flex items-center gap-1"><Lightbulb size={16} /> Proceso estratégico único</span>
          </div>
          <div className="mt-12">
            <a
              href="/contact"
              className="inline-block px-10 py-4 bg-amber-500 text-black font-bold text-lg rounded-xl hover:bg-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/30"
            >
              🚀 Quiero mi marca potenciada
            </a>
            <p className="text-gray-500 text-sm mt-4">
              Agenda una llamada gratuita • Próximos cupos en 7 días
            </p>
          </div>
        </div>
      </section>
      <ServicioSEO />

      <AplicacionesAMedida />
    </>
  );
}