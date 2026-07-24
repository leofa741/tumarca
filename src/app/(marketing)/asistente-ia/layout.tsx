// src/app/(marketing)/asistente-ia/layout.tsx
import type { Metadata } from 'next';

// Metadatos específicos que sobrescriben/complementan al layout raíz
export const metadata: Metadata = {
  title: 'Asistente Inteligente para Empresas | IA que Atiende Clientes 24/7 | TuMarca',
  description: 'Implementamos asistentes inteligentes que responden clientes las 24 horas, registran leads y ayudan a vender más.',
  alternates: {
    canonical: 'https://www.tumarca.ar/asistente-ia',
  },
};

export default function AsistenteIALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ⚠️ IMPORTANTE: Aquí NO van etiquetas <html> ni <body>.
  // Solo devolvemos los children o un wrapper <div> si necesitamos estilos específicos de esta sección.
  return (
    <>
      {children}
    </>
  );
}