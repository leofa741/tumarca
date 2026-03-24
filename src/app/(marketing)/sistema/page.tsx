import type { Metadata } from "next";
import DesarrolloAMedidaContent from "./DesarrolloAMedidaContent";

;

export const meta: Metadata = {
  title: "Desarrollo a Medida | Sistemas que Escalan con tu Negocio | Tu Marca AR",
  description: "Soluciones digitales a medida para emprendedores: ERP, CRM, automatización y dashboards en tiempo real. Entrega en 15 días. Pago 50/50. Garantía total.",
  
  keywords: [
    "desarrollo a medida Argentina",
    "sistemas de gestión personalizados",
    "automatización de procesos",
    "ERP para PYMEs",
    "CRM a medida",
    "integración de APIs",
    "dashboard en tiempo real",
    "software empresarial Buenos Aires"
  ],
  
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "https://tumarca.ar/desarrollo-a-medida",
    siteName: "Tu Marca AR",
    title: "Desarrollo a Medida | Sistemas que Escalan con tu Negocio",
    description: "Soluciones digitales a medida para emprendedores: ERP, CRM, automatización y dashboards en tiempo real. Entrega en 15 días.",
    images: [
      {
        url: "/logo-n.jpg",
        width: 1200,
        height: 630,
        alt: "Tu Marca AR - Desarrollo a Medida",
        type: "image/jpeg",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Desarrollo a Medida | Tu Marca AR",
    description: "Sistemas personalizados que resuelven problemas reales. Entrega en 15 días. Pago 50/50.",
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