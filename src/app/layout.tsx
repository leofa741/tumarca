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
    url: "https://tumarca.vercel.app/",
    siteName: "TU.MARCA.AR",
    images: [
      {
        url: "https://tumarca.vercel.app/logo-tumarca.png",
        width: 1200,
        height: 630,
        alt: "TU.MARCA.AR - Your brand, our passion",
      },  
    ],
    locale: "es_ES",
    type: "website",
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
          <Footer />
        </LoadingProvider>
      </body>
    </html>
  );
}

