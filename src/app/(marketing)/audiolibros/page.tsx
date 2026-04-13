import type { Metadata } from "next";
import DesarrolloAMedidaContent from "./DesarrolloAMedidaContent";

;

export const meta: Metadata = {
  title: "Audiolibros Premium | Tu Marca AR",
  description: "Transformamos tu manuscrito en una experiencia sonora de alta fidelidad. Producción profesional con locución, edición y distribución global.",
  
  keywords: [
    "audiolibros Argentina",
    "producción de audiolibros",
    "locución profesional",
    "edición de audio",
    "distribución global",
    "narración de audiolibros",
    "producción de audio profesional"
  ],
  
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://tumarca.ar/desarrollo-a-medida",
    siteName: "Tu Marca AR",
    title: "Audiolibros Premium | Tu Marca AR",
    description: "Transformamos tu manuscrito en una experiencia sonora de alta fidelidad. Producción profesional con locución, edición y distribución global.",
    images: [
      {
        url: "/logo-n.jpg",
        width: 1200,
        height: 630,
        alt: "Tu Marca AR - Audiolibros Premium",
        type: "image/jpeg",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Audiolibros Premium | Tu Marca AR",
    description: "Transformamos tu manuscrito en una experiencia sonora de alta fidelidad. Producción profesional con locución, edición y distribución global.",
    images: ["/logo-n.jpg"],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  
  alternates: { canonical: "https://tumarca.ar/desarrollo-a-medida" },
  metadataBase: new URL("https://tumarca.ar"),
};

export default function DesarrolloAMedidaPage() {
  return <DesarrolloAMedidaContent />;
}