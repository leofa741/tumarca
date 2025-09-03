

import { Playfair_Display } from 'next/font/google';
import { Brain, Zap, Bot, Sparkles, Target, MessageSquare, Cpu, Rocket } from 'lucide-react';
import type { Metadata } from "next";



const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export const metadata: Metadata = {
  title: 'Servicio de IA Estratégica para Marcas | Tu Marca AR',
  description: 'Impulsa tu marca con IA generativa y LLMs aplicados estratégicamente: contenido, branding, chatbots, automatización y más. Potencia tu negocio con inteligencia artificial real.',
  keywords: [
    'IA para emprendedores',
    'LLM branding estratégico',
    'marketing con inteligencia artificial',
    'chatbot personalizado para marca',
    'automatización con IA Argentina',
    'servicios de IA para pymes',
    'contenido generado con IA estratégica'
  ],
  openGraph: {
    title: 'IA Estratégica para tu Marca | Tu Marca AR',
    description: 'Usamos LLMs y modelos de IA generativa para crear identidades, contenido, chatbots y estrategias que escalan tu marca con inteligencia.',
    url: 'https://www.tumarca.ar/servicios/ia-estrategica',
    images: [
      {
        url: 'https://www.tumarca.ar/ia-marca-ar.png',
        width: 1200,
        height: 630,
        alt: 'Tu Marca AR - IA Estratégica para Branding y Marketing',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.tumarca.ar/servicios/ia-estrategica',
  }
};

export default function IAServicePage() {



  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24 md:py-32 text-center">
        <div className="inline-block mb-6">
          <span className="px-5 py-2 bg-gradient-to-r from-violet-600 to-amber-500 text-white text-sm font-bold rounded-full">
            🔮 NUEVO SERVICIO 2025
          </span>
        </div>
        <h1 className={`${playfair.className} text-5xl md:text-7xl font-bold mb-8 leading-tight`}>
          Tu Marca + <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-violet-500">Inteligencia Artificial</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
          No usamos IA para copiar y pegar. <strong>La entrenamos, guiamos y aplicamos estratégicamente</strong> para construir marcas más inteligentes, ágiles y humanas.
        </p>

        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400 mb-16">
          <span className="flex items-center gap-1"><Bot size={16} /> IA Generativa</span>
          <span className="flex items-center gap-1"><Cpu size={16} /> LLMs Personalizados</span>
          <span className="flex items-center gap-1"><Zap size={16} /> Automatización Estratégica</span>
          <span className="flex items-center gap-1"><Sparkles size={16} /> Creatividad Amplificada</span>
        </div>

        <a
          href="/contact"
          className="inline-block px-10 py-4 bg-gradient-to-r from-amber-500 to-violet-600 text-black font-bold text-lg rounded-xl hover:from-amber-400 hover:to-violet-500 transition-all duration-300 shadow-2xl hover:shadow-amber-500/30 transform hover:scale-105"
        >
          🤖 Quiero IA Estratégica para mi Marca
        </a>
      </section>

      {/* ¿Por qué IA Estratégica? */}
      <section className="py-20 px-6 bg-gradient-to-b from-transparent to-gray-900/30">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">¿Por qué no basta con "usar IA"?</h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Cualquiera puede usar ChatGPT. Pero <strong>crear valor real requiere dirección, ética y estrategia</strong>.<br />
            Nosotros no te damos contenido generado por IA: <strong>te damos una marca que piensa, escala y evoluciona con IA</strong>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: <Target className="text-amber-500" size={32} />,
              title: "Precisión Estratégica",
              desc: "La IA se entrena con tu voz, valores y audiencia. No genera contenido genérico."
            },
            {
              icon: <Brain className="text-violet-500" size={32} />,
              title: "Aprendizaje Continuo",
              desc: "Tu sistema de IA aprende con cada interacción y mejora con el tiempo."
            },
            {
              icon: <Zap className="text-green-400" size={32} />,
              title: "Velocidad x10",
              desc: "Publicaciones, emails, campañas y lanzamientos en horas, no semanas."
            }
          ].map((item, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition">
              <div className="mb-5 flex justify-center">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Servicios con IA */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Lo que hacemos con IA y LLMs</h2>
          <p className="text-gray-300 text-lg">
            Aplicamos modelos de lenguaje (LLMs) y otras tecnologías de IA de forma estratégica y personalizada.
          </p>
        </div>

        <div className="space-y-10 max-w-4xl mx-auto">
          {[
            {
              title: "Identidad de Marca con IA",
              desc: "Generamos nombres, misiones, mantras y narrativas únicas, entrenando modelos con referentes creativos y tu esencia. Validamos con humanos, pero aceleramos con IA.",
              icon: <Sparkles className="text-amber-500" size={24} />
            },
            {
              title: "Contenido Estratégico Automatizado",
              desc: "Blogs, redes sociales, emails y scripts generados con tu tono de voz, basados en data real de tu audiencia y optimizados para conversión.",
              icon: <MessageSquare className="text-violet-500" size={24} />
            },
            {
              title: "Chatbots Inteligentes para tu Marca",
              desc: "Asistentes 24/7 entrenados con tu conocimiento, productos y estilo. Resuelven dudas, capturan leads y venden sin intervención.",
              icon: <Bot className="text-green-400" size={24} />
            },
            {
              title: "Automatización de Lanzamientos",
              desc: "Secuencias de email, landing pages y campañas generadas por IA según el comportamiento del usuario. Todo integrado y listo para escalar.",
              icon: <Rocket className="text-blue-400" size={24} />
            },
            {
              title: "Benchmarking y Análisis Competitivo con IA",
              desc: "Analizamos cientos de marcas en tu nicho y extraemos insights estratégicos que humanamente llevarían semanas.",
              icon: <Target className="text-pink-400" size={24} />
            }
          ].map((servicio, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-6 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition group">
              <div className="p-3 bg-gray-900 rounded-xl self-start group-hover:scale-110 transition">
                {servicio.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{servicio.title}</h3>
                <p className="text-gray-300 leading-relaxed">{servicio.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Resultados */}
      <section className="py-20 px-6 bg-gradient-to-r from-violet-900/20 to-amber-900/20 border-t border-amber-500/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Resultados con IA Estratégica</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-amber-400">-70%</p>
              <p className="text-gray-300">Tiempo en creación de contenido</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-violet-400">+3x</p>
              <p className="text-gray-300">Interacción en redes</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-400">+45%</p>
              <p className="text-gray-300">Conversión en campañas automatizadas</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">¿Listo para tener una marca que piensa?</h2>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
          No se trata de reemplazar al humano. Se trata de <strong>amplificar tu creatividad, estrategia y alcance</strong> con inteligencia artificial bien aplicada.
        </p>
        <a
          href="/contact"
          className="inline-block px-12 py-5 bg-gradient-to-r from-violet-600 via-amber-500 to-violet-600 text-black font-bold text-xl rounded-2xl hover:from-violet-500 hover:to-violet-500 transition-all duration-300 shadow-2xl transform hover:scale-105"
        >
          🤖 Agendar Consulta de IA Estratégica
        </a>
        <p className="text-gray-500 text-sm mt-6">
          Incluye auditoría gratuita de oportunidades con IA para tu marca
        </p>
      </section>
    </div>
  );
}