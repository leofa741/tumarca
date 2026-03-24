// app/layout.tsx
import ChatWidget from '@/components/chatwidget/ChatWidget';
import Script from 'next/script';

export const metadata = {
  title: 'Desarrollo de Software a Medida | Soluciones Digitales para Empresas',
  description:
    'Desarrollamos sistemas, plataformas web y automatización a medida para empresas que necesitan eficiencia y control.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Google Ads Global Site Tag (gtag.js) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-17893506096"
        strategy="afterInteractive"
      />
      <Script id="google-ads-gtag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-17893506096');
        `}
      </Script>

      {/* Google Ads Conversion Function (opcional, si usas enlaces con redirección) */}
      <Script id="google-ads-conversion-fn" strategy="afterInteractive">
        {`
          function gtag_report_conversion(url) {
            var callback = function () {
              if (typeof url !== 'undefined') {
                window.location = url;
              }
            };
            gtag('event', 'conversion', {
              send_to: 'AW-17893506096/5519CMKZ4-kbELD4pNRC',
              value: 1.0,
              currency: 'ARS',
              event_callback: callback
            });
            return false;
          }
        `}
      </Script>

      <main className="min-h-screen bg-white">
        {children}
        <ChatWidget />
      </main>
    </>
  );
}