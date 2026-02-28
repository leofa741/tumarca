import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LoadingProvider } from "@/context/LoadingContext";
import Loader from "@/components/Loader";
import ChatWidget from "@/components/chatwidget/ChatWidget";
import RedesFlotantes from "@/components/RedesFlotantes";
import { Analytics } from "@vercel/analytics/next";
import ScrollProgressBar from "@/components/scroolprogress/ScrollProgressBar";
import OnlineVisitors from "@/components/onlinevisitors/OnlineVisitors";
import { Metadata } from "next";





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

// ===== METADATOS DINÁMICOS POR PÁGINA (Opcional) =====
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  return {
    title: `${params.slug} | Tu Marca AR`,
    // ... más metadatos dinámicos
  };
}

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <ScrollProgressBar
        gradient="from-pink-500 to-rose-500"
        opacity={0.9}
        className="shadow-lg shadow-pink-500/20"

      />
      <LoadingProvider>
        <Loader />

        <main className="min-h-screen">

          {children}
          <OnlineVisitors />
          <ChatWidget />
          <Analytics />
        </main>

        <RedesFlotantes />
        <Footer />
      </LoadingProvider>
    </>
  );
}
