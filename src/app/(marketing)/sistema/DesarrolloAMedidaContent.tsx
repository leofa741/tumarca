'use client';
import VisitTracker from '../components/VisitTracker';
import { useSectionTracker } from '../components/useSectionTracker';
import Image from 'next/image';

import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Globe,
  Megaphone,
  MessageCircle,
  Star,
  BarChart3,
  ShieldCheck,
  ChevronDown,
  Zap,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import PricingSection from '@/components/pricingsection/PricingSection';

// Componente de Acordeón para FAQ
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button
        className="w-full py-6 flex justify-between items-center text-left hover:text-amber-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-lg">{question}</span>
        <ChevronDown
          className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-amber-400' : ''
            }`}
        />
      </button>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-6 text-gray-400 leading-relaxed">{answer}</p>
      </motion.div>
    </div>
  );
};

export default function SistemaLanding() {

  const { ref: heroSistemaPageRef } = useSectionTracker({
    sectionId: 'sistema-landing',
    sectionName: 'sistema-landing',
    minReadTime: 2000,
  });

  const { ref: casosExitoRef } = useSectionTracker({
    sectionId: 'casos-exito',
    sectionName: 'casos-exito',
    minReadTime: 2000,
  });

  const { ref: comoFuncionaRef } = useSectionTracker({
    sectionId: 'como-funciona',
    sectionName: 'como-funciona',
    minReadTime: 2000,
  });

  const { ref: beneficiosRef } = useSectionTracker({
    sectionId: 'beneficios',
    sectionName: 'beneficios',
    minReadTime: 2000,
  });

 

  const { ref: faqRef } = useSectionTracker({
    sectionId: 'faq',
    sectionName: 'faq',
    minReadTime: 2000,
  });

  return (
    <main className="bg-neutral-950 text-white overflow-x-hidden selection:bg-amber-500/30">

      {/* BACKGROUND EFFECTS */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[10%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      {/* NAVBAR (Simplificada pero elegante) */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-neutral-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter">
          <Image src="/marca-2-ar-removebg.png" alt="Logo" width={100} height={100} />
          </div>
          <a href="/contact" className="text-sm font-medium hover:text-amber-400 transition-colors">
            Contactar
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section 
      ref={heroSistemaPageRef}
      id="sistema-landing"
      className="min-h-screen flex items-center justify-center px-6 pt-20 relative">
        <div className="max-w-5xl mx-auto text-center z-10">

     

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-amber-300 text-xs font-medium uppercase tracking-wider mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Sistema Activo 24/7
            </span>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-[1.1]">
              Tu negocio, en <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600">
                Piloto Automático
              </span>
            </h1>
                 <VisitTracker pageName="sistema-landing" />

            <p className="text-gray-400 text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light">
              Dejamos de depender de la suerte en Instagram. Creamos un motor de ventas en Google que te trae clientes listos para pagar.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/contact"
                className="group px-8 py-4 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_40px_rgba(245,158,11,0.5)] flex items-center gap-2"
              >
                Activar mi Sistema
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#como-funciona"
                className="px-8 py-4 border border-white/10 hover:bg-white/5 rounded-xl transition-colors text-gray-300"
              >
                Ver el proceso
              </a>
            </div>

            <div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { label: "Clientes Generados", value: "+1,200" },
                { label: "Inversión en Ads", value: "Optimizada" },
                { label: "Tiempo de Setup", value: "7 Días" },
                { label: "Satisfacción", value: "98%" },
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SOCIAL PROOF / LOGOS */}
      <section 
      ref={casosExitoRef}
      id="casos-exito"
      className="py-20 border-y border-white/5 bg-gradient-to-b from-neutral-950 via-white/[0.02] to-neutral-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-12">
            <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider">Empresas que confían en nosotros</p>
            <h3 className="text-2xl font-bold text-white">+1,200 clientes generados este mes</h3>
          </div>

          {/* CARRUSEL DE LOGOS (Animación infinita) */}
          <div className="relative mb-20">
            {/* Gradientes para fade en los bordes */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent z-10" />

            <div className="flex gap-16 animate-scroll">
              {/* Duplicamos los logos para el efecto infinito */}
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex gap-16 items-center">
                  {[
                    { name: "TechFlow", icon: "⚡", color: "from-blue-500 to-cyan-500" },
                    { name: "BuildPro", icon: "🏗️", color: "from-orange-500 to-amber-500" },
                    { name: "MediCare", icon: "🏥", color: "from-green-500 to-emerald-500" },
                    { name: "LegalHub", icon: "⚖️", color: "from-purple-500 to-pink-500" },
                    { name: "AutoMax", icon: "🚗", color: "from-red-500 to-rose-500" },
                    { name: "Foodie", icon: "🍔", color: "from-yellow-500 to-orange-500" },
                  ].map((logo, i) => (
                    <div
                      key={`${setIndex}-${i}`}
                      className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer group min-w-[180px]"
                    >
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${logo.color} flex items-center justify-center text-xl shadow-lg`}>
                        {logo.icon}
                      </div>
                      <span className="font-bold text-gray-400 group-hover:text-white transition-colors">
                        {logo.name}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* TESTIMONIOS DESTACADOS */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "En 3 semanas duplicamos nuestras consultas. El sistema se paga solo.",
                author: "Carlos M.",
                role: "Director de Clínica Dental",
                avatar: "👨‍⚕️",
                result: "+150% leads"
              },
              {
                quote: "Dejé de perseguir clientes en Instagram. Ahora ellos vienen a mí.",
                author: "Laura G.",
                role: "Estudio de Arquitectura",
                avatar: "👩‍🎨",
                result: "+200% ventas"
              },
              {
                quote: "La automatización de WhatsApp nos ahorra 20 horas por semana.",
                author: "Roberto S.",
                role: "Servicios Técnicos",
                avatar: "👨‍🔧",
                result: "-80% tiempo"
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-neutral-900/50 border border-white/10 rounded-2xl p-6 hover:border-amber-500/30 transition-colors"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, starI) => (
                    <Star key={starI} size={16} className="fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-xl">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{testimonial.author}</div>
                      <div className="text-xs text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-xs font-bold">
                    {testimonial.result}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ESTADÍSTICAS EN TIEMPO REAL */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "1,247", label: "Clientes este mes", icon: Users },
              { number: "98%", label: "Tasa de satisfacción", icon: Star },
              { number: "7 días", label: "Tiempo promedio setup", icon: Zap },
              { number: "3.5x", label: "ROI promedio", icon: TrendingUp },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-amber-500/20 transition-colors"
              >
                <stat.icon className="mx-auto text-amber-500 mb-3" size={24} />
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Agrega esto en tu CSS global o en un style tag para la animación del carrusel */}
      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* EL PROBLEMA (DISEÑO DIVIDIDO) */}
      <section 
      ref={beneficiosRef}
      id="beneficios"
      className="py-24 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* TEXTO IZQUIERDA */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              ¿Cansado de publicar y <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-600">
                no vender nada?
              </span>
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              El problema no es tu producto, es tu visibilidad. Mientras tú intentas hacer un Reel viral, tu competencia está apareciendo primero en Google cuando el cliente tiene la tarjeta de crédito en la mano.
            </p>
            <ul className="space-y-4">
              {[
                "El algoritmo de Instagram cambia cada semana",
                "Tus seguidores no siempre ven tus posts",
                "Perder horas creando contenido que no convierte"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 text-xs border border-red-500/20">✕</div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* GRÁFICO DERECHA (MEJORADO) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Efecto de brillo de fondo */}
            <div className="absolute inset-0 bg-red-500/10 rounded-3xl blur-3xl transform scale-90" />

            {/* Tarjeta Principal */}
            <div className="relative bg-neutral-900 border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden">

              {/* Header de la tarjeta */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Rendimiento Orgánico</div>
                  <div className="text-2xl font-bold text-white">En Caída Libre 📉</div>
                </div>
                <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-red-400 text-xs font-bold">
                  -45% este mes
                </div>
              </div>

              {/* El Gráfico Visual */}
              <div className="relative h-48 w-full flex items-end justify-between gap-2">
                {/* Líneas de guía de fondo */}
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20">
                  <div className="w-full h-px bg-gray-500"></div>
                  <div className="w-full h-px bg-gray-500"></div>
                  <div className="w-full h-px bg-gray-500"></div>
                  <div className="w-full h-px bg-gray-500"></div>
                </div>

                {/* Barras animadas */}
                {[60, 55, 45, 40, 30, 25, 15].map((height, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                    className="w-full bg-gradient-to-t from-red-900/50 to-red-500/80 rounded-t-sm relative group"
                  >
                    {/* Tooltip al hacer hover */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                      {height}% Reach
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pie del gráfico */}
              <div className="mt-4 flex justify-between text-xs text-gray-600 font-mono">
                <span>Lun</span>
                <span>Mar</span>
                <span>Mie</span>
                <span>Jue</span>
                <span>Vie</span>
                <span>Sab</span>
                <span>Dom</span>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* EL SISTEMA (BENTO GRID STYLE) */}
      <section 
      ref={comoFuncionaRef}
      id="como-funciona" className="py-24 px-6 bg-neutral-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">La Fórmula del Crecimiento</h2>
            <p className="text-gray-400">Tres pasos simples. Resultados complejos.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="md:col-span-2 bg-neutral-950 border border-white/10 rounded-3xl p-8 hover:border-amber-500/30 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -mr-16 -mt-16" />
              <Globe className="text-amber-400 mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-2">1. Web de Alta Conversión</h3>
              <p className="text-gray-400 max-w-md">No hacemos webs "bonitas". Hacemos máquinas de venta. Diseño estratégico enfocado en que el usuario haga clic en "Contactar".</p>
            </div>

            {/* Card 2 */}
            <div className="bg-neutral-950 border border-white/10 rounded-3xl p-8 hover:border-blue-500/30 transition-colors group relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -ml-16 -mb-16" />
              <Megaphone className="text-blue-400 mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-2">2. Tráfico Preciso</h3>
              <p className="text-gray-400 text-sm">Google Ads segmentado para mostrar tu oferta solo a quienes buscan activamente tu solución hoy.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-neutral-950 border border-white/10 rounded-3xl p-8 hover:border-green-500/30 transition-colors group relative overflow-hidden">
              <MessageCircle className="text-green-400 mb-6" size={40} />
              <h3 className="text-2xl font-bold mb-2">3. Automatización IA</h3>
              <p className="text-gray-400 text-sm">Tu WhatsApp responde al instante, califica al lead y agenda la cita mientras tú duermes.</p>
            </div>

            {/* Card 4 */}
            <div className="md:col-span-2 bg-gradient-to-br from-amber-500/10 to-neutral-950 border border-amber-500/20 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-amber-200">Dashboard en Tiempo Real</h3>
                <p className="text-gray-400">Accede a tu panel y mira cómo crecen tus leads día a día. Transparencia total.</p>
              </div>
              <BarChart3 className="text-amber-400 opacity-50" size={60} />
            </div>
          </div>
        </div>
      </section>

      {/* COMPARATIVA DE PRECIOS (ESTILO PRO) */}
   <PricingSection/>

      {/* FAQ SECTION */}
      <section 
      ref={faqRef}
      id="faq"
      className="py-24 px-6 bg-neutral-900/30">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Preguntas Frecuentes</h2>
          <div className="space-y-2">
            <FAQItem
              question="¿Necesito tener conocimientos técnicos?"
              answer="Para nada. Nosotros nos encargamos de toda la parte técnica, configuración de servidores, anuncios y automatizaciones. Tú solo te encargas de cerrar las ventas."
            />
            <FAQItem
              question="¿Cuánto tiempo tarda en funcionar?"
              answer="Generalmente, en menos de 10 días tenemos tu web y tus primeras campañas activas. Los resultados suelen empezar a verse en las primeras semanas."
            />
            <FAQItem
              question="¿Hay contratos de permanencia?"
              answer="No creemos en atar a nuestros clientes. Trabajamos mes a mes. Si no estás feliz con los resultados, puedes cancelarlo cuando quieras."
            />
            <FAQItem
              question="¿El precio incluye la inversión en publicidad?"
              answer="Nuestro fee es por la gestión y el sistema. La inversión que va a Google se paga directamente a la plataforma y tú decides el monto (recomendamos mínimo $200 ARS/día)."
            />
          </div>
        </div>
      </section>

      {/* CTA FINAL CON GARANTÍA */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-amber-900/20 pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full text-green-400 text-sm mb-8">
            <ShieldCheck size={16} />
            Garantía de Satisfacción
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Deja de perseguir clientes. <br />
            <span className="text-white">Haz que ellos vengan a ti.</span>
          </h2>

          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Agenda una llamada de 15 minutos. Analizaremos tu negocio y te diremos exactamente cuántos clientes podrías conseguir. Sin compromiso.
          </p>

          <a
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-bold rounded-full text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            <Zap className="fill-black" />
            Agendar Auditoría Gratuita
          </a>

          <p className="mt-6 text-sm text-gray-500">
            Cupos limitados para este mes.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 text-center text-gray-600 text-sm">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <a href="/">
              <Image  src="/marca-2-ar-removebg.png" alt="Logo" width={50} height={50} />
            </a>
          </div>
          <div className="flex gap-6">

          
          </div>
        </div>
      </footer>

    </main>
  );
}