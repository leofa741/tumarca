import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import RegisterSW from "./register-sw";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tu Marca AR | Diseño Web y Desarrollo de Software",
  description: "Transformamos tu negocio con branding estratégico, diseño web premium y marketing digital basado en datos. +50 marcas transformadas desde 2015. ¡Consultoría gratuita!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="manifest" href="/manifest.json"/>
        <meta name="theme-color" content="#000000" />
        
        {/* ✅ Google Ads Tag (gtag.js) - AW-18104982319 */}
        <Script
          id="gtag-ads"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=AW-18104982319"
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-18104982319');
            `,
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.className} antialiased bg-gray-100 text-gray-900`}
      >
        <RegisterSW />
        
        {/* ❌ GTM eliminado - ya no se utiliza */}
        
        {children}
      </body>
    </html>
  );
}