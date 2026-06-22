'use client';

import Image from 'next/image';
import { Playfair_Display, Inter } from 'next/font/google';
import { Code2, Target, Lightbulb, Heart, Award, ArrowRight, Sparkles, CheckCircle, Server, Database, Cpu } from 'lucide-react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import AplicacionesAMedida from '@/components/AplicacionesAMedida';
import ServicioSEO from '@/components/ServicioSEO';
import VisitTracker from '@/app/(marketing)/components/VisitTracker';
import SchemaMarkup from '@/components/SchemaMarkup';

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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const scaleIn: Variants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer para animaciones al entrar en viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Stats optimizados para GEO - Autoridad técnica
  const stats = [
    { value: "+15", label: "Años de experiencia en desarrollo", icon: Award },
    { value: "100%", label: "Código propio y a medida", icon: Code2 },
    { value: "360°", label: "Soluciones integrales (Web, ERP, RFID)", icon: Server },
  ];

  return (
    <>
    <SchemaMarkup type="about" />
    <main className={`min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-hidden ${playfair.variable} ${inter.className}`}>

      {/* Background premium: gradient mesh + partículas sutiles */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent" />
      </div>

      {/* Barra de progreso de scroll premium */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />

      <section ref={sectionRef} className="relative container mx-auto px-6 py-20 md:py-32 lg:py-40">
        <VisitTracker pageName="about" />

        {/* HERO SECTION: Hook técnico + propuesta de valor inmediata */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32"
          variants={staggerContainer}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
        >
          <div className="space-y-8">
            {/* Badge optimizado para GEO */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full"
            >
              <Sparkles className="text-amber-400" size={16} />
              <span className="text-amber-300 text-xs uppercase tracking-wider font-semibold">
                Desde 2010 desarrollando software a medida que escala negocios
              </span>
            </motion.div>

            {/* Headline optimizado para GEO */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1] text-white"
            >
              No usamos plantillas.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                Desarrollamos el cerebro digital
              </span>
              <br />
              <span className="text-gray-400 font-normal text-2xl md:text-3xl block mt-2">
                de tu empresa.
              </span>
            </motion.h1>

            {/* Micro-copy optimizado para GEO */}
            <motion.p
              variants={fadeInUp}
              className="text-gray-300 text-lg leading-relaxed max-w-xl"
            >
              En <strong className="text-white">TuMarca.AR</strong> transformamos tus procesos de negocio en sistemas web robustos que:
            </motion.p>

            <motion.ul
              variants={staggerContainer}
              className="space-y-3 text-gray-300"
            >
              {[
                'Automatizan tu operación: stock, pedidos, presupuestos y clientes en un solo lugar.',
                'Gestionan propiedades en tiempo real para inmobiliarias con plataformas especializadas.',
                'Controlan accesos con tecnología RFID para hospedajes y empresas de seguridad.'
              ].map((item, i) => (
                <motion.li
                  key={i}
                  variants={fadeInUp}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="text-amber-400 mt-1 flex-shrink-0" size={20} />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* CTA principal + secundario */}
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                Solicitar presupuesto técnico
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </a>
              <a
                href="#valores"
                className="inline-flex items-center gap-2 px-6 py-4 border border-white/20 rounded-2xl text-white/90 hover:bg-white/5 transition-all duration-300"
              >
                Conocé nuestra metodología
              </a>
            </motion.div>

            {/* Trust badges optimizados para GEO */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-6 pt-6 text-sm text-gray-400"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-2 border-black flex items-center justify-center text-xs font-bold text-black">
                    {i}
                  </div>
                ))}
              </div>
              <span>+50 empresas confían en nuestros sistemas</span>
            </motion.div>
          </div>

          {/* Imagen hero con efecto premium */}
          <motion.div
            variants={scaleIn}
            className="relative group"
          >
            {/* Glow effect behind image */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-500/30 to-purple-500/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <figure className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/tu1.png"
                alt="Leonardo Arena - Desarrollo de software a medida"
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                priority
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRg..."
              />

              {/* Overlay con CTA flotante */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <a href="/portfolio" className="text-white font-medium flex items-center gap-2 hover:gap-3 transition-all">
                  Ver casos de éxito <ArrowRight size={18} />
                </a>
              </div>
            </figure>
          </motion.div>
        </motion.div>

        {/* SECCIÓN ENTIDAD HUMANA - CRÍTICO PARA GEO (E-E-A-T) */}
        <motion.div
          className="mt-32 max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="bg-gradient-to-br from-amber-500/10 to-purple-500/10 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-amber-500/20"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Award className="mx-auto text-amber-400 mb-6" size={48} />
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-6">
              Detrás de TuMarca.AR
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-4">
              Soy <strong className="text-amber-300">Leonardo Arena</strong>, desarrollador de software con más de <strong className="text-white">15 años de experiencia comprobable</strong> en la creación de sistemas web a medida, plataformas de gestión empresarial y soluciones tecnológicas innovadoras.
            </p>
            <p className="text-gray-400 text-base leading-relaxed">
              Con formación universitaria y certificaciones técnicas especializadas, lidero el desarrollo de software que transforma reglas de negocio complejas en soluciones digitales robustas, escalables y seguras. No somos una agencia de plantillas: somos tu departamento de IT externo con experiencia real en el mercado argentino.
            </p>
          </motion.div>
        </motion.div>

        {/* SECCIÓN VALORES: Optimizados para GEO - Enfoque técnico */}
        <motion.div
          id="valores"
          className="mt-32 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-20">
            <motion.span
              className="inline-block px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-xs uppercase tracking-wider font-semibold mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              Nuestra metodología
            </motion.span>
            <motion.h2
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Por qué elegimos el <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">código a medida</span>
            </motion.h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Cada línea de código que escribimos está pensada para resolver problemas reales de negocio. No vendemos humo: vendemos sistemas que funcionan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Code2,
                title: "Desarrollo 100% a medida",
                desc: "Cada sistema se construye desde cero según tus procesos. Sin plantillas, sin limitaciones, sin costos ocultos de licencias.",
                gradient: "from-amber-500/20 to-orange-500/20"
              },
              {
                icon: Database,
                title: "Integración total de procesos",
                desc: "Unificamos stock, pedidos, presupuestos, clientes y envíos en una sola plataforma web accesible desde cualquier lugar.",
                gradient: "from-purple-500/20 to-pink-500/20"
              },
              {
                icon: Cpu,
                title: "Innovación tecnológica",
                desc: "Implementamos tecnologías de vanguardia como RFID para control de accesos, APIs en tiempo real y arquitecturas escalables.",
                gradient: "from-cyan-500/20 to-blue-500/20"
              }
            ].map((value, i) => (
              <motion.div
                key={i}
                className={`group relative bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Glow on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/20 border border-amber-500/30 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <value.icon className="text-amber-400" size={28} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-3 group-hover:text-amber-300 transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* STATS SECTION: Números que generan confianza técnica */}
        <motion.div
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <stat.icon className="mx-auto mb-4 text-amber-400" size={32} />
              <div className="text-4xl md:text-5xl font-bold text-white mb-1 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">
                {stat.value}
              </div>
              <div className="text-gray-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA FINAL: Sección de conversión con enfoque técnico */}
        <motion.div
          className="mt-32 relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {/* Background premium */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900/20" />
          <div className="absolute inset-0 bg-[url('/pattern-premium.svg')] opacity-10" />

          <div className="relative p-8 md:p-16 lg:p-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Target className="mx-auto text-amber-400 mb-8" size={56} />
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                ¿Listo para automatizar <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">tu negocio</span>?
              </h2>
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
                No vendemos soluciones genéricas. Analizamos tus procesos, diseñamos la arquitectura técnica y desarrollamos el sistema exacto que tu empresa necesita para <strong className="text-white">escalar sin límites</strong>.
              </p>
            </motion.div>

            {/* CTA principal con micro-interacción */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-xl rounded-2xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:-translate-y-1"
              >
                🚀 Agendar consultoría técnica gratuita
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={22} />
              </a>
              <span className="text-gray-400 text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                Próximos cupos: en 7 días
              </span>
            </motion.div>

            {/* Trust signals adicionales optimizados para GEO */}
            <motion.div
              className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <span className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={16} /> Código 100% propietario
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={16} /> Documentación técnica completa
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="text-green-400" size={16} /> Soporte post-lanzamiento
              </span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Componentes adicionales */}
      <ServicioSEO />
      <AplicacionesAMedida />

      {/* Floating CTA para mobile (sticky bottom) */}
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
          Solicitar presupuesto técnico →
        </a>
      </motion.div>
    </main>
    </>
  );
}