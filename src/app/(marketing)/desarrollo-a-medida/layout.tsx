import Script from 'next/script';
import { Metadata } from "next";

export const metadata = {
  title: 'Desarrollo de Software a Medida | Soluciones Digitales para Empresas',
  description:
    'Desarrollamos sistemas, plataformas web y automatización a medida para empresas que necesitan eficiencia y control.',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>
    {/* Google Ads Global Tag */}


    <Script async src="https://www.googletagmanager.com/gtag/js?id=AW-17893506096">
    </Script>
    <Script>
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        // @ts-ignore
        dataLayer.push(arguments)
      }
      gtag('js', new Date());

      gtag('config', 'AW-17893506096');
    </Script>

    <main className="min-h-screen bg-white">
      {children}
    </main>
  </>;
}
