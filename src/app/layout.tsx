import type { Metadata } from "next";

import { Inter, Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next"

import "./globals.css";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { LoadingProvider } from "@/context/LoadingContext";
import Footer from "@/components/Footer";
import RedesFlotantes from "@/components/RedesFlotantes";
import Script from "next/script";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair',
});


const inter = Inter({ subsets: ['latin'] });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TU.MARCA.AR",
  keywords: [
    'diseño web profesional Argentina',
    'sistemas a medida Argentina',
    'tienda online Argentina',
    'desarrollo web para pymes',
    'branding Argentina',
    'marketing digital para empresas',
    'SEO Argentina',
    'posicionamiento en Google Argentina',
    'agencia digital Buenos Aires',
    'consultoría digital para pymes',
    'aplicaciones a medida Argentina',
    'aplicaciones móviles Argentina',
    'inteligencia artificial para negocios',
  ],
  description:
    "Agencia digital en Argentina especializada en diseño web, branding, SEO, marketing digital y desarrollo de aplicaciones a medida. Potenciamos tu marca para atraer más clientes.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  authors: [{ name: "TU.MARCA.AR Team", url: "https://www.tumarca.ar" }],
  creator: "TU.MARCA.AR",
  openGraph: {
    title: "TU.MARCA.AR",
    description: "Your brand, our passion. TU.MARCA.AR",
    url: "https://www.tumarca.ar",
    type: "website",
    locale: "es_ES",
    siteName: "TUMARCA.AR",
    images: [
      {
        url: 'https://www.tumarca.ar/marca-2-ar.png',
        width: 1200,
        height: 630,
        alt: "TU.MARCA.AR - Your brand, our passion",
      },
    ],

  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
       
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KBK7XNSM');`
          }}
        />
       


        {/* JSON-LD Schema.org */}
        <Script
          id="ld-json-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://www.tumarca.ar/#agencia",
              "url": "https://www.tumarca.ar",
              "name": "Tu Marca AR",
              "image": "https://www.tumarca.ar/marca-2-ar.png",
              "description":
                "Agencia digital en Argentina especializada en diseño web, branding, SEO, marketing digital y desarrollo de aplicaciones a medida.",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "AR",
                "addressLocality": "Buenos Aires",
                "addressRegion": "Buenos Aires",
                "postalCode": "1865",
                "streetAddress": "Castelli 2007"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-34.6037",
                "longitude": "-58.3816"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+54 11 4146-1312",
                "contactType": "customer service",
                "areaServed": "AR",
                "availableLanguage": ["Spanish", "English"]
              },
              "sameAs": [
                "https://www.instagram.com/tu.marca.ar?igsh=bG5mNHQzZmUxbGU2",
                "https://www.linkedin.com/in/tu-marca-ar-8b6777378?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              ],
              "priceRange": "$$",
              "founder": {
                "@type": "Person",
                "name": "Leonardo"
              }
            }),
          }}
        />

        <meta name="theme-color" content="#000000" id="theme-color" />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BN6R2GDMJL');
        `}</Script>
        <meta name="p:domain_verify" content="753accdb8bdcd06f483d29b75b607b8b" />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.className} bg-gray-100 text-gray-900 antialiased`}
      >
      
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KBK7XNSM"
height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe></noscript>


        <Header />

        <LoadingProvider>

          <Loader />
          <main className="min-h-screen">
            <br />
            <br />
            {children}
            <Analytics />
          </main>
          <RedesFlotantes />

          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}

