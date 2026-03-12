import Script from 'next/script';
import { Metadata } from "next";
import ChatWidget from "@/components/chatwidget/ChatWidget";

// ✅ METADATA COMPLETA PARA SEO Y GOOGLE ADS
export const metadata: Metadata = {
  title: {
    default: 'Control  de acceso para complejos y hospedajes | Tu Marca AR',
    template: '%s | Tu Marca AR + Puentes Digitales'
  },
  description: 'Sistema de control de acceso RFID para complejos y hospedajes. Reducción de fraudes, ahorro operativo y experiencia premium para tus socios. Instalación en 7 días.',
  keywords: ['Sistema de control de acceso', 'Complejos', 'Hospedajes', 'RFID', 'Fraudes', 'Ahorro operativo', 'Experiencia premium', 'Instalación en 7 días'],
  openGraph: {
    title: 'Sistema de Control de Acceso para Gimnasios | Tu Marca AR',
    description: 'Sistema de control de acceso RFID para gimnasios. Reducción de fraudes, ahorro operativo y experiencia premium para tus socios. Instalación en 7 días.',
    type: 'website',
    locale: 'es-AR',
    siteName: 'Tu Marca AR + Puentes Digitales',
    url: 'https://tumarca.ar/sistema-de-control-de-acceso-para-gimnasios',
    images: [
      {
        url: 'https://tumarca.ar/marca-2-ar-removebg.png',
        width: 1200,
        height: 630,
        alt: 'Sistema de Control de Acceso para Gimnasios | Tu Marca AR',
      },
    ],
  },
  twitter: {
    title: 'Sistema de Control de Acceso para Gimnasios | Tu Marca AR',
    description: 'Sistema de control de acceso RFID para gimnasios. Reducción de fraudes, ahorro operativo y experiencia premium para tus socios. Instalación en 7 días.',
    card: 'summary_large_image',
    images: [
      {
        url: 'https://tumarca.ar/marca-2-ar-removebg.png',
        width: 1200,
        height: 630,
        alt: 'Sistema de Control de Acceso para Gimnasios | Tu Marca AR',
      },
    ],
  },

};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Google Ads Global Tag */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17893506096"
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17893506096');
        `}
      </Script>

      <main className="min-h-screen bg-white">
        {children}
        <ChatWidget />
      </main>
    </>
  );
}
