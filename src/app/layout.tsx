import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";

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
  // ===== METADATOS BÁSICOS =====
  title: {
    default: "Tu Marca AR | Branding, Diseño Web & Marketing Digital",
    template: "%s | Tu Marca AR"
  },
  description: "Transformamos tu negocio con branding estratégico, diseño web premium y marketing digital basado en datos. +50 marcas transformadas desde 2015. ¡Consultoría gratuita!",

  // ===== SEO AVANZADO =====
  keywords: [
    "branding Argentina", "diseño web Buenos Aires", "marketing digital",
    "agencia de marketing", "diseño de marca", "SEO", "posicionamiento web",
    "identidad corporativa", "diseño UX/UI", "consultoría digital"
  ],

  authors: [{ name: "Tu Marca AR", url: "https://tumarca.ar" }],
  creator: "Tu Marca AR",
  publisher: "Tu Marca AR",

  // ===== ROBOTS & INDEXACIÓN =====
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ===== URL CANÓNICA =====
  alternates: { canonical: "https://tumarca.ar" },

  // ===== VERIFICACIÓN (completar con tus códigos) =====
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },

  // ===== OPEN GRAPH =====
  openGraph: {
    type: "website",
    locale: "es_AR",
    alternateLocale: ["es_ES", "en_US"],
    url: "https://tumarca.ar",
    siteName: "Tu Marca AR",
    title: "Tu Marca AR | Branding, Diseño Web & Marketing Digital",
    description: "Transformamos tu negocio con branding estratégico, diseño web premium y marketing digital basado en datos.",
    images: [
      {
        url: "/logo-n.jpg", // ✅ Imagen en /public/logo-n.jpg
        width: 1200,
        height: 630,
        alt: "Tu Marca AR - Branding y Marketing Digital",
        type: "image/jpeg",
      },
    ],
    countryName: "Argentina",
  },

  // ===== TWITTER CARD =====
  twitter: {
    card: "summary_large_image",
    title: "Tu Marca AR | Branding, Diseño Web & Marketing Digital",
    description: "Transformamos tu negocio con branding estratégico, diseño web premium y marketing digital basado en datos.",
    images: ["/logo-n.jpg"],
    creator: "@tumarcaar",
    site: "@tumarcaar",
  },

  // ===== ICONOS =====
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon.ico",
  },

  manifest: "/manifest.json",

  // ===== APPLE WEB APP =====
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Tu Marca AR",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  applicationName: "Tu Marca AR",
  category: "Business & Industrial/Marketing & Advertising",

  // ✅ BASE URL para rutas relativas
  metadataBase: new URL("https://tumarca.ar"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-KBK7XNSM');`,
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.className} antialiased bg-gray-100 text-gray-900`}
      >
        {/* GTM noscript (OBLIGATORIO) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KBK7XNSM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}
      </body>
    </html>
  );
}
