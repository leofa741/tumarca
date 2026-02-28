import HomeContent from "@/components/home/HomeContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Tu Marca AR | Branding, Diseño Web & Marketing Digital",
    template: "%s | Tu Marca AR"
  },
  description: "Transformamos tu negocio con branding estratégico, diseño web premium y marketing digital basado en datos. +50 marcas transformadas desde 2015.",
  
  keywords: [
    "branding Argentina", "diseño web Buenos Aires", "marketing digital",
    "agencia de marketing", "diseño de marca", "SEO", "posicionamiento web"
  ],
  
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://tumarca.ar",
    siteName: "Tu Marca AR",
    title: "Tu Marca AR | Branding, Diseño Web & Marketing Digital",
    description: "Transformamos tu negocio con branding estratégico, diseño web premium y marketing digital basado en datos.",
    images: [
      {
        url: "/logo-n.jpg",
        width: 1200,
        height: 630,
        alt: "Tu Marca AR",
        type: "image/jpeg",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Tu Marca AR | Branding, Diseño Web & Marketing Digital",
    description: "Transformamos tu negocio con branding estratégico, diseño web premium y marketing digital basado en datos.",
    images: ["/logo-n.jpg"],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  
  alternates: { canonical: "https://tumarca.ar" },
  metadataBase: new URL("https://tumarca.ar"),
};

export default function HomePage() {
  return <HomeContent />;
}