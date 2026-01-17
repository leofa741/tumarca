import { Playfair_Display } from 'next/font/google';
import { Briefcase, Paintbrush, Globe, Rocket, Star, Check, Brain, Sparkles, MessageCircle } from 'lucide-react';
import type { Metadata } from "next";
import ValorDestacado from '@/components/ValorDestacado';
import AplicacionesAMedida from '@/components/AplicacionesAMedida';

import ServicioSEO from '@/components/ServicioSEO';
import AplicacionesIA from '@/components/AplicacionesIA';


const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export const metadata: Metadata = {
  title: 'Servicios de Branding y Marketing Digital | Tu Marca AR - Expertos en Crecimiento de Marca',
  description: 'Agencia de branding y marketing digital en Argentina. Creamos identidades poderosas, sitios web que convierten y estrategias digitales con resultados reales para emprendedores y startups.',
  keywords: [
    'sistemas a medida Argentina',
    'branding profesional Argentina',
    'diseño web que convierte',
    'marketing digital estratégico',
    'agencia de marketing Buenos Aires',
    'posicionamiento de marca 2025',
    'lanzamiento de producto digital',
    'SEO para emprendedores'
  ],
  openGraph: {
    title: 'Transforma tu Marca | Tu Marca AR - Branding & Marketing Digital',
    description: 'Expertos en branding, diseño web y marketing digital en Argentina. Ayudamos a emprendedores y startups a crecer con identidad, estrategia y tecnología.',
    url: 'https://www.tumarca.ar/servicios',
    images: [
      {
        url: 'https://www.tumarca.ar/marca-2-ar.png',
        width: 1200,
        height: 630,
        alt: 'Tu Marca AR - Servicios de Branding y Marketing Digital en Argentina',
      },
    ],
    siteName: 'Tu Marca AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servicios de Branding & Marketing Digital | Tu Marca AR',
    description: 'Creamos marcas que conectan, venden y crecen. Diseño premium, SEO y acompañamiento 1 a 1.',
    images: ['https://www.tumarca.ar/marca-2-ar.png'],
  },
  alternates: {
    canonical: 'https://www.tumarca.ar/servicios',
  }
};

