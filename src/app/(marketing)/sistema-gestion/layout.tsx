import { Metadata } from "next";




export const metadata : Metadata = {
  title: 'Sistema de Gestión Premium | Tu Marca AR',
  description: 'Dashboard + catálogo + escalabilidad. Listo en 10 días. Garantía 100%. Reservá tu demo GRATIS.',
  keywords: [
    'sistema gestion emprendedores',
    'dashboard negocio online', 
    'catálogo productos digital',
    'automatizar negocio argentina',
    'escalar e-commerce'
  ],
  openGraph: {
    title: 'Sistema de Gestión Premium | Tu Marca AR',
    description: 'Dashboard + catálogo + escalabilidad. Listo en 10 días.',
    type: 'website',
    locale: 'es_AR',
    siteName: 'Tu Marca AR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sistema de Gestión Premium | Tu Marca AR',
    description: 'Dashboard + catálogo + escalabilidad. Listo en 10 días.',
  },
};  


export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-screen bg-white">{children}</main>;
}
