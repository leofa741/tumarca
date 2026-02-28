'use client';

import { Playfair_Display, Inter } from 'next/font/google';
import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion';
import {
  Briefcase, Paintbrush, Globe, Rocket, Star, CheckCircle, Brain, Sparkles,
  MessageCircle, ArrowRight, Zap, Shield, TrendingUp, ChevronDown
} from 'lucide-react';
import { useState, useEffect, useRef, useMemo } from 'react';

import ValorDestacado from '@/components/ValorDestacado';
import AplicacionesAMedida from '@/components/AplicacionesAMedida';
import ServicioSEO from '@/components/ServicioSEO';
import AplicacionesIA from '@/components/AplicacionesIA';
import VisitTracker from '@/app/(marketing)/components/VisitTracker';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Animaciones reutilizables
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const scaleIn: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.4 } }
};

// Servicios consolidados y diferenciados
const services = [
  {
    id: 'sistemas',
    categoria: 'Tecnología',
    icon: Briefcase,
    titulo: "Sistemas a Medida",
    descripcion: "Automatizamos procesos repetitivos para que te enfoques en lo que importa: crecer. Desarrollo personalizado que se integra con tus herramientas actuales.",
    features: ["Automatización de procesos", "APIs e integraciones", "Dashboards personalizados", "Soporte técnico incluido"],
    badge: "Ideal para startups",
    gradient: "from-amber-500/20 to-orange-500/20",
    featured: true,
    delay: 0.2
  },
  {
    id: 'branding',
    categoria: 'Branding',
    icon: Paintbrush,
    titulo: "Branding Estratégico",
    descripcion: "Desde tu esencia hasta tu identidad visual. Creamos una marca coherente, memorable y alineada con tu propósito para destacar en un mercado saturado.",
    features: ["Logo & Manual de Identidad", "Naming & Posicionamiento", "Storytelling de marca", "Guía de aplicación"],
    badge: "Más solicitado",
    gradient: "from-purple-500/20 to-pink-500/20",
    featured: true,
    delay: 0.3
  },
  {
    id: 'web',
    categoria: 'Desarrollo',
    icon: Globe,
    titulo: "Diseño Web Premium",
    descripcion: "Sitios web que no solo se ven increíbles, sino que <strong>convierten visitantes en clientes</strong>. Velocidad, SEO y experiencia de usuario en cada pixel.",
    features: ["Diseño 100% personalizado", "Optimizado para SEO técnico", "Carga en <2 segundos", "Mobile-first responsive"],
    badge: "+90% satisfacción",
    gradient: "from-cyan-500/20 to-blue-500/20",
    featured: true,
    delay: 0.4
  },
  {
    id: 'marketing',
    categoria: 'Marketing',
    icon: Rocket,
    titulo: "Marketing Digital",
    descripcion: "Estrategias basadas en datos que aumentan tu tráfico, engagement y ventas. No más publicaciones al azar: cada acción con propósito y métrica.",
    features: ["Gestión de redes sociales", "Campañas de ads (Meta/Google)", "Email marketing automatizado", "Reportes mensuales de ROI"],
    badge: "Resultados medibles",
    gradient: "from-emerald-500/20 to-teal-500/20",
    featured: false,
    delay: 0.5
  },
  {
    id: 'ia',
    categoria: 'IA & Datos',
    icon: Brain,
    titulo: "IA & Machine Learning",
    descripcion: "Modelos predictivos y automatización inteligente que transforman tus datos en decisiones estratégicas. Anticipate al mercado con tecnología de vanguardia.",
    features: ["Modelos predictivos personalizados", "NLP para análisis de texto", "Visión artificial", "Automatización con IA generativa"],
    badge: "Tecnología 2025",
    gradient: "from-violet-500/20 to-indigo-500/20",
    featured: true,
    delay: 0.6
  },
  {
    id: 'chat',
    categoria: 'IA & Datos',
    icon: MessageCircle,
    titulo: "Chat IA para Ventas",
    descripcion: "Asistentes conversacionales entrenados con TU información para atender clientes 24/7, calificar leads y concretar ventas mientras dormís.",
    features: ["Entrenado con tus datos", "Integración WhatsApp/Web", "Calificación automática de leads", "Tono de voz personalizado"],
    badge: "Convierte 3x más",
    gradient: "from-rose-500/20 to-red-500/20",
    featured: false,
    delay: 0.7
  }
];

