import { Playfair_Display } from 'next/font/google';
import { Briefcase, Paintbrush, Globe, Rocket, Star, Check } from 'lucide-react';
import type { Metadata } from "next";

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
        url: '/marca-1-ar.png',
        width: 800,
        height: 600,
        alt: 'Tu Marca AR - Servicios de Branding y Marketing Digital',
      },
    ],
  }
};

export default function ServicePage() {
  return (
    <section className="container mx-auto px-6 py-20 md:py-28 lg:py-32">
      {/* Título principal */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <h2
          className={`${playfair.className} animate-slideUp text-5xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tight`}
        >
          Transforma tu <span className="text-amber-500">Marca</span> con Estrategia y Diseño
        </h2>
        <p className="mt-6 text-gray-300 text-lg leading-relaxed">
          No solo creamos logos o sitios web. <strong>Construimos marcas que conectan, inspiran y venden</strong>. 
          Cada servicio está diseñado para darte visibilidad, credibilidad y crecimiento real en el mundo digital.
        </p>
      </div>

      {/* Servicios con más valor */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Servicio 1 */}
        <div className="bg-white/8 backdrop-blur-md rounded-2xl p-7 shadow-xl border border-white/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1">
          <Briefcase className="mx-auto mb-5 text-amber-500" size={48} />
          <h3 className="text-white font-bold text-2xl mb-4">Branding Estratégico</h3>
          <p className="text-gray-300 text-sm mb-5 leading-relaxed">
            Desde tu esencia hasta tu identidad visual. Creamos una marca coherente, memorable y alineada con tu propósito.
          </p>
          <ul className="space-y-3">
            {["Logo & Manual de Identidad", "Naming & Posicionamiento", "Paleta de colores y tipografía", "Storytelling de marca"].map((item, i) => (
              <li key={i} className="flex items-center text-gray-300 text-sm">
                <Check className="text-amber-500 mr-2" size={16} /> {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center">
            <span className="inline-block text-xs px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full">
              Ideal para emprendedores y startups
            </span>
          </div>
        </div>

        {/* Servicio 2 */}
        <div className="bg-white/8 backdrop-blur-md rounded-2xl p-7 shadow-xl border border-white/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1">
          <Paintbrush className="mx-auto mb-5 text-amber-500" size={48} />
          <h3 className="text-white font-bold text-2xl mb-4">Diseño Web Premium</h3>
          <p className="text-gray-300 text-sm mb-5 leading-relaxed">
            Sitios web que no solo se ven increíbles, sino que <strong>convierten visitantes en clientes</strong>.
          </p>
          <ul className="space-y-3">
            {["Diseño 100% personalizado", "Optimizado para SEO", "Velocidad y rendimiento", "Responsive en todos los dispositivos"].map((item, i) => (
              <li key={i} className="flex items-center text-gray-300 text-sm">
                <Check className="text-amber-500 mr-2" size={16} /> {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center">
            <span className="inline-block text-xs px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full">
              +90% de satisfacción en entregas
            </span>
          </div>
        </div>

        {/* Servicio 3 */}
        <div className="bg-white/8 backdrop-blur-md rounded-2xl p-7 shadow-xl border border-white/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1">
          <Globe className="mx-auto mb-5 text-amber-500" size={48} />
          <h3 className="text-white font-bold text-2xl mb-4">Marketing Digital</h3>
          <p className="text-gray-300 text-sm mb-5 leading-relaxed">
            Estrategias reales que aumentan tu tráfico, engagement y ventas. No más publicaciones sin sentido.
          </p>
          <ul className="space-y-3">
            {["Gestión de redes sociales", "Contenido estratégico", "Campañas de ads (Meta, Google)", "Email marketing y automatización"].map((item, i) => (
              <li key={i} className="flex items-center text-gray-300 text-sm">
                <Check className="text-amber-500 mr-2" size={16} /> {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center">
            <span className="inline-block text-xs px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full">
              Basado en datos y resultados
            </span>
          </div>
        </div>

        {/* Servicio 4 */}
        <div className="bg-white/8 backdrop-blur-md rounded-2xl p-7 shadow-xl border border-white/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1">
          <Rocket className="mx-auto mb-5 text-amber-500" size={48} />
          <h3 className="text-white font-bold text-2xl mb-4">Lanzamientos Exitosos</h3>
          <p className="text-gray-300 text-sm mb-5 leading-relaxed">
            ¿Nuevo producto, servicio o marca? Te acompañamos desde la planificación hasta el Día 1.
          </p>
          <ul className="space-y-3">
            {["Calendario de lanzamiento", "Estrategia de pre-venta", "Email sequences", "Campañas de impacto"].map((item, i) => (
              <li key={i} className="flex items-center text-gray-300 text-sm">
                <Check className="text-amber-500 mr-2" size={16} /> {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 text-center">
            <span className="inline-block text-xs px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full">
              +15 lanzamientos exitosos en 2024
            </span>
          </div>
        </div>
      </div>

      {/* Sección de confianza */}
      <div className="mt-24 text-center max-w-3xl mx-auto bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-8">
        <Star className="mx-auto text-amber-500 mb-4" size={40} />
        <h3 className="text-white text-2xl font-semibold mb-4">¿Por qué elegirnos?</h3>
        <p className="text-gray-300 text-lg leading-relaxed mb-6">
          Trabajamos con emprendedores, coaches y pequeñas empresas que quieren <strong>destacar con autenticidad y profesionalismo</strong>. 
          No somos una agencia más: somos tu <strong>aliado estratégico</strong> en el crecimiento de tu marca.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <span>✅ 100% personalizado</span>
          <span>✅ Entregas puntuales</span>
          <span>✅ Soporte continuo</span>
          <span>✅ Sin jerga innecesaria</span>
        </div>
      </div>

      {/* CTA Final */}
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
  );
}