export default function ServicePage() {
  return (
    <>
      <section className="container mx-auto px-6 py-20 md:py-28 lg:py-32">

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

        {/* Servicios con más valor */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Servicio 1 */}
          <div className="bg-white/8 backdrop-blur-md rounded-2xl p-7 shadow-xl border border-white/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1">
            <Briefcase className="mx-auto mb-5 text-amber-500" size={48} />
            <h3 className="text-white font-bold text-2xl mb-4">Sistemas a Medida</h3>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              Automatizamos procesos repetitivos para que te enfoques en lo que importa: crecer.
            </p>
            <ul className="space-y-3">
              {["Automatización de procesos", "Integraciones con herramientas existentes", "Desarrollo personalizado", "Soporte continuo"].map((item, i) => (
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

          {/* Servicio 3 */}
          <div className="bg-white/8 backdrop-blur-md rounded-2xl p-7 shadow-xl border border-white/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1">
            <Paintbrush className="mx-auto mb-5 text-amber-500" size={48} />
            <h3 className="text-white font-bold text-2xl mb-4">Diseño Web</h3>
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

          {/* Servicio 4 */}
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

          {/* Servicio 5 */}
          <div className="bg-white/8 backdrop-blur-md rounded-2xl p-7 shadow-xl border border-white/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1">
            <Brain className="mx-auto mb-5 text-amber-500" size={48} />
            <h3 className="text-white font-bold text-2xl mb-4">Machine Learning</h3>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              Modelos inteligentes que transforman tus datos en predicciones exactas. Automatiza procesos y toma decisiones basadas en evidencia, no en suposiciones.
            </p>
            <ul className="space-y-3">
              {["Modelos predictivos personalizados", "Procesamiento de lenguaje natural", "Visión artificial y reconocimiento", "Automatización de procesos con IA"].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300 text-sm">
                  <Check className="text-amber-500 mr-2" size={16} /> {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <span className="inline-block text-xs px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full">
                Transforma tus datos en decisiones inteligentes

              </span>
            </div>
          </div>


          {/* Servicio 6 */}
          <div className="bg-white/8 backdrop-blur-md rounded-2xl p-7 shadow-xl border border-white/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1">
            <Sparkles className="mx-auto mb-5 text-amber-500" size={48} />
            <h3 className="text-white font-bold text-2xl mb-4">IA</h3>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              Potenciamos tu negocio con soluciones de IA generativa y automatización avanzada. Creamos herramientas inteligentes que optimizan tu tiempo y mejoran la toma de decisiones.
            </p>
            <ul className="space-y-3">
              {["Modelos predictivos personalizados", "Procesamiento de lenguaje natural", "Visión artificial y reconocimiento", "Automatización de procesos con IA"].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300 text-sm">
                  <Check className="text-amber-500 mr-2" size={16} /> {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <span className="inline-block text-xs px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full">
                Transforma tus datos en decisiones inteligentes 

              </span>
            </div>
          </div>


          {/* Servicio 7 */}
          <div className="bg-white/8 backdrop-blur-md rounded-2xl p-7 shadow-xl border border-white/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1">
            <Brain className="mx-auto mb-5 text-amber-500" size={48} />
            <h3 className="text-white font-bold text-2xl mb-4">Consultoría en IA</h3>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              Modelos inteligentes que transforman tus datos en predicciones exactas. Automatiza procesos y toma decisiones basadas en evidencia, no en suposiciones.
            </p>
            <ul className="space-y-3">
              {["Modelos predictivos personalizados", "Procesamiento de lenguaje natural", "Visión artificial y reconocimiento", "Automatización de procesos con IA"].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300 text-sm">
                  <Check className="text-amber-500 mr-2" size={16} /> {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <span className="inline-block text-xs px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full">
                Transforma tus datos en decisiones inteligentes

              </span>
            </div>
          </div>

          {/* Servicio 8 */}
          <div className="bg-white/8 backdrop-blur-md rounded-2xl p-7 shadow-xl border border-white/10 hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1">
            <MessageCircle className="mx-auto mb-5 text-amber-500" size={48} />
            <h3 className="text-white font-bold text-2xl mb-4">Chatbots</h3>
            <p className="text-gray-300 text-sm mb-5 leading-relaxed">
              Chatbots inteligentes que transforman tus datos en predicciones exactas. Automatiza procesos y toma decisiones basadas en evidencia, no en suposiciones.    
              
            </p>
            <ul className="space-y-3">
              {["Modelos predictivos personalizados", "Procesamiento de lenguaje natural", "Visión artificial y reconocimiento", "Automatización de procesos con IA"].map((item, i) => (
                <li key={i} className="flex items-center text-gray-300 text-sm">
                  <Check className="text-amber-500 mr-2" size={16} /> {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 text-center">
              <span className="inline-block text-xs px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full">
                Chatbots inteligentes que transforman tus datos en predicciones exactas. Automatiza procesos y toma decisiones basadas en evidencia, no en suposiciones.  

              </span>
            </div>
          </div> |





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

        {/* Sección de Valores o Servicios Destacados */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-bold text-center mb-12 animate-fadeIn"
              style={{ animationDelay: '0.3s' }}
            >
              Cómo te ayudamos a crecer
            </h2>
            <div className="space-y-6">
              <ValorDestacado
                titulo="Identidad de Marca"
                descripcion="Creamos una identidad visual única que refleja la esencia de tu marca, desde el logo hasta los colores y tipografías."
                imagenSrc="/identidad1.png"
                alt="Identidad de Marca"
                delay={0.4}
              />
              <ValorDestacado
                titulo="Desarrollo Web"
                descripcion="Diseñamos y desarrollamos la plataforma web ideal para tu proyecto con tecnologías de vanguardia, y te proporcionamos las herramientas necesarias para administrarla de manera eficiente."
                imagenSrc="/desarrollo2.png"
                alt="Desarrollo Web"
                delay={0.5}
              />
              <ValorDestacado
                titulo="SEO & Posicionamiento"
                descripcion="Optimizamos tu sitio web para que sea fácilmente encontrado por los motores de búsqueda, mejorando su visibilidad y atrayendo más tráfico orgánico."
                imagenSrc="/seo2.png"
                alt="SEO & Posicionamiento"
                delay={0.6}
              />
              <ValorDestacado
                titulo="Soporte Técnico"
                descripcion="Mantené tu web siempre activa, actualizada y segura con nuestro soporte técnico especializado. Estamos aquí para resolver cualquier inconveniente."
                imagenSrc="/soporte2.png"
                alt="Soporte Técnico"
                delay={0.7}
              />
              <ValorDestacado
                titulo="Consultoría Estratégica"
                descripcion="Impulsá tu marca con decisiones estratégicas. Te acompañamos con asesoramiento experto para construir, optimizar o redefinir tu presencia digital."
                imagenSrc="/consultoria2.png"
                alt="Consultoría Estratégica"
                delay={0.8}
              />
            </div>
          </div>
        </section>

        {/* Sección de Resultados y Testimonios */}
        <section className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-900/50">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Resultados que Hablan por Nosotros
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              No prometemos magia. <strong>Generamos resultados reales</strong> para marcas como la tuya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
            {[
              { num: '+200%', label: 'Más tráfico orgánico en 6 meses', desc: 'Clientes con SEO estratégico' },
              { num: '+85%', label: 'Incremento en conversiones', desc: 'Sitios web rediseñados' },
              { num: '15+', label: 'Lanzamientos exitosos en 2024', desc: 'Productos, servicios y marcas nuevas' },
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
                <p className="text-4xl md:text-5xl font-extrabold text-amber-500 mb-2">{stat.num}</p>
                <p className="text-white font-semibold text-lg mb-1">{stat.label}</p>
                <p className="text-gray-400 text-sm">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Testimonio destacado */}
          <div className="mt-20 max-w-3xl mx-auto bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-2xl p-8 text-center">
            <Star className="text-amber-500 mx-auto mb-4" size={32} />
            <blockquote className="text-gray-200 text-lg italic mb-4">
              “Gracias a Tu Marca AR, mi negocio pasó de ser invisible a generar ventas todos los meses. No solo el diseño es hermoso, sino que <strong>el sitio web empezó a traer clientes desde el primer mes</strong>.”
            </blockquote>
            <p className="text-amber-400 font-semibold">— Camila R., Emprendedora de Bienestar</p>
            <p className="text-gray-500 text-sm mt-1">Buenos Aires, Argentina</p>
          </div>
        </section>

        {/* FAQ Schema-friendly Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-6">
              {[
                {
                  q: "¿Cuánto tiempo lleva desarrollar una identidad de marca completa?",
                  a: "Nuestro proceso de branding estratégico toma entre 4 y 6 semanas. Incluye investigación, naming, diseño de logo, manual de identidad y guía de storytelling."
                },
                {
                  q: "¿Hacen sitios web para emprendedores sin experiencia técnica?",
                  a: "Sí. Diseñamos plataformas intuitivas y te entregamos capacitación + acceso fácil. Además, ofrecemos soporte continuo para que nunca estés solo."
                },
                {
                  q: "¿Ofrecen servicios solo en Argentina?",
                  a: "Trabajamos con clientes de toda Latinoamérica. Nuestros servicios son 100% online, con acompañamiento en español y horarios flexibles."
                },
                {
                  q: "¿Qué incluye el servicio de SEO?",
                  a: "Optimización técnica, investigación de palabras clave, contenido estratégico, velocidad del sitio y seguimiento mensual de posicionamiento y tráfico."
                }
              ].map((item, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition">
                  <h3 className="text-white font-semibold text-lg mb-3">{item.q}</h3>
                  <p className="text-gray-300 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Mejorado */}
        <div className="text-center mt-20 bg-gradient-to-r from-gray-900/70 to-transparent border-t border-amber-500/20 pt-16 pb-12 px-6 rounded-t-3xl">
          <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">
            ¿Listo para que tu marca <span className="text-amber-500">destaque y crezca?</span>
          </h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto text-lg">
            Únete a emprendedores que ya transformaron su presencia digital con un equipo que entiende tu negocio.
          </p>
          <a
            href="/contact"
            className="inline-block px-10 py-4 bg-gradient-to-r from-amber-500 to-amber-400 text-black font-bold text-lg rounded-xl hover:from-amber-400 hover:to-amber-300 transition-all duration-300 shadow-2xl hover:shadow-amber-500/40 transform hover:scale-105"
          >
            🚀 Agenda tu Consulta Gratuita
          </a>
          <p className="text-gray-500 text-sm mt-4">
            Próximos cupos: <span className="text-amber-400 font-medium">7 días</span> • Sin compromiso • 100% online
          </p>
        </div>
      </section>
      <ServicioSEO />
      <AplicacionesAMedida />
      <AplicacionesIA />
    </>
  );
}