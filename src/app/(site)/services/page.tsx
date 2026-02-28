import ServicesContent from "@/components/services/ServicesContent";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: {
    default: "Servicios de Branding y Marketing Digital | Tu Marca AR",
    template: "%s | Tu Marca AR"
  },
  description: "Branding estratégico, diseño web premium, SEO y marketing digital con resultados reales. +50 marcas transformadas desde 2015. Consultoría gratuita.",
  
  keywords: [
    "branding Argentina", "diseño web Buenos Aires", "marketing digital",
    "agencia de marketing", "diseño de marca", "SEO", "posicionamiento web",
    "sistemas a medida", "machine learning negocios", "chat IA ventas"
  ],
  
  openGraph: {
    type: "website",
    locale: "es_AR",
    alternateLocale: ["es_ES", "en_US"],
    url: "https://tumarca.ar/servicios",
    siteName: "Tu Marca AR",
    title: "Servicios de Branding y Marketing Digital | Tu Marca AR",
    description: "Branding estratégico, diseño web premium, SEO y marketing digital con resultados reales.",
    images: [
      {
        url: "/logo-n.jpg",
        width: 1200,
        height: 630,
        alt: "Tu Marca AR - Servicios",
        type: "image/jpeg",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Servicios | Tu Marca AR",
    description: "Branding, diseño web y marketing digital con resultados reales.",
    images: ["/logo-n.jpg"],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  
  alternates: { canonical: "https://tumarca.ar/servicios" },
  metadataBase: new URL("https://tumarca.ar"),
};

export default function ServiciosPage() {
  return <ServicesContent />;
}