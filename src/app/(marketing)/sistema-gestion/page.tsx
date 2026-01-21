// app/(marketing)/sistema-gestion/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import FormContactLanding from './components/FormContactLanding';

interface FormData {
  name: string;
  email: string;
  business: string;
  phone: string;
  message: string;
}

export default function SistemaGestionPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>();

  // Detectar modo oscuro del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Efecto scroll para header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Aquí integrarías tu backend o servicio de email
      // Por ahora simulamos un envío exitoso
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitSuccess(true);
      reset();

      // Enviar a Google Analytics o similar
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'conversion', {
          send_to: 'AW-XXXXXXXXX/XXXXXXXXXX',
          value: 1.0,
          currency: 'ARS'
        });
      }
    } catch (error) {
      setSubmitError('Hubo un error al enviar el formulario. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animaciones Framer Motion
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-500/20 dark:from-amber-600/30 dark:to-orange-700/30"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-black/10 dark:bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Disponible ahora</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Sistema de Gestión Empresarial + Catálogo
              <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent"> Escalabilidad garantizada </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
              Sistema de Gestión Empresarial + Catálogo + Escalabilidad garantizada con dashboard en tiempo real,
              catálogo público y escalabilidad garantizada.

            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Contactanos →
              </motion.button>


            </div>

            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Listo en 10 días
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Garantía 100%
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Soporte premium
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problemas/Antes-Después */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Deja de adivinar, empieza a controlar</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Transformá tu caos operativo en un sistema profesional que impresiona a clientes e inversores.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={item}
              className="bg-gradient-to-br from-red-50/20 to-red-100/20 dark:from-red-900/30 dark:to-red-800/30 p-8 rounded-2xl border border-red-200 dark:border-red-800/50"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-red-600 dark:text-red-400">Antes</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "No sabés cuánto stock tenés en tiempo real",
                  "Tus clientes no ven tus productos organizados",
                  "Perdés ventas por no tener presencia digital profesional",
                  "Gastás horas en tareas repetitivas y manuales",
                  "No podés mostrar métricas reales a inversores"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">❌</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={item}
              className="bg-gradient-to-br from-green-50/20 to-green-100/20 dark:from-green-900/30 dark:to-green-800/30 p-8 rounded-2xl border border-green-200 dark:border-green-800/50"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">Después</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Dashboard en tiempo real con todos tus KPIs",
                  "Catálogo público profesional accesible 24/7",
                  "Presencia digital premium que genera confianza",
                  "Automatización inteligente de tareas repetitivas",
                  "Reportes profesionales listos para inversores"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✅</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Características Premium */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Todo lo que necesitás, en un solo lugar</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Una solución integral diseñada específicamente para emprendedores premium como vos.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "🔒 Panel Administrador",
                icon: "📊",
                features: [
                  "Control financiero en tiempo real",
                  "Gestión inteligente de stock",
                  "Seguimiento de envíos integrado",
                  "Chat AI para consultas internas",
                  "Gestión de usuarios y roles"
                ],
                color: "from-amber-500 to-orange-600"
              },
              {
                title: "🛍️ Portal del Cliente",
                icon: "📖",
                features: [
                  "Catálogo interactivo profesional",
                  "Acceso seguro con Gmail",
                  "Experiencia móvil perfecta",
                  "Historial de compras y envíos",
                  "Notificaciones en tiempo real"
                ],
                color: "from-blue-500 to-indigo-600"
              },
              {
                title: "🚀 Escalabilidad",
                icon: "✅",
                features: [
                  "Fase 1: Sistema + Catálogo (10 días)",
                  "Fase 2: E-commerce básico (+12 días)",
                  "Fase 3: Medios de pago (+15 días)",
                  "Fase 4: App personalizada (+20 días)",
                  "Soporte técnico prioritario"
                ],
                color: "from-green-500 to-emerald-600"
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -10 }}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${card.color} rounded-2xl flex items-center justify-center text-2xl mb-6`}>
                  {card.icon}
                </div>
                <h3 className="text-2xl font-bold mb-6">{card.title}</h3>
                <ul className="space-y-3">
                  {card.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-gray-400 mt-1">•</span>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Casos de éxito</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Clientes que ya transformaron su negocio.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-900/30 dark:to-orange-900/30 p-8 md:p-12 rounded-3xl border border-amber-200 dark:border-amber-800/50"
          >
            <div className="text-5xl mb-6">"</div>
            <p className="text-xl md:text-2xl italic mb-8 max-w-3xl mx-auto">
              Pasé de perder clientes por desorganización a tener todo controlado en un solo lugar.
              En 10 días tenía mi sistema funcionando y ya generé mis primeras ventas con el catálogo público.
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                MG
              </div>
              <div className="text-left">
                <p className="font-bold text-lg">María G.</p>
                <p className="text-gray-600 dark:text-gray-400">Emprendedora de moda premium</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>




      {/* Formulario de contacto */}
      <section id="contact" className="py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para transformar tu negocio?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Completá el formulario y agendá tu demo personalizada sin compromiso.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700"
          >
            <FormContactLanding />
          </motion.div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600"></div>
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[length:20px_20px]"></div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Listo para transformar tu negocio?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Cada sistema se personaliza 100% para tu negocio.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-black text-white px-12 py-5 rounded-xl font-bold text-xl shadow-2xl hover:bg-gray-800 transition-all duration-300"
            >
              Contactanos  →
            </motion.button>

            <p className="mt-6 text-white/80 text-sm">
              Incluye plan de escalabilidad, soporte premium 3 meses y garantía de satisfacción
            </p>

            <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Listo en 10 días hábiles
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>

                Pago solo al entregar

              </div>
              <div className="flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Garantía 100%
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Tu Marca AR — Soluciones digitales premium para emprendedores exigentes
          </p>
        </div>
      </footer>

      {/* Dark mode toggle flotante */}
      <button
        onClick={toggleDarkMode}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gray-800 dark:bg-white text-white dark:text-gray-800 rounded-full shadow-lg flex items-center justify-center z-50 hover:scale-110 transition-transform"
        aria-label="Toggle dark mode"
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </div>
  );
}