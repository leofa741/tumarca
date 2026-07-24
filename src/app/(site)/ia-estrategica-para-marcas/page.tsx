import { Playfair_Display } from 'next/font/google';
import { 
  Zap, CheckCircle, ArrowRight, Users, Store, 
  Stethoscope, Building2, Clock, TrendingUp, CalendarCheck, 
  MessageSquare, Target, Bot, Smartphone
} from 'lucide-react';
import type { Metadata } from "next";

// ⚠️ VERIFICA QUE ESTAS RUTAS EXISTAN Y ESTÉN BIEN ESCRITAS EN TU PROYECTO
// (Nota: fíjate si la carpeta es 'scroolprogress' o 'scrollprogress')
import VisitTracker from '@/app/(marketing)/components/VisitTracker'; 
import ScrollProgressBar from '@/components/scroolprogress/ScrollProgressBar'; 

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Asistente IA que Vende y Califica Leads 24/7 | Tu Marca AR',
  description: 'No es un chatbot común. Es un asistente que responde con tus datos, califica leads (HOT/WARM/COLD) y te avisa al instante. Para PYMEs y profesionales de Argentina.',
  keywords: [
    'chatbot que vende',
    'calificación de leads con IA',
    'automatización de ventas Argentina',
    'asistente virtual para PYMEs',
    'respuestas automáticas WhatsApp y Web'
  ],
  openGraph: {
    title: 'Asistente IA que Vende y Califica Leads 24/7 | Tu Marca AR',
    description: 'Dejá de perder ventas por no responder a tiempo. Implementamos IA que filtra curiosos y te avisa cuando entra un cliente real.',
    url: 'https://www.tumarca.ar/ia-estrategica-para-marcas',
    images: [
      {
        url: 'https://www.tumarca.ar/ia-marca-ar.png',
        width: 1200,
        height: 630,
        alt: 'Tu Marca AR - Asistente IA que Vende',
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: 'https://www.tumarca.ar/ia-estrategica-para-marcas',
  }
};

// Interfaz para evitar errores de TypeScript estricto
interface UseCase {
  icon: React.ElementType;
  title: string;
  problem: string;
  solution: string;
  result: string;
  industry: string;
}

// Componente reutilizable para tarjetas de caso de uso
const UseCaseCard = ({ icon: Icon, title, problem, solution, result, industry }: UseCase) => (
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
        <span className="text-red-400 mt-1 font-bold">✕</span>
        <p className="text-gray-400 text-sm"><span className="text-gray-300 font-medium">El problema:</span> {problem}</p>
      </div>
      <div className="flex gap-3">
        <span className="text-green-400 mt-1 font-bold">✓</span>
        <p className="text-gray-300 text-sm"><span className="text-white font-medium">Nuestro Asistente:</span> {solution}</p>
      </div>
      <div className="pt-3 border-t border-white/10">
        <p className="text-amber-400 font-bold text-sm flex items-center gap-2">
          <TrendingUp size={16} /> {result}
        </p>
      </div>
    </div>
  </div>
);

export default function IAServicePage() {
  
  const useCases: UseCase[] = [
    {
      icon: Store,
      title: "E-commerce y Retail",
      industry: "Ventas Online",
      problem: "Abandonos de carrito y consultas repetitivas sobre envíos, precios o devoluciones fuera de horario.",
      solution: "Responde al instante con tus políticas exactas, recomienda productos y captura los datos del cliente para derivarlo a ventas.",
      result: "Score automático 🔥 HOT para compradores reales. Menos abandonos, más cierres."
    },
    {
      icon: Building2,
      title: "Agencias y Servicios B2B",
      industry: "Servicios Profesionales",
      problem: "Pierdes horas respondiendo '¿cuánto cuesta?' a curiosos que no tienen presupuesto, mientras se te escapan clientes serios.",
      solution: "El asistente hace las preguntas clave, detecta si necesitan 'web avanzada' o 'sistema a medida' y califica la intención de compra.",
      result: "Tu equipo solo habla con leads calificados (🟡 WARM o 🔥 HOT). Ahorro de +12hs/semana."
    },
    {
      icon: Stethoscope,
      title: "Clínicas y Profesionales de la Salud",
      industry: "Salud & Bienestar",
      problem: "Pacientes preguntan lo mismo por mensaje: horarios, preparaciones, obras sociales. Querés atender, no ser un contestador.",
      solution: "Gestiona consultas pre-atención, responde con tus protocolos reales y deriva solo las urgencias o nuevas citas a tu agenda.",
      result: "Agenda ordenada, menos 'no-shows' y atención 24/7 sin esfuerzo."
    },
    {
      icon: Users,
      title: "Consultores, Coaches y Freelancers",
      industry: "Independientes",
      problem: "Tu tiempo es tu activo más valioso, pero lo gastás explicando tu metodología una y otra vez por WhatsApp.",
      solution: "Un asistente entrenado con TU voz y TU conocimiento que filtra, educa al prospecto y agenda la llamada de diagnóstico.",
      result: "+40% de leads calificados que llegan a la reunión listos para comprar."
    },
    {
      icon: Smartphone,
      title: "Desarrollo de Apps y Software",
      industry: "Tecnología",
      problem: "Los clientes llegan con ideas vagas y te roban tiempo en reuniones que no terminan en proyecto.",
      solution: "El bot detecta palabras clave como 'app móvil', 'ecommerce' o 'integración', calcula un score y pide los datos de contacto.",
      result: "Notificación instantánea a tu Telegram cuando entra un proyecto de alto valor."
    },
    {
      icon: Target,
      title: "Inmobiliarias",
      industry: "Real Estate",
      problem: "Cientos de mensajes preguntando '¿sigue disponible?' o '¿cuál es el precio?' que saturan tu WhatsApp.",
      solution: "Responde con los datos exactos de la propiedad, filtra entre inquilinos y compradores, y solicita los datos para la visita.",
      result: "Leads clasificados automáticamente. Tu equipo prioriza a los que tienen capacidad de compra."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-500/30 selection:text-amber-100">
      <ScrollProgressBar className="fixed top-0 left-0 right-0 z-50 w-full h-1.5 bg-gradient-to-r from-amber-500 to-violet-600" /> 
      <VisitTracker pageName="ia-estrategica-para-marcas" /> 

      {/* ==========================================
          HERO SECTION
      ========================================== */}
      <section className="container mx-auto px-6 py-20 md:py-28 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10">
          <div className="inline-block mb-6">
            <span className="px-5 py-2 bg-gradient-to-r from-amber-500 to-violet-600 text-black text-sm font-bold rounded-full flex items-center gap-2 mx-auto w-fit">
              <Zap size={16} /> No es un Chatbot. Es tu mejor Vendedor.
            </span>
          </div>
          
          <h1 className={`${playfair.className} text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight`}>
            Respondé al instante, califica leads <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-violet-500">y vendé mientras dormís.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Implementamos asistentes de IA entrenados <strong className="text-white">exclusivamente con tus datos</strong>. 
            Responden con precisión, filtran curiosos y te avisan a tu celular solo cuando entra un cliente real.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 mb-12">
            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> Cero alucinaciones (RAG estricto)</span>
            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> Scoring automático de leads</span>
            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> Alertas a Telegram/Email</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-violet-600 text-black font-bold text-lg rounded-xl hover:from-amber-400 hover:to-violet-500 transition-all duration-300 shadow-2xl hover:shadow-amber-500/30 transform hover:scale-105"
            >
              Quiero mi Diagnóstico Gratuito <ArrowRight size={20} />
            </a>
            <a
              href="#casos-reales"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white font-medium text-lg rounded-xl hover:bg-white/20 transition-all border border-white/20"
            >
              Ver cómo funciona
            </a>
          </div>

          {/* Micro-prueba social / Ejemplo rápido del Scoring */}
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-violet-900/30 to-amber-900/30 rounded-2xl p-6 border border-white/10 backdrop-blur-sm text-left">
            <p className="text-gray-300 text-sm md:text-base flex items-start gap-3">
              <Bot className="text-amber-400 flex-shrink-0 mt-1" size={20} />
              <span>
                <span className="text-amber-400 font-bold">Así trabaja:</span> Un cliente escribe a las 3 AM: <em>"Necesito una tienda online con 500 productos"</em>. 
                El asistente detecta "tienda online", asigna un <span className="text-red-400 font-bold">Score 8/10 (🔥 HOT)</span>, guarda los datos y te envía una alerta a Telegram en 1 segundo. 
                <span className="text-green-400 font-bold ml-2">→ Vos dormís, el sistema trabaja.</span>
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN: DOLOR (¿Te suena familiar?)
      ========================================== */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent to-gray-900/40">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">¿Te pasa esto todos los días?</h2>
          <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
            Si respondiste "sí" a alguna, estás dejando dinero sobre la mesa.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "¿Respondés las mismas preguntas de precios una y otra vez?",
              "¿Se te escapan clientes porque tardaste 1 hora en contestar?",
              "¿No sabés qué lead tiene presupuesto real y cuál solo mira?",
              "¿Tu equipo pierde tiempo valioso en consultas que no cierran?",
              "¿Querés escalar las ventas sin contratar más personal?",
              "¿Tu competencia responde más rápido que vos?"
            ].map((question, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-amber-500/30 transition-colors">
                <span className="text-amber-500 font-bold text-lg">→</span>
                <p className="text-gray-300 text-sm font-medium">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN: CASOS DE USO REALES
      ========================================== */}
      <section id="casos-reales" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="px-4 py-2 bg-violet-600/20 text-violet-400 text-sm font-medium rounded-full border border-violet-500/30 mb-4 inline-block">
              Tecnología Real · Resultados Medibles
            </span>
            <h2 className="text-4xl font-bold mb-6">IA aplicada a tu industria</h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
              No vendemos humo. Configuramos el asistente con <strong>tus precios, tus servicios y tus reglas</strong>. 
              Seleccioná tu escenario o <a href="/contact" className="text-amber-400 hover:underline font-medium">contanos el tuyo</a>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {useCases.map((caso, i) => (
              <UseCaseCard key={i} {...caso} />
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-6">¿Tu negocio es diferente? Lo adaptamos a tu flujo exacto.</p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition border border-white/20"
            >
              Contame tu situación <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN: CÓMO TRABAJAMOS
      ========================================== */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900/30 to-transparent border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Así funciona el sistema: Simple y Automático</h2>
            <p className="text-gray-400">Sin tecnicismos. Vos nos das la información, nosotros hacemos la magia.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: MessageSquare, step: "1", title: "Entrenamiento", desc: "Nos pasás tus PDFs, web o documentos. La IA aprende TU negocio, no uno genérico." },
              { icon: Target, step: "2", title: "Interacción 24/7", desc: "El asistente responde a tus clientes en tu web, usando solo tus datos reales (Cero alucinaciones)." },
              { icon: Zap, step: "3", title: "Scoring Automático", desc: "Analiza la conversación y califica al lead: 🔥 HOT, 🟡 WARM o 🟢 COLD según su potencial." },
              { icon: TrendingUp, step: "4", title: "Alerta Instantánea", desc: "Si es un buen lead, te llega una notificación a Telegram o Email para que cierres la venta." }
            ].map((item, i) => (
              <div key={i} className="text-center group relative">
                {i < 3 && <div className="hidden md:block absolute top-7 left-1/2 w-full h-0.5 bg-gradient-to-r from-amber-500/50 to-violet-600/50 -z-10"></div>}
                
                <div className="w-14 h-14 mx-auto bg-gradient-to-br from-amber-500 to-violet-600 rounded-2xl flex items-center justify-center text-black font-bold text-xl mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-amber-500/20">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN: RESULTADOS
      ========================================== */}
      <section className="py-20 px-6 bg-gradient-to-r from-violet-900/20 to-amber-900/20 border-t border-amber-500/10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Resultados que importan</h2>
          <p className="text-gray-400 mb-12 max-w-2xl mx-auto">
            No medimos "likes". Medimos lo que hace crecer tu caja.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-black/40 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-colors">
              <Clock className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <p className="text-4xl font-bold text-white mb-2">12h+</p>
              <p className="text-gray-300 font-medium">semanales recuperadas</p>
              <p className="text-gray-500 text-sm mt-2">Dejando de responder lo mismo una y otra vez</p>
            </div>
            <div className="p-6 bg-black/40 rounded-2xl border border-white/10 hover:border-violet-500/30 transition-colors">
              <Users className="w-8 h-8 text-violet-400 mx-auto mb-4" />
              <p className="text-4xl font-bold text-white mb-2">+40%</p>
              <p className="text-gray-300 font-medium">leads calificados</p>
              <p className="text-gray-500 text-sm mt-2">Porque el sistema filtra a los curiosos</p>
            </div>
            <div className="p-6 bg-black/40 rounded-2xl border border-white/10 hover:border-green-500/30 transition-colors">
              <CalendarCheck className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <p className="text-4xl font-bold text-white mb-2">15 días</p>
              <p className="text-gray-300 font-medium">para implementación total</p>
              <p className="text-gray-500 text-sm mt-2">Desde la primera llamada hasta que está vendiendo</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          CTA FINAL
      ========================================== */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-600/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Tu competencia sigue respondiendo manualmente. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-violet-500">Vos podés estar un paso adelante.</span>
          </h2>
          <p className="text-gray-300 text-lg mb-10">
            No necesitás saber de programación. Solo necesitás querer <strong>vender más, trabajar menos y crecer con inteligencia</strong>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-gradient-to-r from-amber-500 to-violet-600 text-black font-bold text-lg rounded-2xl hover:from-amber-400 hover:to-violet-500 transition-all duration-300 shadow-2xl transform hover:scale-105"
            >
              <Bot size={24} /> Agendar Diagnóstico Gratuito
            </a>
          </div>
          
          <div className="text-gray-500 text-sm space-y-2">
            <p className="flex items-center justify-center gap-2">
              <CheckCircle size={14} className="text-green-400" /> Sin compromiso 
              <span className="mx-2">•</span> 
              <CheckCircle size={14} className="text-green-400" /> 30 minutos 
              <span className="mx-2">•</span> 
              <CheckCircle size={14} className="text-green-400" /> Propuesta concreta al finalizar
            </p>
            <p className="text-amber-400/80 font-medium mt-4">
              🎁 Incluye: Auditoría express de 3 oportunidades de automatización para tu negocio
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          FOOTER MICRO-CTA STICKY (Móvil)
      ========================================== */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/95 backdrop-blur-md border-t border-white/10 md:hidden z-50">
        <a
          href="/contact"
          className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-amber-500 to-violet-600 text-black font-bold rounded-xl shadow-lg"
        >
          <Bot size={20} /> Quiero mi diagnóstico gratuito
        </a>
      </div>
    </div>
  );
}