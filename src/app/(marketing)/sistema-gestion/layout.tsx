import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sistema de Gestión Premium | Tu Marca AR',
  description:
    'Dashboard + catálogo + escalabilidad. Listo en 10 días. Garantía 100%. Reservá tu demo GRATIS.',
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-white">
      {children}
    </main>
  );
}
