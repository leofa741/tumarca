import { Playfair_Display } from 'next/font/google';
import { Briefcase, Paintbrush, Globe, Rocket, Star, Check } from 'lucide-react';
import type { Metadata } from "next";
import AplicacionesAMedida from '@/components/AplicacionesAMedida';
import ServicioSEO from '@/components/ServicioSEO';
import AplicacionesIA from '@/components/AplicacionesIA';
import Script from 'next/script';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
});


export const metadata: Metadata = {
  title: 'Servicios Profesionales de Branding y Marketing Digital | Tu Marca AR',
  description: 'Potencia tu marca con servicios de branding, diseño web y marketing digital estratégico. Resultados reales, diseño premium y acompañamiento 1 a 1.',
  openGraph: {
    title: 'Servicios | Tu Marca AR',
    description: 'Transformamos marcas con identidad poderosa, sitios web impactantes y estrategias digitales que generan crecimiento sostenible.',
    images: [
      {
        url: 'https://www.tumarca.ar/marca-2-ar.png',
        width: 800,
        height: 600,
        alt: 'Tu Marca AR - Servicios de Branding y Marketing Digital',
      },
    ],
  }
};



export default function ServicePage() {

  return (
    <>
      {/* JSON-LD para FAQPage */}
      <Script
        id="faq-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "¿Cuánto tarda un diseño web completo?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dependiendo de la complejidad, un sitio web profesional tarda entre 3 y 8 semanas desde el briefing inicial hasta el lanzamiento."
                }
              },
              {
                "@type": "Question",
                "name": "¿Qué incluye un servicio de branding estratégico?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Incluye análisis de marca, naming, diseño de logo, paleta de colores, tipografía, manual de marca y storytelling."
                }
              },
              {
                "@type": "Question",
                "name": "¿Cómo se mide el éxito de una campaña de marketing digital?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Medimos tráfico, conversiones, engagement y retorno de inversión (ROI) mediante herramientas de analítica y reportes periódicos."
                }
              }
            ]
          })
        }}
      />

      <section className="container mx-auto px-6 py-20 md:py-28 lg:py-32">
        {/* Título principal */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1
            className={`${playfair.className} animate-slideUp text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight`}
          >
            Transforma tu <span className="text-amber-500">Marca</span> con Estrategia y Diseño
          </h1>
          <p className="mt-6 text-gray-300 text-lg leading-relaxed">
            No solo creamos logos o sitios web. <strong>Construimos marcas que conectan, inspiran y venden</strong>.
            Cada servicio está diseñado para darte visibilidad, credibilidad y crecimiento real en el mundo digital.
          </p>
        </div>

        {/* Servicios con tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding Estratégico */}
          <div className="bg-white/8 backdrop-blur-md rounded-2xl p-7 shadow-xl border border-white/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1">
            <Briefcase className="mx-auto mb-5 text-amber-500" size={48} />
            <h3 className="text-white font-bold text-2xl mb-4">Branding Estratégico</h3>
            <p className="text-gray-300 text-sm mb-3 leading-relaxed">
              Desde tu esencia hasta tu identidad visual. Creamos marcas coherentes y memorables.
            </p>
            <h4 className="text-amber-500 text-sm font-semibold mb-2">Tip de valor:</h4>
            <p className="text-gray-300 text-sm mb-5">Una marca consistente aumenta el reconocimiento hasta un 80% en tu público objetivo.</p>
            <ul className="space-y-3">
              {["Logo & Manual de Identidad", "Naming & Posicionamiento", "Paleta de colores y tipografía", "Storytelling de marca"].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300 text-sm">
                  <Check className="text-amber-500 mr-2" size={16} /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Diseño Web */}
          <div className="bg-white/8 backdrop-blur-md rounded-2xl p-7 shadow-xl border border-white/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1">
            <Paintbrush className="mx-auto mb-5 text-amber-500" size={48} />
            <h3 className="text-white font-bold text-2xl mb-4">Diseño Web</h3>
            <p className="text-gray-300 text-sm mb-3 leading-relaxed">
              Sitios web que convierten visitantes en clientes.
            </p>
            <h4 className="text-amber-500 text-sm font-semibold mb-2">Tip de valor:</h4>
            <p className="text-gray-300 text-sm mb-5">Un sitio optimizado y rápido puede aumentar conversiones hasta un 35%.</p>
            <ul className="space-y-3">
              {["Diseño 100% personalizado", "Optimizado para SEO", "Velocidad y rendimiento", "Responsive en todos los dispositivos"].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300 text-sm">
                  <Check className="text-amber-500 mr-2" size={16} /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Marketing Digital */}
          <div className="bg-white/8 backdrop-blur-md rounded-2xl p-7 shadow-xl border border-white/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1">
            <Globe className="mx-auto mb-5 text-amber-500" size={48} />
            <h3 className="text-white font-bold text-2xl mb-4">Marketing Digital</h3>
            <p className="text-gray-300 text-sm mb-3 leading-relaxed">
              Estrategias que aumentan tráfico, engagement y ventas.
            </p>
            <h4 className="text-amber-500 text-sm font-semibold mb-2">Tip de valor:</h4>
            <p className="text-gray-300 text-sm mb-5">Analizar métricas clave mejora la efectividad de campañas hasta un 40%.</p>
            <ul className="space-y-3">
              {["Gestión de redes sociales", "Contenido estratégico", "Campañas de ads (Meta, Google)", "Email marketing y automatización"].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300 text-sm">
                  <Check className="text-amber-500 mr-2" size={16} /> {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Lanzamientos Exitosos */}
          <div className="bg-white/8 backdrop-blur-md rounded-2xl p-7 shadow-xl border border-white/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1">
            <Rocket className="mx-auto mb-5 text-amber-500" size={48} />
            <h3 className="text-white font-bold text-2xl mb-4">Lanzamientos Exitosos</h3>
            <p className="text-gray-300 text-sm mb-3 leading-relaxed">
              Te acompañamos desde la planificación hasta el Día 1.
            </p>
            <h4 className="text-amber-500 text-sm font-semibold mb-2">Tip de valor:</h4>
            <p className="text-gray-300 text-sm mb-5">Una planificación estructurada aumenta las posibilidades de éxito hasta un 70%.</p>
            <ul className="space-y-3">
              {["Calendario de lanzamiento", "Estrategia de pre-venta", "Email sequences", "Campañas de impacto"].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300 text-sm">
                  <Check className="text-amber-500 mr-2" size={16} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Caso de éxito */}
        <div className="mt-24 max-w-5xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-xl">
          <h2 className="text-3xl text-white font-bold mb-4 text-center">Caso de Éxito</h2>
          <p className="text-gray-300 text-lg mb-4 text-center">
            Cómo ayudamos a <strong>Startup XYZ</strong> a aumentar sus ventas en un 45% en 3 meses gracias a branding estratégico y marketing digital.
          </p>
          <ul className="text-gray-300 text-sm space-y-2 max-w-xl mx-auto">
            <li>✅ Rediseño completo de identidad visual y sitio web.</li>
            <li>✅ Campaña de marketing digital centrada en conversiones.</li>
            <li>✅ Optimización SEO que aumentó tráfico orgánico en un 60%.</li>
          </ul>
        </div>

   
        {/* CTA final */}
        <div className="text-center mt-20">
          <h3 className="text-white text-2xl font-semibold mb-4">¿Listo para escalar tu marca?</h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Agenda una llamada gratuita y descubramos juntos cómo podemos potenciar tu presencia digital.
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-amber-500 text-black font-bold text-lg rounded-xl hover:bg-amber-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/30"
          >
            🚀 Quiero mi marca potenciada
          </a>
          <p className="text-gray-500 text-sm mt-4">
            100% sin compromiso • Próximos cupos disponibles en 7 días
          </p>
        </div>
      </section>

      <ServicioSEO />
      <AplicacionesAMedida />
      <AplicacionesIA />
    </>
  );
}