const categorias = ['Todos', 'Tecnología', 'Branding', 'Desarrollo', 'Marketing', 'IA & Datos'];

export default function ServicePage() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const { scrollYProgress } = useScroll();
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const sectionRef = useRef<HTMLElement>(null);

  // ✅ CORRECCIÓN CLAVE: Usar useMemo para filtrado en lugar de useEffect + useState
  const filteredServices = useMemo(() => {
    if (activeCategory === 'Todos') return services;
    return services.filter(s => s.categoria === activeCategory);
  }, [activeCategory]);

  // Scroll suave para anclajes
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <main className={`min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-x-hidden ${playfair.variable} ${inter.className}`}>
      <VisitTracker pageName="servicios" />
      {/* Background premium animado */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          style={{ y: yBackground }}
          className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-amber-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "40%"]) }}
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/15 via-transparent to-transparent" />
      </div>

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <section ref={sectionRef} className="relative container mx-auto px-6 py-20 md:py-28 lg:py-32">

        {/* HERO SECTION */}
        <motion.div
          className="text-center max-w-5xl mx-auto mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-full mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="text-amber-400" size={18} />
            <span className="text-amber-300 text-sm font-medium">
              +50 marcas transformadas desde 2015
            </span>
          </motion.div>

          <motion.h1
            className={`${playfair.className} text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Transforma tu{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
              Marca
            </span>
            <br />
            <span className="text-gray-400 font-normal text-2xl md:text-3xl block mt-2">
              con estrategia, diseño y tecnología que vende.
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            No creamos logos al azar ni sitios genéricos. <strong className="text-white">Construimos marcas con propósito</strong> que conectan, inspiran y generan resultados reales en el mundo digital.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <a
              href="/contact"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              Empezar mi proyecto
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
            <button
              onClick={() => scrollToSection('servicios-grid')}
              className="inline-flex items-center gap-2 px-6 py-4 border border-white/20 rounded-2xl text-white/90 hover:bg-white/5 transition-all duration-300"
            >
              Explorar servicios
              <ChevronDown size={18} />
            </button>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-400" size={16} />
              <span>Entrega en tiempo récord</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-400" size={16} />
              <span>Soporte 24/7 incluido</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-400" size={16} />
              <span>100% personalizado</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ✅ FILTROS DE CATEGORÍA - Corregidos */}
        <motion.div
          id="servicios-grid"
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === cat
                  ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/30 scale-105'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10 hover:border-amber-500/30'
                }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ✅ GRID DE SERVICIOS - CORRECCIÓN PRINCIPAL */}
        {/* Eliminamos whileInView del contenedor para que el filtrado funcione siempre */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible" // ✅ Cambiado: siempre visible, no depende del viewport
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                key={service.id}
                layout // ✅ Mantiene animación de reordenamiento
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                exit="hidden" // ✅ Animación de salida al filtrar
                className="group relative"
              >
                {/* Glow effect on hover */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

                <div className={`relative bg-white/5 backdrop-blur-xl rounded-3xl p-7 border border-white/10 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 ${service.featured ? 'ring-2 ring-amber-500/30' : ''}`}>

                  {service.featured && (
                    <div className="absolute -top-3 -right-3 px-3 py-1 bg-gradient-to-r from-amber-400 to-amber-600 text-black text-xs font-bold rounded-full shadow-lg z-10">
                      Destacado
                    </div>
                  )}

                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} border border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    whileHover={{ rotate: 5 }}
                  >
                    <service.icon className="text-amber-400" size={32} />
                  </motion.div>

                  <h3 className="text-white font-bold text-xl mb-3 group-hover:text-amber-300 transition-colors">
                    {service.titulo}
                  </h3>
                  <p className="text-gray-400 text-sm mb-5 leading-relaxed" dangerouslySetInnerHTML={{ __html: service.descripcion }} />

                  <ul className="space-y-2.5 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-gray-300 text-sm">
                        <CheckCircle className="text-amber-400 mt-0.5 flex-shrink-0" size={16} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-center">
                    <span className="inline-block text-xs px-3 py-1.5 bg-amber-500/10 text-amber-300 rounded-full border border-amber-500/20">
                      {service.badge}
                    </span>
                  </div>

                  <motion.div
                    className="absolute inset-x-0 bottom-0 p-7 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-gray-900/90 to-transparent rounded-b-3xl"
                    initial={{ y: 10 }}
                    whileHover={{ y: 0 }}
                  >
                    <a
                      href="/contact"
                      className="block w-full py-3 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 rounded-xl text-amber-300 font-medium text-center hover:bg-amber-500/30 transition-colors"
                    >
                      Consultar por este servicio →
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Mensaje cuando no hay resultados */}
        {filteredServices.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-400"
          >
            <p>No hay servicios en esta categoría. <button onClick={() => setActiveCategory('Todos')} className="text-amber-400 hover:underline">Ver todos</button></p>
          </motion.div>
        )}

        {/* SECCIÓN DE CONFIANZA */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-24 bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-3xl p-8 md:p-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Star className="mx-auto text-amber-400 mb-5" size={44} />
          <h3 className="text-white text-2xl md:text-3xl font-bold mb-4">¿Por qué elegirnos?</h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Trabajamos con emprendedores y empresas que quieren <strong className="text-white">destacar con autenticidad</strong>. No somos una agencia más: somos tu <strong>aliado estratégico</strong> en el crecimiento de tu marca.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm">
            {[
              { icon: CheckCircle, text: "100% personalizado" },
              { icon: Zap, text: "Entregas puntuales" },
              { icon: Shield, text: "Soporte continuo" },
              { icon: TrendingUp, text: "Resultados medibles" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-gray-300">
                <item.icon className="text-amber-400" size={16} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* SECCIÓN VALOR DESTACADO */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Cómo te ayudamos a <span className="text-amber-400">crecer sin límites</span>
            </motion.h2>
            <motion.div
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {[
                { titulo: "Identidad de Marca", desc: "Creamos una identidad visual única que refleja la esencia de tu marca, desde el logo hasta los colores y tipografías.", img: "/identidad1.png", alt: "Identidad de Marca", delay: 0.2 },
                { titulo: "Desarrollo Web", desc: "Diseñamos y desarrollamos la plataforma web ideal para tu proyecto con tecnologías de vanguardia, y te proporcionamos las herramientas necesarias para administrarla de manera eficiente.", img: "/desarrollo2.png", alt: "Desarrollo Web", delay: 0.3 },
                { titulo: "SEO & Posicionamiento", desc: "Optimizamos tu sitio web para que sea fácilmente encontrado por los motores de búsqueda, mejorando su visibilidad y atrayendo más tráfico orgánico.", img: "/seo2.png", alt: "SEO & Posicionamiento", delay: 0.4 },
                { titulo: "Soporte Técnico", desc: "Mantené tu web siempre activa, actualizada y segura con nuestro soporte técnico especializado. Estamos aquí para resolver cualquier inconveniente.", img: "/soporte2.png", alt: "Soporte Técnico", delay: 0.5 },
                { titulo: "Consultoría Estratégica", desc: "Impulsá tu marca con decisiones estratégicas. Te acompañamos con asesoramiento experto para construir, optimizar o redefinir tu presencia digital.", img: "/consultoria2.png", alt: "Consultoría Estratégica", delay: 0.6 }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <ValorDestacado
                    titulo={item.titulo}
                    descripcion={item.desc}
                    imagenSrc={item.img}
                    alt={item.alt}
                    delay={item.delay}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* RESULTADOS Y TESTIMONIOS */}
        <section className="py-24 px-6 bg-gradient-to-b from-transparent to-gray-900/50">
          <div className="max-w-6xl mx-auto text-center mb-16">
            <motion.h2
              className="text-3xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Resultados que <span className="text-amber-400">hablan por sí mismos</span>
            </motion.h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              No prometemos magia. <strong className="text-white">Generamos resultados reales</strong> para marcas como la tuya.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { num: '+200%', label: 'Más tráfico orgánico en 6 meses', desc: 'Clientes con SEO estratégico' },
              { num: '+85%', label: 'Incremento en conversiones', desc: 'Sitios web rediseñados' },
              { num: '15+', label: 'Lanzamientos exitosos en 2024', desc: 'Productos, servicios y marcas nuevas' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
              >
                <p className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 mb-3">
                  {stat.num}
                </p>
                <p className="text-white font-semibold text-lg mb-1">{stat.label}</p>
                <p className="text-gray-400 text-sm">{stat.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="max-w-3xl mx-auto bg-gradient-to-r from-amber-500/10 to-transparent border border-amber-500/20 rounded-3xl p-8 md:p-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Star className="text-amber-400 mx-auto mb-5" size={36} />
            <blockquote className="text-gray-200 text-lg md:text-xl italic mb-6 leading-relaxed">
              "Gracias a Tu Marca AR, mi negocio pasó de ser invisible a generar ventas todos los meses. No solo el diseño es hermoso, sino que <strong className="text-white">el sitio web empezó a traer clientes desde el primer mes</strong>."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black font-bold">
                CR
              </div>
              <div className="text-left">
                <p className="text-amber-400 font-semibold">Camila R.</p>
                <p className="text-gray-500 text-sm">Emprendedora de Bienestar • Buenos Aires</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6" itemScope itemType="https://schema.org/FAQPage">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-center text-white mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Preguntas Frecuentes
            </motion.h2>
            <div className="space-y-4">
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
                <motion.details
                  key={i}
                  className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  itemScope
                  itemProp="mainEntity"
                  itemType="https://schema.org/Question"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none text-white font-semibold text-lg hover:bg-white/5 transition-colors">
                    <span itemProp="name">{item.q}</span>
                    <ChevronDown className="text-amber-400 group-open:rotate-180 transition-transform duration-300" size={20} />
                  </summary>
                  <div className="px-6 pb-6 text-gray-300 leading-relaxed" itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                    <p itemProp="text">{item.a}</p>
                  </div>
                </motion.details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <motion.div
          className="text-center mt-24 bg-gradient-to-r from-gray-900/80 to-amber-900/20 border border-amber-500/20 rounded-3xl p-8 md:p-16"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <Star className="mx-auto text-amber-400 mb-6" size={48} />
          <h3 className="text-white text-2xl md:text-4xl font-bold mb-6">
            ¿Listo para que tu marca <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              destaque y crezca?
            </span>
          </h3>
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg">
            Únete a emprendedores que ya transformaron su presencia digital con un equipo que entiende tu negocio.
          </p>
          <a
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-xl rounded-2xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:-translate-y-1"
          >
            🚀 Agenda tu Consulta Gratuita
            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={22} />
          </a>
          <p className="text-gray-500 text-sm mt-6 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Próximos cupos: <span className="text-amber-400 font-medium">7 días</span> • Sin compromiso • 100% online
          </p>
        </motion.div>
      </section>

      {/* Componentes adicionales */}
      <ServicioSEO />
      <AplicacionesAMedida />
      <AplicacionesIA />

      {/* Floating CTA para mobile */}
      <motion.div
        className="fixed bottom-6 left-0 right-0 px-6 z-40 md:hidden"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <a
          href="/contact"
          className="block w-full py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-center rounded-2xl shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-shadow"
        >
          Empezar mi proyecto →
        </a>
      </motion.div>

      {/* Sticky CTA bar para desktop */}
      <motion.div
        className="hidden md:flex fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-xl border-t border-white/10 px-8 py-4 items-center justify-between z-40"
        initial={{ y: 100 }}
        animate={{ y: scrollYProgress.get() > 0.3 ? 0 : 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex items-center gap-4">
          <Sparkles className="text-amber-400" size={20} />
          <span className="text-gray-300 text-sm">¿Tenés una idea? <strong className="text-white">Hagámosla realidad</strong></span>
        </div>
        <a
          href="/contact"
          className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300"
        >
          Hablemos →
        </a>
      </motion.div>
    </main>
  );
}