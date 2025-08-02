// app/portfolio/page.tsx

import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import projects from '@/lib/portfolio';
import AplicacionesAMedida from '@/components/AplicacionesAMedida';
import ServicioSEO from '@/components/ServicioSEO';

export const metadata: Metadata = {
  title: 'Portfolio | Tu Marca AR',
  description:
    'Conocé algunos de los sitios web y estrategias de marca que desarrollé para emprendedores y empresas. Diseño, branding y conversión.',
  openGraph: {
    title: 'Nuestro Portfolio | Tu Marca AR',
    description:
      'Proyectos reales de diseño web y branding para emprendedores. Transformamos ideas en marcas memorables.',
    images: [
      {
       url: 'https://www.tumarca.ar/marca-2-ar.png',
        width: 1200,
        height: 630,
        alt: 'Portfolio de Tu Marca AR',
      },
    ],
  },
};

export default function PortfolioPage() {
  return (

    <>
    <section className="container mx-auto px-6 py-16 md:py-24 lg:py-32">
      {/* Encabezado */}
      <div className="max-w-4xl mx-auto text-center space-y-6 mb-16">
        <h1 className="text-4xl md:text-6xl font-bold text-white">
          Nuestro <span className="text-amber-500">Portfolio</span>
        </h1>
        <p className="text-gray-300 text-lg leading-relaxed">
          Cada proyecto es una historia de transformación. 
          Acá mostramos cómo ayudamos a marcas a crecer con diseño estratégico.
        </p>
      </div>

      {/* Grid de Proyectos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative h-60">
              <Image
                src={project.image}
                alt={`Proyecto para ${project.client}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition"
                >
                  Ver sitio
                </Link>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                <span className="text-amber-500 text-sm font-medium bg-amber-500/20 px-2 py-1 rounded">
                  {project.year}
                </span>
              </div>
              <p className="text-amber-400 font-medium mt-1">para {project.client}</p>
              <p className="text-gray-300 text-sm mt-3 leading-relaxed">{project.description}</p>
              <div className="mt-4">
                <span className="text-xs font-bold text-gray-500 border border-gray-600 px-2 py-1 rounded">
                  {project.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Final */}
      <div className="mt-24 text-center">
        <h3 className="text-2xl font-semibold text-white mb-4">¿Listo para tu propia transformación?</h3>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">
          Armamos tu marca desde cero o la renovamos para que conecte, convierta y crezca.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition"
        >
          Hablá con nosotros
        </Link>
      </div>
    </section>
      <ServicioSEO />
    
                 <AplicacionesAMedida />
                 </>
      
  );
}