// Necesario si usas animaciones basadas en visibilidad (opcional aquí, pero recomendado si agregas Intersection Observer luego)

import { Playfair_Display } from 'next/font/google';
import type { Metadata } from "next";
import FormContact from '@/components/FormContact';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export const metadata: Metadata = {
  title: 'Contacto | Tu Marca AR',
  description: 'Ponete en contacto con nosotros para llevar tu marca al siguiente nivel. Branding, diseño web, marketing digital y más.',
  openGraph: {
    title: 'Contacto | Tu Marca AR',
    description: 'Ponete en contacto con nosotros para llevar tu marca al siguiente nivel. Branding, diseño web, marketing digital y más.',
    images: [
      {
      url: 'https://www.tumarca.ar/marca-2-ar.png',
        width: 800,
        height: 600,
        alt: 'Contacto Tu Marca AR',
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <section className="container mx-auto px-6 py-16 md:py-24 lg:py-32">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className={`${playfair.className} text-4xl md:text-6xl font-semibold text-white animate-slideUp`}>
          Contactanos
        </h1>
        <p className="text-gray-400 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          ¿Tenés un proyecto en mente? Hablemos. Completá el formulario y nos pondremos en contacto a la brevedad.
        </p>
      </div>
      <FormContact /> 

     
    </section>
  );
}
