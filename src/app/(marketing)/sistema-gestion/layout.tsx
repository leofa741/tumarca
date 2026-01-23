import Script from 'next/script';
import { Metadata } from "next";
import ChatWidget from "@/components/chatwidget/ChatWidget";

export const metadata: Metadata = {
  title: 'Sistema de Gestión Premium | Tu Marca AR',
  description: 'Dashboard + catálogo + escalabilidad. Listo en 10 días. Garantía 100%. Reservá tu demo GRATIS.',
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Google Ads Global Tag */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17893506096"
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17893506096');
        `}
      </Script>

      <main className="min-h-screen bg-white">
        {children}
          <ChatWidget />
      </main>
    </>
  );
}
