'use client';

import { useState, useEffect } from 'react';
import { 
  MessageSquare, Clock, TrendingUp, ShieldCheck, 
  CheckCircle2, ArrowRight, Zap, Users, 
  BarChart3, Smartphone, ChevronDown, ChevronUp,
  Star, Play, Sparkles, ArrowUpRight, Phone,
  Calendar, Bot, Lock, Globe, ChevronRight,
  X
} from 'lucide-react';

export default function AsistenteIAContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [chatStep, setChatStep] = useState(0);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Demo interactiva del chat
  const chatMessages = [
    { sender: 'user', text: 'Hola, ¿cuánto cuesta una web para mi e-commerce?' },
    { sender: 'bot', text: '¡Hola! 👋 Nuestros desarrollos E-commerce comienzan desde USD $2,000. Incluyen catálogo, carrito, pasarela de pago y panel de administración. ¿Te gustaría un presupuesto detallado?' },
    { sender: 'user', text: 'Sí, por favor. Mi email es juan@empresa.com' },
    { sender: 'bot', text: '✅ ¡Perfecto, Juan! Hemos registrado tu solicitud como 🔥 LEAD HOT. Un especialista te contactará por WhatsApp en menos de 2 horas.' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setChatStep((prev) => (prev < chatMessages.length ? prev + 1 : 0));
    }, 2800);
    return () => clearInterval(interval);
  }, []);

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

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        window.open(`https://wa.me/5491141461312?text=Hola,%20quiero%20una%20demo%20del%20asistente%20IA.%20Mi%20email%20es%20${email}`, '_blank');
      }, 1500);
    }
  };

  const industries = [
    {
      title: "E-commerce",
      desc: "Responde sobre stock, envíos, medios de pago y recupera carritos abandonados automáticamente.",
      icon: Smartphone,
      stats: "+45% en recuperación de carritos",
      color: "from-violet-500 to-purple-600"
    },
    {
      title: "Servicios Profesionales",
      desc: "Agenda reuniones, filtra consultas por presupuesto y envía propuestas automáticas.",
      icon: BarChart3,
      stats: "+60% leads calificados",
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "Inmobiliarias",
      desc: "Califica compradores vs. inquilinos, envía fichas de propiedades y coordina visitas.",
      icon: Users,
      stats: "+35% visitas agendadas",
      color: "from-emerald-500 to-teal-600"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "USD 297",
      period: "/mes",
      description: "Para negocios que reciben hasta 50 consultas/mes",
      features: [
        "Asistente IA entrenado con tus documentos",
        "Calificación automática HOT/WARM/COLD",
        "Integración con tu sitio web",
        "Notificaciones por Telegram",
        "Panel de analytics básico",
        "Soporte por email"
      ],
      cta: "Empezar Ahora",
      popular: false
    },
    {
      name: "Pro",
      price: "USD 597",
      period: "/mes",
      description: "Para negocios en crecimiento con +100 consultas/mes",
      features: [
        "Todo lo de Starter",
        "Integración con WhatsApp Business",
        "CRM integrado",
        "Recuperación de carritos abandonados",
        "Múltiples idiomas",
        "Soporte prioritario 24/7",
        "API para integraciones custom"
      ],
      cta: "Elegir Pro",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Personalizado",
      period: "",
      description: "Para empresas con alto volumen y necesidades específicas",
      features: [
        "Todo lo de Pro",
        "Volumen ilimitado de conversaciones",
        "IA fine-tuneada para tu industria",
        "Integración con cualquier CRM",
        "SLA garantizado 99.9%",
        "Manager de cuenta dedicado",
        "Desarrollo de features a medida"
      ],
      cta: "Agendar Demo",
      popular: false
    }
  ];

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
          SECCIÓN 1: HERO (Above the fold) - REDISEÑADO
      ========================================== */}
      <section className="relative overflow-hidden bg-slate-950 pt-16 pb-20 md:pt-24 md:pb-32">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-cyan-600/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left: Copy */}
              <div className="text-center lg:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm font-medium mb-6 backdrop-blur-sm animate-pulse">
                  <Sparkles className="w-4 h-4" />
                  <span>Ya automatizaron su atención 47 empresas este mes</span>
                </div>
                
                {/* Headline - MÁS ESPECÍFICO Y ORIENTADO AL BENEFICIO */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-[1.1] text-white">
                  Convertí el 80% de tus consultas en{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                    ventas reales
                  </span>{" "}
                  mientras dormís
                </h1>
                
                {/* Subheadline - CÓMO LO HACE */}
                <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Asistente de IA que responde al instante, califica leads automáticamente (HOT/WARM/COLD) y agenda reuniones. Sin programación. En 5 días.
                </p>
                
                {/* CTA + Formulario de email (captura de leads) */}
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                  <a 
                    href="https://wa.me/5491141461312?text=Hola,%20quiero%20una%20demo%20del%20asistente%20IA" 
                    target="_blank"
                    className="inline-flex items-center justify-center px-6 py-4 text-base font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:-translate-y-0.5"
                  >
                    <Phone className="mr-2 w-5 h-5" />
                    Agendar Demo Gratis (15 min)
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </a>
                </div>
                
                {/* Trust signals debajo del CTA */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Sin tarjeta de crédito
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Demo con datos de TU negocio
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Respuesta en &lt;2 horas
                  </span>
                </div>
              </div>

              {/* Right: Demo Interactiva del Chat */}
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-2xl blur opacity-20 animate-pulse"></div>
                <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl overflow-hidden">
                  {/* Header del chat */}
                  <div className="flex items-center gap-3 mb-5 border-b border-slate-800 pb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-indigo-600/20">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">Asistente IA</h4>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        <span className="text-xs text-slate-400">En línea · Responde en &lt;1s</span>
                      </div>
                    </div>
                    <div className="ml-auto flex gap-1">
                      <span className="w-2 h-2 bg-slate-700 rounded-full"></span>
                      <span className="w-2 h-2 bg-slate-700 rounded-full"></span>
                      <span className="w-2 h-2 bg-slate-700 rounded-full"></span>
                    </div>
                  </div>
                  
                  {/* Mensajes */}
                  <div className="space-y-3 min-h-[240px]">
                    {chatMessages.slice(0, chatStep).map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                        <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                          msg.sender === 'user' 
                            ? 'bg-indigo-600 text-white rounded-br-none' 
                            : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none'
                        }`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {chatStep > 0 && chatStep < chatMessages.length && (
                      <div className="flex justify-start">
                        <div className="bg-slate-800 rounded-2xl rounded-bl-none px-4 py-2.5">
                          <div className="flex gap-1">
                            <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                            <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                            <span className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input simulado */}
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 rounded-xl border border-slate-800">
                      <span className="text-slate-600 text-sm">Escribí tu consulta...</span>
                      <div className="ml-auto w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                        <ArrowUpRight className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Badge flotante */}
                <div className="absolute -bottom-3 -right-3 bg-emerald-500/10 border border-emerald-500/30 backdrop-blur-md rounded-xl px-4 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span className="text-xs font-semibold text-emerald-300">Lead HOT detectado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 2: SOCIAL PROOF (Logos + Stats)
      ========================================== */}
      <section className="py-10 border-y border-slate-800 bg-slate-900/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-4 gap-8 items-center">
            <div className="text-center md:text-left">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Empresas que confían
              </p>
            </div>
            <div className="md:col-span-3 flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-8">
              {[
                { name: 'Style Boutique', since: '2023' },
                { name: 'El Horno de Oro', since: '2024' },
                { name: 'TechCorp S.A.', since: '2023' },
                { name: 'Pérez Consultores', since: '2024' }
              ].map((brand) => (
                <div key={brand.name} className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                  <span className="text-lg md:text-xl font-bold text-slate-300">{brand.name}</span>
                  <span className="text-xs text-slate-600 bg-slate-800 px-2 py-0.5 rounded-full">Cliente desde {brand.since}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 3: RESULTADOS CLAVE (Antes del problema)
      ========================================== */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { value: "+40%", label: "Leads calificados", sub: "mensuales promedio" },
              { value: "-60%", label: "Tiempo de respuesta", sub: "de horas a segundos" },
              { value: "24/7", label: "Atención automática", sub: "sin días libres" },
              { value: "5 días", label: "Implementación", sub: "desde el primer contacto" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-4">
                <div className="text-3xl md:text-4xl font-bold text-indigo-400 mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-white mb-0.5">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 4: EL PROBLEMA (Agitación)
      ========================================== */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Cuántas ventas se escapan mientras tu equipo duerme?
            </h2>
            <p className="text-lg text-slate-400">
              La atención tradicional ya no alcanza para competir. Estos son los 3 problemas que te crecen facturación cada mes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { 
                icon: Clock, 
                title: "Respuestas tardías", 
                stat: "67%",
                desc: "de los clientes se va a la competencia si no recibe respuesta en los primeros 5 minutos." 
              },
              { 
                icon: Users, 
                title: "Equipo saturado", 
                stat: "80%",
                desc: "del tiempo de tu equipo se pierde respondiendo preguntas repetitivas en lugar de cerrar ventas." 
              },
              { 
                icon: TrendingUp, 
                title: "Leads sin calificar", 
                stat: "60%",
                desc: "de las consultas son de curiosos sin presupuesto. Tu equipo pierde horas filtrando manualmente." 
              }
            ].map((item, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-red-500/30 hover:shadow-xl hover:shadow-red-500/5 transition-all group">
                <div className="text-4xl font-bold text-red-400/20 mb-2 group-hover:text-red-400/40 transition-colors">{item.stat}</div>
                <div className="w-10 h-10 bg-red-500/10 text-red-400 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 5: LA SOLUCIÓN (Value Prop)
      ========================================== */}
      <section id="como-funciona" className="py-20 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-6">
                <Zap className="w-3 h-3" />
                <span>La diferencia con un chatbot común</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white leading-tight">
                No es un chatbot. Es un{" "}
                <span className="text-indigo-400">vendedor digital</span>{" "}
                entrenado exclusivamente en tu negocio.
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                A diferencia de los bots con árboles de decisión, nuestro asistente usa IA de última generación (RAG) alimentada con tus documentos, precios y casos de éxito. Responde como si fuera parte de tu equipo.
              </p>
              <ul className="space-y-5">
                {[
                  { icon: CheckCircle2, text: "Respuestas 100% basadas en tus datos (cero alucinaciones)", color: "text-indigo-400" },
                  { icon: CheckCircle2, text: "Scoring automático de Leads (HOT 🔥, WARM 🟡, COLD 🟢)", color: "text-indigo-400" },
                  { icon: CheckCircle2, text: "Notificaciones instantáneas a tu equipo por Telegram", color: "text-indigo-400" },
                  { icon: CheckCircle2, text: "Integración nativa con tu sitio web en minutos", color: "text-indigo-400" },
                  { icon: CheckCircle2, text: "Aprende y mejora con cada conversación", color: "text-indigo-400" }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <item.icon className={`w-5 h-5 ${item.color} flex-shrink-0 mt-0.5`} />
                    <span className="text-slate-300">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Visual: Cómo funciona en 3 pasos */}
            <div className="space-y-4">
              {[
                { 
                  step: "01", 
                  title: "Nos enviás tu info", 
                  desc: "Subís PDFs, precios, FAQs y cualquier documento de tu negocio. Nosotros entrenamos el modelo.",
                  icon: Globe
                },
                { 
                  step: "02", 
                  title: "Configuramos el asistente", 
                  desc: "En 3-5 días hábiles tenés tu asistente listo, probado y personalizado con tu tono de marca.",
                  icon: Bot
                },
                { 
                  step: "03", 
                  title: "Empezás a convertir", 
                  desc: "Lo instalamos en tu web y empezás a recibir leads calificados en tiempo real.",
                  icon: TrendingUp
                }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/30 transition-all group">
                  <div className="flex-shrink-0 w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center group-hover:bg-indigo-500/20 transition-colors">
                    <item.icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-indigo-400 mb-1">PASO {item.step}</div>
                    <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 6: CASOS DE USO (Segmentación Interactiva)
      ========================================== */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Diseñado para tu industria</h2>
            <p className="text-lg text-slate-400">Seleccioná tu rubro y descubrí cómo funciona para vos.</p>
          </div>
          
          {/* Tabs */}
          <div className="flex justify-center gap-2 mb-10 flex-wrap">
            {industries.map((ind, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndustry(idx)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  activeIndustry === idx 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25' 
                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
                }`}
              >
                {ind.title}
              </button>
            ))}
          </div>
          
          {/* Content */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center p-8 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${industries[activeIndustry].color} bg-opacity-10 text-white text-xs font-medium mb-4`}>
                  <Star className="w-3 h-3" />
                  <span>Resultado verificado: {industries[activeIndustry].stats}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{industries[activeIndustry].title}</h3>
                <p className="text-slate-400 leading-relaxed mb-6">{industries[activeIndustry].desc}</p>
                <a 
                  href="https://wa.me/5491141461312?text=Hola,%20quiero%20ver%20cómo%20funciona%20para%20mi%20industria"
                  target="_blank"
                  className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
                >
                  Ver demo para {industries[activeIndustry].title}
                  <ChevronRight className="ml-1 w-4 h-4" />
                </a>
              </div>
              <div className={`w-full h-48 rounded-xl bg-gradient-to-br ${industries[activeIndustry].color} opacity-20 flex items-center justify-center`}>
                {(() => {
                  const Icon = industries[activeIndustry].icon;
                  return <Icon className="w-16 h-16 text-white/40" />;
                })()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 7: COMPARATIVA (Us vs Them)
      ========================================== */}
      <section className="py-20 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              ¿Por qué nuestros clientes dejaron los chatbots tradicionales?
            </h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900/50">
                  <th className="py-4 px-5 text-slate-400 font-semibold text-sm">Característica</th>
                  <th className="py-4 px-5 text-slate-500 font-semibold text-sm">Chatbots Tradicionales</th>
                  <th className="py-4 px-5 text-indigo-400 font-bold bg-indigo-500/5 text-sm">Nuestro Asistente IA</th>
                </tr>
              </thead>
              <tbody className="text-slate-300 text-sm">
                {[
                  ["Respuestas a preguntas no programadas", "❌ 'No entiendo tu pregunta'", "✅ Responde con contexto real de tu negocio"],
                  ["Calificación de Leads", "❌ Manual o inexistente", "✅ Automática (HOT / WARM / COLD)"],
                  ["Tiempo de implementación", "❌ Semanas de configuración", "✅ 3-5 días hábiles"],
                  ["Tono de conversación", "❌ Robótico y rígido", "✅ Natural, empático y profesional"],
                  ["Integración con Telegram/WhatsApp", "❌ Costosa o compleja", "✅ Nativa y fluida"],
                  ["Aprendizaje continuo", "❌ Estático", "✅ Mejora con cada conversación"]
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-900/50 transition-colors">
                    <td className="py-4 px-5 font-medium text-white">{row[0]}</td>
                    <td className="py-4 px-5 text-slate-500">{row[1]}</td>
                    <td className="py-4 px-5 font-medium text-indigo-300 bg-indigo-500/5">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 8: PRECIOS (NUEVO - Crítico para conversión)
      ========================================== */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Planes transparentes, sin sorpresas</h2>
            <p className="text-lg text-slate-400">Elegí el que se adapte a tu volumen de consultas.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <div 
                key={idx} 
                className={`relative p-6 rounded-2xl border transition-all ${
                  plan.popular 
                    ? 'bg-slate-900 border-indigo-500/50 shadow-xl shadow-indigo-500/10 scale-105 z-10' 
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full">
                    MÁS ELEGIDO
                  </div>
                )}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-xs text-slate-500">{plan.description}</p>
                </div>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-500 text-sm">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://wa.me/5491141461312?text=Hola,%20quiero%20contratar%20el%20plan%20${plan.name}"
                  target="_blank"
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${
                    plan.popular
                      ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/25'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          
          <p className="text-center text-sm text-slate-500 mt-8">
            <Lock className="w-3 h-3 inline mr-1" />
            Pagos seguros · Cancelá cuando quieras · Sin permanencia
          </p>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 9: RESULTADOS / TESTIMONIOS
      ========================================== */}
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Resultados que hablan por sí solos</h2>
              <p className="text-slate-400 text-lg mb-8">
                No solo implementamos tecnología, transformamos el embudo de ventas de nuestros clientes.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "+40%", label: "Leads calificados", sub: "mensuales" },
                  { value: "-60%", label: "Tiempo de respuesta", sub: "promedio" },
                  { value: "400%", label: "Crecimiento en ventas", sub: "online" },
                  { value: "80%", label: "Consultas filtradas", sub: "automáticamente" }
                ].map((stat, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-3xl font-bold text-indigo-400 mb-1">{stat.value}</div>
                    <div className="text-sm font-medium text-white">{stat.label}</div>
                    <div className="text-xs text-slate-500">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Testimonio con estrellas */}
            <div className="bg-slate-900 p-8 rounded-2xl border border-slate-800 relative shadow-xl">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div className="text-5xl text-indigo-500 absolute top-4 left-6 opacity-10 font-serif">"</div>
              <p className="text-lg text-slate-300 italic mb-6 relative z-10 leading-relaxed">
                "Gracias a la tienda online y el asistente que desarrollaron, ahora vendemos en todo el país. La facturación online creció un 400% y el bot filtra el 80% de las consultas repetitivas."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">MG</div>
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
          SECCIÓN 10: PREGUNTAS FRECUENTES (FAQ)
      ========================================== */}
      <section className="py-20 bg-slate-900/30 border-y border-slate-800">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Preguntas frecuentes</h2>
            <p className="text-slate-400">Todo lo que necesitás saber antes de empezar.</p>
          </div>
          <div className="space-y-3">
            {[
              { q: "¿La IA puede inventar respuestas o precios erróneos?", a: "No. Utilizamos una arquitectura RAG (Retrieval-Augmented Generation) estricta. El asistente solo puede responder utilizando la información de los documentos, precios y políticas que tú nos proporcionas. Cero alucinaciones garantizado." },
              { q: "¿Cuánto tiempo tarda la implementación?", a: "Una vez que nos proporcionas la información de tu negocio (PDFs, webs, documentos), el sistema está configurado, probado y listo para instalarse en tu web en menos de 5 días hábiles." },
              { q: "¿Necesito saber de programación para usarlo?", a: "Absolutamente no. Nosotros nos encargamos de toda la configuración técnica, el entrenamiento del modelo y la integración en tu sitio web. Vos solo tenés que responder cuando te llegue una notificación de lead HOT." },
              { q: "¿Se integra con mi Telegram o WhatsApp?", a: "Sí. El sistema puede configurarse para enviar notificaciones a tu Telegram cada vez que se registra un lead con calificación HOT o WARM. También disponemos de integración con WhatsApp Business." },
              { q: "¿Y si no me gusta después de probarlo?", a: "Ofrecemos una garantía de 14 días. Si durante ese período considerás que el asistente no aporta valor, te devolvemos el 100% de tu inversión. Sin preguntas." }
            ].map((faq, idx) => (
              <div key={idx} className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950 hover:border-slate-700 transition-colors">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-5 text-left bg-slate-950 hover:bg-slate-900 transition-colors"
                >
                  <span className="font-semibold text-white text-base pr-4">{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-5 h-5 text-indigo-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-500 flex-shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-slate-400 leading-relaxed border-t border-slate-800 bg-slate-900/30 text-sm">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 11: GARANTÍA / RIESGO CERO
      ========================================== */}
      <section className="py-16 bg-indigo-950/20 border-y border-indigo-500/20">
        <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
          <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-8 h-8 text-indigo-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Garantía de 14 días o te devolvemos tu dinero</h2>
          <p className="text-lg text-slate-400">
            Si después de la implementación y el período de prueba considerás que el asistente no aporta valor a tu flujo de ventas, te reembolsamos el 100%. Sin letra chica, sin preguntas.
          </p>
        </div>
      </section>

      {/* ==========================================
          SECCIÓN 12: CTA FINAL (The Closer)
      ========================================== */}
      <section className="py-20 bg-slate-950 text-center relative overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto px-4 md:px-6 max-w-4xl relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Dejá de perder ventas por no responder a tiempo.
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Agendá una demostración de 15 minutos. Te mostraremos el asistente funcionando con datos de <strong className="text-white">TU propio negocio</strong>, no con ejemplos genéricos.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a 
              href="https://wa.me/5491141461312?text=Hola,%20vi%20la%20landing%20de%20IA%20y%20quiero%20agendar%20una%20demo%20para%20mi%20empresa" 
              target="_blank"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/30 transform hover:-translate-y-1"
            >
              <Calendar className="mr-3 w-5 h-5" />
              Agendar Demo por WhatsApp
            </a>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Demo personalizada con tus datos
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Sin compromiso
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Respuesta en &lt;2 horas hábiles
            </span>
          </div>
          
          <div className="mt-16 pt-8 border-t border-slate-800 text-slate-600 text-sm">
            © {new Date().getFullYear()} tumarca.ar. Todos los derechos reservados. Buenos Aires, Argentina.
          </div>
        </div>
      </section>

    </div>
  );
}

// Componente Gift para el popup
function Gift({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  );
}