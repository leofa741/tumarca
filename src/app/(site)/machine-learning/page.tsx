'use client';


import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion";
import {
  ArrowRight, Sparkles, CheckCircle, TrendingUp, Shield, Zap,
  Brain, AlertTriangle, BarChart3, MessageSquare, Users, Rocket
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import VisitTracker from '@/app/(marketing)/components/VisitTracker';


// Animaciones reutilizables
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 }
  }
};

const scaleIn: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } }
};

const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

// Componente de partículas SSR-safe
function ParticleBackground({ count = 20 }: { count?: number }) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; duration: number; delay: number }>>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setParticles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 5
      }))
    );
  }, [count]);

  if (!isClient) return null;

  return (
    <>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          style={{ 
            left: `${p.x}%`, 
            top: `${p.y}%`,
            willChange: "transform, opacity"
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </>
  );
}

export default function MLForBusinessPage() {
  const { scrollYProgress } = useScroll();
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const [activeStep, setActiveStep] = useState(0);

  const heroRef = useRef<HTMLElement>(null);
  const storytellingRef = useRef<HTMLElement>(null);
  const benefitsRef = useRef<HTMLElement>(null);

  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px" });
  const isStorytellingInView = useInView(storytellingRef, { once: true });
  const isBenefitsInView = useInView(benefitsRef, { once: true });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = scrollYProgress.get();
      if (scrollPercent > 0.2 && scrollPercent <= 0.4) setActiveStep(1);
      else if (scrollPercent > 0.4 && scrollPercent <= 0.6) setActiveStep(2);
      else if (scrollPercent > 0.6) setActiveStep(3);
      else setActiveStep(0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollYProgress]);

  const benefits = [
    {
      icon: TrendingUp,
      title: "📈 Previsión inteligente de operaciones",
      desc: "Anticipe necesidades de inventario, recursos humanos, mantenimiento o ventas — en cualquier industria.",
      metric: "Reducción de costos operativos: 20–35%",
      color: "from-blue-500 to-cyan-500",
      delay: 0.2
    },
    {
      icon: Users,
      title: "👥 Comprensión profunda del cliente",
      desc: "Identifique patrones de comportamiento, riesgo de abandono y oportunidades de upsell — incluso en B2B.",
      metric: "Retención mejorada en un 25% en clientes clave",
      color: "from-emerald-500 to-teal-500",
      delay: 0.3
    },
    {
      icon: Zap,
      title: "⚙️ Optimización de recursos y costos",
      desc: "Desde rutas logísticas hasta asignación de turnos o uso de energía: maximice eficiencia con modelos predictivos.",
      metric: "Ahorro promedio en logística: 18%",
      color: "from-orange-500 to-amber-500",
      delay: 0.4
    },
    {
      icon: AlertTriangle,
      title: "🚨 Alertas inteligentes y toma proactiva",
      desc: "Reciba avisos automáticos sobre desviaciones, fraudes operativos o caídas en rendimiento antes de que se conviertan en crisis.",
      metric: "Tiempo de respuesta a incidentes: -60%",
      color: "from-purple-500 to-pink-500",
      delay: 0.5
    }
  ];

  const processSteps = [
    { num: 1, title: "Diagnóstico", desc: "Analizamos sus datos, sistemas y objetivos de negocio.", color: "blue" },
    { num: 2, title: "Estrategia", desc: "Diseñamos una arquitectura de datos unificada y clara.", color: "cyan" },
    { num: 3, title: "Modelos ML a medida", desc: "Desarrollamos algoritmos específicos para su industria, datos y objetivos.", color: "emerald" },
    { num: 4, title: "Capacitación", desc: "Formamos a su equipo para aprovechar la nueva ventaja competitiva.", color: "amber" }
  ];

  const sectors = [
    "Retail y e-commerce", "Logística y transporte", "Manufactura",
    "Servicios financieros", "Salud y farmacias", "Agronegocios",
    "Energía y utilities", "PYMEs con operaciones repetitivas"
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-x-hidden">
      
      {/* Background premium animado */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div 
          style={{ y: yBackground }}
          className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "40%"]) }}
          className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-teal-500/10 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
        <ParticleBackground count={20} />
      </div>

      {/* Scroll Progress Bar Premium */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative container mx-auto px-6 py-20 md:py-32 lg:py-40">
        <VisitTracker pageName="machine-learning" />
        
        <motion.div 
          className="max-w-5xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500/10 border border-blue-500/30 rounded-full mb-8 mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isHeroInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Brain className="text-blue-400" size={18} />
            <span className="text-blue-300 text-sm font-medium">IA aplicada a resultados de negocio</span>
          </motion.div>

          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            Machine Learning para{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-300 to-teal-300">
              Negocios Reales
            </span>
            <br />
            <span className="text-gray-400 font-normal text-xl md:text-2xl block mt-3">
              Decida con datos, no con corazonadas.
            </span>
          </motion.h1>

          <motion.p 
            className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            Ayudamos a <strong className="text-white">PYMEs y empresas de cualquier sector</strong> a implementar inteligencia artificial que reduzca costos, aumente ventas y mejore la eficiencia operativa — sin tecnicismos innecesarios.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold text-lg rounded-2xl hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              📊 Solicitar Análisis
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <a
              href="#proceso"
              className="inline-flex items-center gap-2 px-6 py-4 border border-white/20 rounded-2xl text-white/90 hover:bg-white/5 transition-all duration-300"
            >
              Ver cómo trabajamos
            </a>
          </motion.div>

          <motion.div 
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={isHeroInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-400" size={16} />
              <span>Modelos explicables</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-400" size={16} />
              <span>ROI medido mes a mes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-400" size={16} />
              <span>Integración con sus sistemas</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* STORYTELLING EMOCIONAL */}
      <motion.section 
        ref={storytellingRef}
        className="relative max-w-4xl mx-auto px-6 py-16 mb-20"
        initial={{ opacity: 0, y: 40 }}
        animate={isStorytellingInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30 rounded-3xl p-8 md:p-12 border border-blue-500/20 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />
          
          <div className="relative z-10 text-center">
            <Sparkles className="mx-auto text-blue-400 mb-6" size={40} />
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-8">Imagina esto...</h2>
            
            <div className="space-y-4 text-lg leading-relaxed">
              {[
                { text: "Sabes cuándo un cliente está a punto de irse — y actúas antes.", highlight: true },
                { text: "Optimizas tus rutas de entrega y reduces costos logísticos semana a semana.", highlight: false },
                { text: "Tus equipos saben qué hacer, cuándo y por qué — porque los datos les dicen cómo.", highlight: true },
                { text: "Y tú... lideras con claridad, porque cada decisión está respaldada por evidencia.", highlight: true }
              ].map((item, i) => (
                <motion.p 
                  key={i}
                  className={`${item.highlight ? 'text-white' : 'text-gray-300'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isStorytellingInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.15 }}
                >
                  {item.highlight && <strong className="text-blue-300">→ </strong>}
                  {item.text}
                </motion.p>
              ))}
            </div>
            
            <motion.p 
              className="italic text-gray-400 mt-8"
              initial={{ opacity: 0 }}
              animate={isStorytellingInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.9 }}
            >
              Eso no es ciencia ficción. Es lo que logran nuestros clientes cada día.
            </motion.p>
          </div>
        </div>
      </motion.section>

      {/* BENEFICIOS */}
      <section ref={benefitsRef} className="relative container mx-auto px-6 py-16 mb-24">
        <motion.h2 
          className="text-2xl md:text-4xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          ¿Qué logrará su negocio con{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">
            Machine Learning?
          </span>
        </motion.h2>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {benefits.map((benefit, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="group relative"
            >
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${benefit.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg`} />
              
              <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-7 border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1">
                <motion.div 
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  whileHover={{ rotate: 5 }}
                >
                  <benefit.icon className="text-white" size={28} />
                </motion.div>

                <h3 className="text-white font-semibold text-xl mb-3 group-hover:text-blue-300 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  {benefit.desc}
                </p>
                
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full">
                  <BarChart3 className="text-blue-400" size={14} />
                  <span className="text-blue-300 text-xs font-medium">{benefit.metric}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ERRORES COMUNES */}
      <section className="relative container mx-auto px-6 py-16 mb-24">
        <motion.div 
          className="max-w-5xl mx-auto bg-gradient-to-br from-red-900/20 to-gray-900 rounded-3xl p-8 md:p-12 border border-red-500/20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-white text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            ❌ Lo que la mayoría hace mal{" "}
            <span className="text-gray-400 font-normal">(y tú puedes evitar)</span>
          </motion.h2>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-6"
          >
            {[
              { icon: AlertTriangle, title: "Comprar herramientas sin estrategia", desc: "Plataformas caras que nadie usa o que no se integran con sus datos reales. Terminan como 'elefantes blancos' tecnológicos." },
              { icon: BarChart3, title: "Confundir datos con inteligencia", desc: "Tener dashboards no significa tener insights accionables. Nosotros convertimos datos en decisiones concretas." },
              { icon: Users, title: "Ignorar la cultura de datos", desc: "El ML fracasa si el equipo no entiende cómo usarlo. Nosotros capacitamos y acompañamos en la adopción real." },
              { icon: TrendingUp, title: "No medir el ROI del proyecto", desc: "Si no sabes cuánto te está generando, no sabes si vale la pena. Nosotros definimos KPIs claros desde el día 1." }
            ].map((error, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 hover:border-red-500/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <error.icon className="text-red-400 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-white mb-2">{error.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{error.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* PROCESO */}
      <section id="proceso" className="relative container mx-auto px-6 py-16 mb-24">
        <motion.h2 
          className="text-2xl md:text-4xl font-bold text-white text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Nuestro proceso de implementación{" "}
          <span className="text-gray-400 font-normal">(Sin sorpresas)</span>
        </motion.h2>

        <div className="max-w-5xl mx-auto">
          <div className="hidden md:block absolute left-1/2 top-20 bottom-20 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-teal-500 -translate-x-1/2" />
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-4 gap-6 relative"
          >
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                variants={fadeInUp}
                className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                  activeStep >= i 
                    ? 'bg-gradient-to-br from-white/10 to-white/5 border-blue-500/50' 
                    : 'bg-white/5 border-white/10'
                }`}
              >
                <motion.div 
                  className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center font-bold text-lg mb-4 ${
                    activeStep >= i 
                      ? `bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 text-white` 
                      : 'bg-white/10 text-gray-400'
                  }`}
                  animate={activeStep === i ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {step.num}
                </motion.div>

                <h4 className={`font-semibold text-lg mb-2 text-center ${activeStep >= i ? 'text-white' : 'text-gray-400'}`}>
                  {step.title}
                </h4>
                <p className="text-gray-400 text-sm text-center leading-relaxed">
                  {step.desc}
                </p>

                {activeStep === i && (
                  <motion.div 
                    className="absolute -top-2 -right-2 w-3 h-3 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* PRUEBA SOCIAL + TESTIMONIO */}
      <section className="relative container mx-auto px-6 py-16 mb-24">
        <motion.div 
          className="max-w-5xl mx-auto bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl p-8 md:p-12 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-white"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              ¿Por qué empresas como tú ya están usando nuestro ML?
            </motion.h2>
            <motion.p 
              className="text-gray-400 mt-4 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              Porque no vendemos algoritmos. Vendemos{" "}
              <strong className="text-white">resultados tangibles</strong>.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                { icon: Brain, title: "Modelos entrenados con tus datos reales", desc: "No usamos plantillas genéricas. Todo se adapta a tu operación, clientes y canales." },
                { icon: Shield, title: "Explicabilidad y control total", desc: "Sabrás por qué el sistema recomienda algo. Sin 'cajas negras'." },
                { icon: TrendingUp, title: "ROI medido mes a mes", desc: "Te mostramos cuánto estás ganando (o ahorrando) gracias a cada modelo implementado." }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={slideInLeft}
                  className="flex items-start gap-4"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0`}>
                    <item.icon className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <strong className="text-white block mb-1">{item.title}</strong>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={slideInRight}
              className="bg-gradient-to-br from-blue-900/30 to-teal-900/20 rounded-2xl p-6 border border-blue-500/20"
            >
              <blockquote className="text-gray-300 italic leading-relaxed mb-6">
                "Implementamos el sistema de alertas predictivas en nuestra operación logística y{" "}
                <strong className="text-white">redujimos un 37% los retrasos en entregas</strong>. 
                El modelo se entrena semanalmente con nuestros datos reales."
              </blockquote>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-black font-bold">
                  ML
                </div>
                <div>
                  <p className="text-white font-semibold">Martina L.</p>
                  <p className="text-gray-500 text-sm">Directora de Operaciones • Distribuidora Andina S.A.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* PLATAFORMA WEB */}
      <section className="relative container mx-auto px-6 py-16 mb-24">
        <motion.div 
          className="max-w-5xl mx-auto bg-gradient-to-br from-blue-900/30 to-teal-900/20 rounded-3xl p-8 md:p-12 border border-blue-500/30"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-2xl md:text-3xl font-bold text-white text-center mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            ¿Cómo se ve un modelo de ML a medida en su día a día?
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 text-lg text-center mb-10 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Todo se gestiona desde una{" "}
            <strong className="text-white">plataforma web intuitiva</strong>, 
            accesible desde cualquier dispositivo. Sin instalaciones. Sin tecnicismos. 
            Solo decisiones inteligentes.
          </motion.p>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div 
              variants={fadeInUp}
              className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-blue-500/50 transition-colors"
            >
              <h3 className="font-semibold text-xl mb-4 flex items-center gap-3 text-white">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">🖥️</span>
                Dashboards explicables
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                No son solo gráficos bonitos. Cada recomendación incluye:
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Qué hacer", example: '"Reponer 45 unidades del SKU-882"' },
                  { label: "Por qué", example: '"Demanda esperada +72% por feriado local"' },
                  { label: "Impacto estimado", example: '"+18% en ventas si actúas hoy"' }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400">
                    <CheckCircle className="text-green-400 mt-0.5 flex-shrink-0" size={14} />
                    <span><strong className="text-gray-300">{item.label}:</strong> {item.example}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700 hover:border-teal-500/50 transition-colors"
            >
              <h3 className="font-semibold text-xl mb-4 flex items-center gap-3 text-white">
                <span className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center">🔔</span>
                Alertas por correo o WhatsApp
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Cuando algo requiere acción inmediata,{" "}
                <strong className="text-white">usted recibe una notificación directa</strong>:
              </p>
              <ul className="space-y-2 text-sm">
                {[
                  '"Cliente X está en riesgo → enviar oferta ahora"',
                  '"Ruta ineficiente → ahorraría 2.1 horas con ajuste"',
                  '"Inventario crítico → reponer antes de las 10 AM"'
                ].map((alert, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-400">
                    <MessageSquare className="text-teal-400 mt-0.5 flex-shrink-0" size={14} />
                    <span>{alert}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          <motion.p 
            className="mt-10 text-center text-gray-400 italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <strong className="text-gray-300">Nada se queda en "la nube técnica".</strong>{" "}
            Todo está diseñado para que su equipo <em>actúe</em>, no solo para que mire datos.
          </motion.p>
        </motion.div>
      </section>

      {/* SECTORES */}
      <section className="relative container mx-auto px-6 py-12 mb-20">
        <motion.h2 
          className="text-2xl font-bold text-white text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Este enfoque funciona para:
        </motion.h2>
        
        <motion.div 
          className="flex flex-wrap justify-center gap-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {sectors.map((sector) => (
            <motion.span
              key={sector}
              variants={scaleIn}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
              className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300 hover:text-white hover:border-blue-500/50 transition-all cursor-default"
            >
              {sector}
            </motion.span>
          ))}
        </motion.div>
      </section>

      {/* GARANTÍA */}
      <section className="relative container mx-auto px-6 py-16 mb-20">
        <motion.div 
          className="max-w-4xl mx-auto bg-gradient-to-br from-green-900/20 to-gray-900 rounded-3xl p-8 md:p-12 border border-green-500/20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 mb-6"
          >
            <CheckCircle className="text-green-400" size={32} />
          </motion.div>
          
          <h2 className="text-2xl font-bold text-white mb-4">
            ✅ Tu inversión está protegida
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Si en los primeros 60 días no ves mejoras medibles en los KPIs acordados, 
            ajustamos el modelo sin costo adicional.
          </p>
          <motion.p 
            className="text-white font-semibold mt-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Sin excusas. Sin riesgo.
          </motion.p>
        </motion.div>
      </section>

      {/* CTA FINAL */}
      <section className="relative container mx-auto px-6 py-20 mb-16">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Rocket className="mx-auto text-blue-400 mb-6" size={48} />
          
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
            ¿Su negocio genera datos?{" "}
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">
              Entonces puede transformarse con Machine Learning.
            </span>
          </h2>
          
          <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
            Trabajamos con empresas desde 10 hasta 10,000 empleados. Si tiene operaciones, 
            clientes o inventario, tenemos una solución basada en datos para usted.
          </p>
          
          <motion.a
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold text-xl rounded-2xl hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🚀 Solicitar Análisis
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={22} />
          </motion.a>
          
          <p className="mt-6 text-sm text-gray-500 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Sin compromiso • Evaluación personalizada •{" "}
            <span className="text-blue-400 font-medium">Cupos limitados esta semana</span>
          </p>
        </motion.div>
      </section>

      {/* Footer técnico */}
      <div className="max-w-4xl mx-auto text-center text-xs text-gray-600 py-8 border-t border-gray-800">
        <p className="mb-2">
          Tecnologías: Python • scikit-learn • XGBoost • Prophet • SQL • Airflow • Docker
        </p>
        <p>
          Modelos explicables con SHAP/LIME • Integración nativa con ERP, CRM y bases de datos existentes
        </p>
      </div>

      {/* Floating CTA mobile */}
      <motion.div 
        className="fixed bottom-6 left-0 right-0 px-6 z-40 md:hidden"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <a
          href="/contact"
          className="block w-full py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold text-center rounded-2xl shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-shadow"
        >
          📊 Solicitar Análisis →
        </a>
      </motion.div>

      {/* Sticky CTA desktop */}
      <motion.div 
        className="hidden md:flex fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-white/10 px-8 py-4 items-center justify-between z-40"
        initial={{ y: 100 }}
        animate={{ y: scrollYProgress.get() > 0.4 ? 0 : 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center gap-4">
          <Brain className="text-blue-400" size={20} />
          <span className="text-gray-300 text-sm">
            ¿Listo para decidir con datos? <strong className="text-white">Hablemos</strong>
          </span>
        </div>
        <a
          href="/contact"
          className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
        >
         Solicitar Análisis →
        </a>
      </motion.div>
    </main>
  );
}