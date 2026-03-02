import { Playfair_Display } from 'next/font/google';
import { Brain, Zap, Bot, Sparkles, Target, MessageSquare, Cpu, Rocket, CheckCircle, ArrowRight, Users, Store, GraduationCap, Stethoscope, ShoppingBag, Building2 } from 'lucide-react';
import type { Metadata } from "next";
import VisitTracker from '@/app/(marketing)/components/VisitTracker';
import ScrollProgressBar from '@/components/scroolprogress/ScrollProgressBar';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
});

export const metadata: Metadata = {
  title: 'IA que Vende: Soluciones Reales para PYMEs | Tu Marca AR',
  description: 'Casos concretos de IA aplicada: chatbots que venden 24/7, contenido que convierte, automatización que ahorra 15hs/semana. Para profesionales y PYMEs de Argentina.',
  keywords: [
    'IA para PYMEs Argentina',
    'chatbot que vende',
    'automatización para profesionales',
    'contenido con IA que convierte',
    'asistente virtual para negocios',
    'IA práctica para emprendedores'
  ],
  openGraph: {
    title: 'IA que Vende: Soluciones Reales para tu Negocio | Tu Marca AR',
    description: 'No vendemos "IA". Vendemos tiempo, ventas y tranquilidad. Casos reales para profesionales y PYMEs.',
    url: 'https://www.tumarca.ar/servicios/ia-estrategica',
    images: [
      {
        url: 'https://www.tumarca.ar/ia-marca-ar.png',
        width: 1200,
        height: 630,
        alt: 'Tu Marca AR - IA que Vende para PYMEs',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.tumarca.ar/servicios/ia-estrategica',
  }
};

// Componente reutilizable para tarjetas de caso de uso
const UseCaseCard = ({ icon: Icon, title, problem, solution, result, industry }: any) => (
  <div className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 border border-white/10 rounded-2xl p-6 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10">
    <div className="absolute top-4 right-4">
      <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-medium rounded-full border border-amber-500/30">
        {industry}
      </span>
    </div>
    
    <div className="mb-5">
      <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-amber-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="text-white" size={24} />
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    </div>
    
    <div className="space-y-4">
      <div className="flex gap-3">
        <span className="text-red-400 mt-1">✕</span>
        <p className="text-gray-400 text-sm"><span className="text-gray-300 font-medium">Antes:</span> {problem}</p>
      </div>
      <div className="flex gap-3">
        <span className="text-green-400 mt-1">✓</span>
        <p className="text-gray-300 text-sm"><span className="text-white font-medium">Con IA:</span> {solution}</p>
      </div>
      <div className="pt-3 border-t border-white/10">
        <p className="text-amber-400 font-bold text-sm">→ {result}</p>
      </div>
    </div>
  </div>
);

export default function IAServicePage() {
  
  // Casos de uso reales organizados por perfil de cliente
  const useCases = [
    {
      icon: Users,
      title: "Consultor / Coach / Profesional Independiente",
      industry: "Servicios Profesionales",
      problem: "Pierdes 2-3 horas diarias respondiendo las mismas preguntas por WhatsApp: precios, disponibilidad, metodología. Se te escapan leads mientras dormís.",
      solution: "Chatbot entrenado con tu conocimiento que califica leads, agenda consultas y responde dudas frecuentes 24/7, con tu tono de voz.",
      result: "+40% de leads calificados, 12hs/semana recuperadas para trabajar en lo importante."
    },
    {
      icon: Store,
      title: "PYME de Servicios (Agencia, Estudio, Clínica)",
      industry: "Servicios Locales",
      problem: "Tu equipo pierde tiempo creando contenido para redes que no convierte. No tenés data para saber qué funciona ni cómo optimizar.",
      solution: "Sistema de IA que genera contenido estratégico con tu voz, analiza engagement en tiempo real y sugiere ajustes para maximizar conversión.",
      result: "Contenido en 1/4 del tiempo, +3x interacciones, campañas que se optimizan solas."
    },
    {
      icon: ShoppingBag,
      title: "E-commerce o Retail",
      industry: "Ventas Online",
      problem: "Abandonos de carrito, consultas repetitivas sobre envíos/devoluciones, y no podés atender rápido en horarios pico.",
      solution: "Asistente de ventas integrado a tu tienda que resuelve dudas de envío, recomienda productos y recupera carritos abandonados con mensajes personalizados.",
      result: "-25% abandonos de carrito, +18% ticket promedio, atención inmediata sin contratar más personal."
    },
    {
      icon: GraduationCap,
      title: "Educador / Creador de Contenido",
      industry: "Educación & Contenido",
      problem: "Te cuesta mantener consistencia en redes, reutilizar tu contenido en múltiples formatos, y escalar sin quemarte.",
      solution: "IA que transforma una clase o post en 10 formatos (hilo, reel, email, blog), programa publicaciones y adapta el mensaje por plataforma.",
      result: "Presencia consistente en 5 plataformas con 1/3 del esfuerzo, crecimiento orgánico acelerado."
    },
    {
      icon: Stethoscope,
      title: "Profesional de la Salud / Bienestar",
      industry: "Salud & Bienestar",
      problem: "Pacientes preguntan lo mismo por mensaje: horarios, preparación para estudios, seguimientos. Querés enfocarte en atender, no en administrar.",
      solution: "Asistente que gestiona consultas pre-atención, envía recordatorios personalizados, y deriva solo lo urgente a tu agenda.",
      result: "Agenda más ordenada, menos no-shows, más tiempo para lo que realmente importa: tus pacientes."
    },
    {
      icon: Building2,
      title: "Emprendedor lanzando un producto/servicio",
      industry: "Startups & Lanzamientos",
      problem: "No sabés cómo validar tu idea rápido, generar contenido de lanzamiento ni medir interés real sin invertir meses y mucha plata.",
      solution: "IA que analiza tu nicho, genera copy de prueba para landing pages, crea secuencias de email y mide respuestas para iterar en días, no meses.",
      result: "Validación en 2 semanas, lanzamiento con data real, inversión optimizada desde el día 1."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section - Enfocado en dolor concreto */}
      <section className="container mx-auto px-6 py-20 md:py-28 text-center">
        <ScrollProgressBar
          className="fixed top-0 left-0 right-0 z-50 w-full h-2 bg-gradient-to-r from-amber-500 to-violet-600"
     
        /> 

         <VisitTracker pageName="ia-estrategica-para-marcas" /> 

        <div className="inline-block mb-6">
          <span className="px-5 py-2 bg-gradient-to-r from-amber-500 to-violet-600 text-black text-sm font-bold rounded-full">
            ⚡ IA que Vende, No que Suena Bien
          </span>
        </div>
        
        <h1 className={`${playfair.className} text-4xl md:text-6xl font-bold mb-6 leading-tight`}>
          ¿Tu competencia usa IA para <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-violet-500">vender más</span>? <br/>Vos también podés.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
          No te ofrecemos "tecnología". Te ofrecemos <strong>tiempo recuperado, leads calificados y ventas automatizadas</strong>. 
          Casos reales para PYMEs y profesionales de Argentina.
        </p>

        {/* Micro-proof social */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-12">
          <span className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> +80 profesionales ayudados</span>
          <span className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> Resultados en 15 días</span>
          <span className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> Sin contratos largos</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-violet-600 text-black font-bold text-lg rounded-xl hover:from-amber-400 hover:to-violet-500 transition-all duration-300 shadow-2xl hover:shadow-amber-500/30 transform hover:scale-105"
          >
            Quiero ver mi caso <ArrowRight size={20} />
          </a>
          <a
            href="#casos-reales"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-medium text-lg rounded-xl hover:bg-white/20 transition-all border border-white/20"
          >
            Ver casos de uso reales
          </a>
        </div>

        {/* Visual indicator */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-violet-900/30 to-amber-900/30 rounded-2xl p-6 border border-white/10">
          <p className="text-gray-300 text-sm md:text-base">
            <span className="text-amber-400 font-bold">Ejemplo rápido:</span> Un contador que atendía 30 consultas repetitivas por semana sobre facturación. 
            Con un asistente de IA entrenado con su conocimiento, ahora responde automáticamente el 80%, y solo interviene en casos complejos. 
            <span className="text-green-400 font-bold ml-2">→ 6 horas/semana recuperadas.</span>
          </p>
        </div>
      </section>

      {/* Sección: ¿Te suena familiar? - Para generar identificación inmediata */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent to-gray-900/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">¿Alguna de estas situaciones te resulta familiar?</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Si respondiste "sí" a alguna, no estás solo. Y hay solución.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "¿Respondés las mismas preguntas una y otra vez por WhatsApp?",
              "¿Tu contenido en redes no genera consultas reales?",
              "¿Se te escapan leads mientras dormís o trabajás?",
              "¿No tenés tiempo para crear contenido consistente?",
              "¿Querés escalar sin contratar más personal?",
              "¿Tu competencia parece estar siempre un paso adelante?"
            ].map((question, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="text-amber-500 font-bold text-lg">→</span>
                <p className="text-gray-300 text-sm">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NUEVA SECCIÓN PRINCIPAL: Casos de Uso Reales */}
      <section id="casos-reales" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-violet-600/20 text-violet-400 text-sm font-medium rounded-full border border-violet-500/30 mb-4 inline-block">
              Casos Reales · Resultados Medibles
            </span>
            <h2 className="text-4xl font-bold mb-6">IA aplicada a tu realidad</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              No vendemos tecnología abstracta. Implementamos soluciones concretas para perfiles como el tuyo. 
              Seleccioná tu escenario o <a href="/contact" className="text-amber-400 hover:underline">contanos el tuyo</a>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((caso, i) => (
              <UseCaseCard key={i} {...caso} />
            ))}
          </div>

          {/* CTA intermedio */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">¿No ves tu caso exacto? Probablemente podamos ayudarte igual.</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition border border-white/20"
            >
              Contame tu situación →
            </a>
          </div>
        </div>
      </section>

      {/* Cómo trabajamos - Simple y transparente */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900/30 to-transparent">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Así funciona: Simple, sin vueltas</h2>
            <p className="text-gray-400">Sin tecnicismos. Sin implementaciones eternas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Diagnóstico", desc: "Entendemos tu negocio, tus dolores y tus objetivos en una llamada de 30 min." },
              { step: "2", title: "Propuesta concreta", desc: "Te mostramos exactamente qué IA aplicar, cómo y qué resultado esperar." },
              { step: "3", title: "Implementación ágil", desc: "Configuramos y entrenamos tu solución en 7-15 días, con tu voz y datos." },
              { step: "4", title: "Seguimiento real", desc: "Medimos resultados, ajustamos y escalamos solo lo que funciona." }
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-amber-500 to-violet-600 rounded-2xl flex items-center justify-center text-black font-bold text-xl mb-4 group-hover:scale-110 transition-transform">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resultados con contexto real */}
      <section className="py-20 px-6 bg-gradient-to-r from-violet-900/20 to-amber-900/20 border-t border-amber-500/10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Resultados que importan</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            No medimos "engagement". Medimos lo que hace crecer tu negocio.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-4xl font-bold text-amber-400 mb-2">12h+</p>
              <p className="text-gray-300">semanales recuperadas en promedio</p>
              <p className="text-gray-500 text-sm mt-2">para enfocarte en lo que solo vos podés hacer</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-4xl font-bold text-violet-400 mb-2">+35%</p>
              <p className="text-gray-300">leads calificados en 30 días</p>
              <p className="text-gray-500 text-sm mt-2">gracias a chatbots que filtran y derivan</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-4xl font-bold text-green-400 mb-2">15 días</p>
              <p className="text-gray-300">para ver primeros resultados</p>
              <p className="text-gray-500 text-sm mt-2">sin esperas eternas ni implementaciones complejas</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final - Enfocado en acción inmediata */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Tu competencia ya está probando IA. <br/>
            <span className="text-amber-400">¿Vas a esperar o vas a actuar?</span>
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            No necesitás ser experto en tecnología. Solo necesitás querer <strong>vender más, trabajar menos y crecer con inteligencia</strong>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-amber-500 to-violet-600 text-black font-bold text-lg rounded-2xl hover:from-amber-400 hover:to-violet-500 transition-all duration-300 shadow-2xl transform hover:scale-105"
            >
              🤖 Agendar Diagnóstico 
            </a>
          </div>
          
          <div className="text-gray-500 text-sm space-y-2">
            <p>✓ Sin compromiso · ✓ 30 minutos · ✓ Propuesta concreta al finalizar</p>
            <p className="text-amber-400/80">Incluye: Auditoría express de 3 oportunidades de IA para tu negocio</p>
          </div>
        </div>
      </section>

      {/* Footer micro-CTA sticky para móvil */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/90 backdrop-blur-sm border-t border-white/10 md:hidden z-50">
        <a
          href="/contact"
          className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-amber-500 to-violet-600 text-black font-bold rounded-xl"
        >
          <Bot size={20} /> Quiero mi diagnóstico gratuito
        </a>
      </div>
    </div>
  );
}