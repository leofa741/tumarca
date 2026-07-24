'use client';

import { useState, useEffect } from 'react';
import { 
  MessageSquare, Clock, TrendingUp, ShieldCheck, 
  CheckCircle2, ArrowRight, Zap, Users, 
  BarChart3, Smartphone, ChevronDown, ChevronUp, X, Gift
} from 'lucide-react';

export default function AsistenteIAContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Mockup interactivo del chat para la sección de demo
  const [chatStep, setChatStep] = useState(0);
  const chatMessages = [
    { sender: 'user', text: 'Hola, ¿cuánto cuesta una web para mi e-commerce?' },
    { sender: 'bot', text: '¡Hola! 👋 Nuestros desarrollos E-commerce comienzan desde USD $2,000. Incluyen catálogo, carrito, pasarela de pago y panel de administración. ¿Te gustaría un presupuesto detallado?' },
    { sender: 'user', text: 'Sí, por favor. Mi email es juan@empresa.com' },
    { sender: 'bot', text: '✅ ¡Perfecto, Juan! Hemos registrado tu solicitud como 🔥 LEAD HOT. Un especialista te contactará por WhatsApp en menos de 2 horas.' }
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

    // Popup de salida
    useEffect(() => {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY < 10 && !showPopup && !submitted) {
          setShowPopup(true);
        }
      };
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }, [showPopup, submitted]);

     const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        window.open(`https://wa.me/5491141461312?text=Hola,%20quiero%20una%20demo%20del%20asistente%20IA.%20Mi%20email%20es%20${email}`, '_blank');
      }, 1500);
    }
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      setChatStep((prev) => (prev < chatMessages.length ? prev + 1 : 0));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
       {/* ==========================================
          POPUP DE SALIDA (Exit Intent)
      ========================================== */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md mx-4 relative shadow-2xl">
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">¡Esperá un momento!</h3>
              <p className="text-slate-400 mb-6">
                Dejá tu email y te enviamos una <strong className="text-white">guía gratuita</strong> con los 5 pasos para automatizar tu atención al cliente con IA.
              </p>
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  required
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all"
                >
                  {submitted ? '¡Enviado! Redirigiendo...' : 'Recibir Guía Gratis'}
                </button>
              </form>
              <p className="text-xs text-slate-600 mt-4">
                Sin spam. Podés darte de baja cuando quieras.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          SECCIÓN 1: HERO (Above the fold)
      ========================================== */}
      <section className="relative overflow-hidden bg-slate-950 pt-20 pb-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/40 via-slate-950 to-slate-950"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-8 backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              <span>Tecnología de IA aplicada a ventas reales</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-white">
              Tu mejor vendedor trabaja <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                24/7 y no pide vacaciones.
              </span>
            </h1>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Implementamos asistentes inteligentes que responden al instante, califican leads automáticamente (HOT/WARM/COLD) y agendan reuniones mientras tu equipo descansa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/5491141461312?text=Hola,%20quiero%20una%20demo%20del%20asistente%20IA" 
                target="_blank"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-0.5"
              >
                Solicitar Demo Gratuita
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a 
                href="#como-funciona"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-300 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 hover:text-white transition-all backdrop-blur-sm"
              >
                Ver cómo funciona
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 2: SOCIAL PROOF (Logos)
      ========================================== */}
      <section className="py-12 border-y border-slate-800 bg-slate-900/50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-8">
            Empresas que ya automatizan su atención con nosotros
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
            {['Style Boutique', 'El Horno de Oro', 'TechCorp S.A.', 'Pérez Consultores'].map((brand) => (
              <span key={brand} className="text-xl md:text-2xl font-bold text-slate-400 hover:text-slate-200 transition-colors">{brand}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 3: EL PROBLEMA (Agitación)
      ========================================== */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Cuántas oportunidades de venta se pierden en tu negocio?
            </h2>
            <p className="text-lg text-slate-400">
              La atención tradicional ya no alcanza para competir en el mercado actual.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Clock, title: "Respuestas tardías", desc: "El 67% de los clientes se va a la competencia si no recibe respuesta en los primeros 5 minutos." },
              { icon: Users, title: "Equipo saturado", desc: "Tu equipo pierde horas respondiendo las mismas preguntas frecuentes en lugar de cerrar ventas." },
              { icon: TrendingUp, title: "Leads sin calificar", desc: "Llegan consultas, pero no sabes quién tiene presupuesto real y quién solo está mirando." }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group">
                <div className="w-12 h-12 bg-red-500/10 text-red-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 4: LA SOLUCIÓN (Value Prop)
      ========================================== */}
      <section id="como-funciona" className="py-24 bg-slate-900/50 border-y border-slate-800">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                No es un chatbot. Es un <span className="text-indigo-400">experto en tu negocio</span>.
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                A diferencia de los bots tradicionales con árboles de decisión, nuestro asistente utiliza IA de última generación (RAG) entrenada exclusivamente con tus documentos, precios y casos de éxito.
              </p>
              <ul className="space-y-6">
                {[
                  "Respuestas 100% basadas en tus datos (Cero alucinaciones).",
                  "Scoring automático de Leads (HOT 🔥, WARM 🟡, COLD 🟢).",
                  "Notificaciones instantáneas a tu equipo por Telegram.",
                  "Integración nativa con tu sitio web."
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
                    <span className="text-lg text-slate-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Mockup Interactivo del Chat */}
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-20"></div>
              <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/20">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Asistente tumarca.ar</h4>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                      <span className="text-xs text-slate-400">En línea</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 min-h-[280px]">
                  {chatMessages.slice(0, chatStep).map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                        msg.sender === 'user' 
                          ? 'bg-indigo-600 text-white rounded-br-none' 
                          : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 5: CASOS DE USO (Segmentación)
      ========================================== */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Diseñado para tu industria</h2>
            <p className="text-lg text-slate-400">Adaptable a cualquier modelo de negocio que genere consultas.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "E-commerce", desc: "Responde sobre stock, envíos, medios de pago y recupera carritos abandonados.", icon: Smartphone },
              { title: "Servicios Profesionales", desc: "Agenda reuniones, filtra consultas por presupuesto y envía propuestas automáticas.", icon: BarChart3 },
              { title: "Inmobiliarias", desc: "Califica compradores vs. inquilinos, envía fichas de propiedades y coordina visitas.", icon: Users }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all group">
                <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                  <item.icon className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 6: COMPARATIVA (Us vs Them)
      ========================================== */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Dejá de usar bots que frustran a tus clientes</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="py-5 px-6 text-slate-400 font-semibold">Característica</th>
                  <th className="py-5 px-6 text-slate-500 font-semibold">Chatbots Tradicionales</th>
                  <th className="py-5 px-6 text-indigo-400 font-bold bg-indigo-500/5 rounded-tr-xl">Nuestro Asistente IA</th>
                </tr>
              </thead>
              <tbody className="text-slate-300">
                {[
                  ["Respuestas a preguntas no programadas", "❌ 'No entiendo tu pregunta'", "✅ Responde con contexto real de tu negocio"],
                  ["Calificación de Leads", "❌ Manual o inexistente", "✅ Automática (HOT / WARM / COLD)"],
                  ["Tiempo de implementación", "❌ Semanas de configuración", "✅ Días (solo subimos tus documentos)"],
                  ["Tono de conversación", "❌ Robótico y rígido", "✅ Natural, empático y profesional"],
                  ["Integración con Telegram", "❌ Costosa o compleja", "✅ Nativa y fluida"]
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-900/50 transition-colors">
                    <td className="py-5 px-6 font-medium text-white">{row[0]}</td>
                    <td className="py-5 px-6 text-slate-500">{row[1]}</td>
                    <td className="py-5 px-6 font-medium text-indigo-300 bg-indigo-500/5">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 7: RESULTADOS / TESTIMONIOS
      ========================================== */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Resultados que hablan por sí solos</h2>
              <p className="text-slate-400 text-lg mb-8">
                No solo implementamos tecnología, transformamos el embudo de ventas de nuestros clientes.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-4xl font-bold text-indigo-400 mb-2">+40%</div>
                  <div className="text-slate-400">Leads calificados mensuales</div>
                </div>
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-4xl font-bold text-indigo-400 mb-2">-60%</div>
                  <div className="text-slate-400">Tiempo de primera respuesta</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 relative shadow-xl">
              <div className="text-6xl text-indigo-500 absolute top-4 left-6 opacity-20 font-serif">"</div>
              <p className="text-lg text-slate-300 italic mb-6 relative z-10 pt-4 leading-relaxed">
                "Gracias a la tienda online y el asistente que desarrollaron, ahora vendemos en todo el país. La facturación online creció un 400% y el bot filtra el 80% de las consultas repetitivas."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">MG</div>
                <div>
                  <div className="font-semibold text-white">María González</div>
                  <div className="text-sm text-slate-500">Fundadora, Style Boutique</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 8: PREGUNTAS FRECUENTES (FAQ)
      ========================================== */}
      <section className="py-24 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Preguntas frecuentes</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "¿La IA puede inventar respuestas o precios erróneos?", a: "No. Utilizamos una arquitectura RAG (Retrieval-Augmented Generation) estricta. El asistente solo puede responder utilizando la información de los documentos, precios y políticas que tú nos proporcionas." },
              { q: "¿Cuánto tiempo tarda la implementación?", a: "Una vez que nos proporcionas la información de tu negocio (PDFs, webs, documentos), el sistema está configurado, probado y listo para instalarse en tu web en menos de 5 días hábiles." },
              { q: "¿Necesito saber de programación para usarlo?", a: "Absolutamente no. Nosotros nos encargamos de toda la configuración técnica, el entrenamiento del modelo y la integración en tu sitio web." },
              { q: "¿Se integra con mi Telegram?", a: "Sí. El sistema puede configurarse para enviar una notificación a tu Telegram cada vez que se registra un lead con calificación HOT o WARM." }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950 hover:border-slate-700 transition-colors">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left bg-slate-950 hover:bg-slate-900 transition-colors"
                >
                  <span className="font-semibold text-white text-lg">{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-5 h-5 text-indigo-400" /> : <ChevronDown className="w-5 h-5 text-slate-500" />}
                </button>
                {openFaq === idx && (
                  <div className="p-6 pt-0 text-slate-400 leading-relaxed border-t border-slate-800 bg-slate-900/30">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 9: GARANTÍA / RIESGO CERO
      ========================================== */}
      <section className="py-16 bg-indigo-950/20 border-y border-indigo-500/20">
        <div className="container mx-auto px-6 text-center">
          <ShieldCheck className="w-16 h-16 text-indigo-400 mx-auto mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Implementación sin riesgos</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Si después de la demostración y el período de prueba consideras que el asistente no aporta valor a tu flujo de ventas, no te cobramos nada. Así de simple.
          </p>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 10: CTA FINAL (The Closer)
      ========================================== */}
      <section className="py-24 bg-slate-950 text-center relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Dejá de perder ventas por no responder a tiempo.
          </h2>
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
            Agendá una demostración de 15 minutos. Te mostraremos el asistente funcionando con datos de TU propio negocio, no con ejemplos genéricos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://wa.me/5491141461312?text=Hola,%20vi%20la%20landing%20de%20IA%20y%20quiero%20agendar%20una%20demo%20para%20mi%20empresa" 
              target="_blank"
              className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/30 transform hover:-translate-y-1"
            >
              <MessageSquare className="mr-3 w-6 h-6" />
              Agendar Demo por WhatsApp
            </a>
            <p className="text-sm text-slate-500 mt-4 sm:mt-0">
              Respuesta garantizada en menos de 2 horas hábiles.
            </p>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-800 text-slate-600 text-sm">
            © {new Date().getFullYear()} tumarca.ar. Todos los derechos reservados. Buenos Aires, Argentina.
          </div>
        </div>
      </section>

    </div>
  );
}