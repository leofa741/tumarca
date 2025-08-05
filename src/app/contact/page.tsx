// Necesario si usas animaciones basadas en visibilidad (opcional aquí, pero recomendado si agregas Intersection Observer luego)

import { Playfair_Display } from 'next/font/google';
import type { Metadata } from "next";
import FormContact from '@/components/FormContact';
import ContactSection from '@/components/ContactSection';

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
 <ContactSection />
  );
}
