
// Necesario si usas animaciones basadas en visibilidad (opcional aquí, pero recomendado si agregas Intersection Observer luego)

import { Playfair_Display } from 'next/font/google';
import type { Metadata } from "next";
import CorrectorTextoIA from '@/components/AsistenteIA';



const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export const metadata: Metadata = {
  title: 'Inteligencia Artificial | Tu Marca AR',
  description: 'Descubre cómo la inteligencia artificial puede transformar tu negocio con soluciones innovadoras y personalizadas. Explora nuestras herramientas y servicios de IA.',
  openGraph: {
    title: 'Inteligencia Artificial | Tu Marca AR',
    description: 'Descubre cómo la inteligencia artificial puede transformar tu negocio con soluciones innovadoras y personalizadas. Explora nuestras herramientas y servicios de IA.',
    images: [
      {
        url: 'https://www.tumarca.ar/marca-2-ar.png',
        width: 800,
        height: 600,
        alt: 'Inteligencia Artificial | Tu Marca AR',
      },
    ],
  },
};

export default function IaPage() {
  return (
     <section className="container mx-auto px-6 py-20 md:py-28 lg:py-36">
    <div className="max-w-4xl mx-auto text-center space-y-8">
        {/* Título */}
      <h1 className="text-4xl md:text-6xl font-semibold text-white">
        Inteligencia Artificial
      </h1>
      <p className="text-lg md:text-xl text-gray-300 mb-4">
        Descubre cómo la inteligencia artificial puede transformar tu negocio.
      </p>
      <CorrectorTextoIA />
   
    </div>
    </section>

  );
}
