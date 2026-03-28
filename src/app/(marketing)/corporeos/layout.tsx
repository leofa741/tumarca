import Script from 'next/script';
import { Metadata } from "next";
import ChatWidget from "@/components/chatwidget/ChatWidget";

// ✅ METADATA COMPLETA PARA SEO Y GOOGLE ADS
export const metadata: Metadata = {
  title: {
    default: 'Corporeos | Tu Marca AR',
    template: '%s | Tu Marca AR'
  },
  description: 'Corporeos, la solución definitiva para darle identidad a tu marca.',
  keywords: ['Corporeos', 'Identidad', 'Marca', 'Tu Marca AR'],
  openGraph: {
    title: 'Corporeos | Tu Marca AR',
    description: 'Corporeos, la solución definitiva para darle identidad a tu marca.',
    type: 'website',
    locale: 'es-AR',
    siteName: 'Tu Marca AR',
    url: 'https://tumarca.ar/corporeos',
    images: [
      {
        url: 'https://tumarca.ar/marca-2-ar-removebg.png',
        width: 1200,
        height: 630,
        alt: 'Corporeos | Tu Marca AR',
      },
    ],
  },
  twitter: {
    title: 'Corporeos | Tu Marca AR',
    description: 'Corporeos, la solución definitiva para darle identidad a tu marca.',
    card: 'summary_large_image',
    images: [
      {
        url: 'https://tumarca.ar/marca-2-ar-removebg.png',
        width: 1200,
        height: 630,
        alt: 'Corporeos | Tu Marca AR',
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


      <Script id="google-ads-session">
        {`
          gtag('event', 'session_start', {
            'event_category': 'session',
            'event_label': 'session_start',
            'value': 1
          }); 
        `}
      </Script>


      <main className="min-h-screen bg-white">
        {children}
        <ChatWidget />
      </main>
    </>
  );
}
