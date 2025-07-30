import type { Metadata } from "next";
import { Inter ,Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next"

import "./globals.css";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { LoadingProvider } from "@/context/LoadingContext";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-playfair', // Opcional: para usar como CSS variable
});


const inter = Inter({ subsets: ['latin'] });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TU.MARCA.AR",
  keywords: ["branding", "design", "marketing", "TU.MARCA.AR"],
  authors: [{ name: "TU.MARCA.AR Team", url: "https://tumarca.ar" }],
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
          <meta name="theme-color" content="#000000" id="theme-color"/>
      </head>


      <body
       className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.className} bg-gray-100 text-gray-900 antialiased`}
      >
          <Header />
       
        <LoadingProvider>
        
          <Loader />
          <main className="min-h-screen">
               <br />
                  <br />
            {children}
            <Analytics />
          </main>
 <a
  href="https://wa.me/+541141461312"
  className="fixed bottom-6 right-6 z-50 flex items-center justify-center bg-green-500 text-white p-0 rounded-full shadow-lg hover:scale-130 hover:shadow-xl transition-all duration-300 ease-in-out animate-pulse-slow"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chatea con nosotros por WhatsApp"
>
  {/* Icono de WhatsApp */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-10 h-10"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.036-.967-.279-.099-.48-.148-.679.15-.199.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.46-2.39-1.473-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.199.05-.372-.025-.52-.075-.149-.668-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.62.955.988-3.518-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-17.002A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.122 1.588 5.895L.057 24l6.305-1.664a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>

  {/* Etiqueta opcional (visible solo en hover y pantallas medianas en adelante) */}
  <span className="absolute -bottom-10 -right-8 bg-gray-800 text-white text-xs rounded py-1 px-2 min-w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
    Habla con nosotros
  </span>
</a>

          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}

