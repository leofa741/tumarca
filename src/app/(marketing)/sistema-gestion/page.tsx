// app/(marketing)/sistema-gestion/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FormContactLanding from '../components/FormContactLanding';
import { CheckCircle, XCircle, Clock, Shield, TrendingUp, BarChart3, Package, MessageSquare } from 'lucide-react';
import VisitTracker from '../components/VisitTracker';
import VisitCounter from '../components/VisitCounter';
import { trackClick } from '../components/clickTracker';

export default function SistemaGestionPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mq.matches);
    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>

      {/* HERO CON DOLOR REAL */}
      <section className="relative overflow-hidden">
        {/* TRACKERS */}
        <VisitTracker pageName="sistema-gestion-landing" />
        <VisitCounter />
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-600/20" />
        <div className="relative max-w-6xl mx-auto px-4 py-28 text-center">

          <div className="inline-flex items-center gap-2 bg-black/10 dark:bg-white/10 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Disponible · Solo 3 cupos este mes</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            ¿Perdés ventas porque no controlás tu negocio?
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            Sistema de Gestión Premium para PyMEs que quieren escalar sin caos.
            <span className="text-amber-600 font-bold"> Listo en 15 días · Pago al 50% al inicio · Pago al 50% al final.</span>
          </p>

          {/* BENEFICIOS CLAVE */}
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full">
              <Clock size={16} className="text-amber-400" />
              <span className="text-sm font-medium">15 días hábiles</span>
            </div>
            <div className="flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full">
              <Shield size={16} className="text-amber-400" />
              <span className="text-sm font-medium">Pago al   50% al inicio · Pago al 50% al final</span>
            </div>
            <div className="flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full">
              <TrendingUp size={16} className="text-amber-400" />
              <span className="text-sm font-medium">Escalabilidad garantizada</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={async () => {
                // Track click inline
                try {
                  await fetch('/api/track-click', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      eventName: 'hero_consultar',
                      section: 'hero',
                      button: 'consultar'
                    }),
                  });
                  console.log('✅ Clic trackeado: hero_consultar');
                } catch (error) {
                  console.error('Error trackeando clic:', error);
                }
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl"
            >
              Consultar →
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={async () => {
                // Track click inline
                try {
                  await fetch('/api/track-click', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      eventName: 'hero_whatsapp',
                      section: 'hero',
                      button: 'whatsapp'
                    }),
                  });
                  console.log('✅ Clic trackeado: hero_whatsapp');
                } catch (error) {
                  console.error('Error trackeando clic:', error);
                }
                window.open('https://wa.me/5491141461312', '_blank');
              }}
              className="border-2 border-amber-500 text-amber-600 dark:text-amber-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-500/10"
            >
              Consultar por WhatsApp
            </motion.button>

          </div>

          <p className="mt-4 text-sm text-gray-500">Incluye auditoría técnica gratuita + plan de implementación</p>
        </div>
      </section>

      {/* ANTES / DESPUÉS VISUAL */}
      <section className="py-24 max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">Deja de adivinar, empieza a controlar</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border border-red-300/40 bg-red-50/20 dark:bg-red-900/20"
          >
            <h3 className="text-2xl font-bold text-red-500 mb-6 flex items-center gap-2">
              <XCircle size={24} /> Antes
            </h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">❌</span>
                Stock desactualizado o desconocido
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">❌</span>
                Ventas sin control real
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">❌</span>
                Información dispersa en Excel, WhatsApp, papel
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 mt-1">❌</span>
                No podés mostrar métricas a inversores
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-2xl border border-green-300/40 bg-green-50/20 dark:bg-green-900/20"
          >
            <h3 className="text-2xl font-bold text-green-500 mb-6 flex items-center gap-2">
              <CheckCircle size={24} /> Después
            </h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✅</span>
                Dashboard en tiempo real con todos tus KPIs
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✅</span>
                Catálogo público profesional accesible 24/7
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✅</span>
                Control total de stock, ventas y clientes
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-1">✅</span>
                Reportes profesionales listos para inversores
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CARACTERÍSTICAS PREMIUM */}
      <section className="py-24 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Todo lo que necesitás, en un solo lugar</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "📊 Panel Administrador",
                icon: <BarChart3 className="w-8 h-8" />,
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
                title: "📦 Portal del Cliente",
                icon: <Package className="w-8 h-8" />,
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
                title: "💬 Chat IA Empresarial",
                icon: <MessageSquare className="w-8 h-8" />,
                features: [
                  "Asistente personalizado con tu tono",
                  "Entrenado con tus textos reales",
                  "Integrado a tu web o app",
                  "Ideal para ventas y atención",
                  "Sin salir de tu marca"
                ],
                color: "from-green-500 to-emerald-600"
              }
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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

      {/* CASO DE ÉXITO REAL */}
      <section className="py-24 max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Ejemplo real: Asistente IA para Coaching</h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-10 rounded-3xl bg-gradient-to-br from-amber-100/40 to-orange-100/40 dark:from-amber-900/30 dark:to-orange-900/30"
        >
          <div className="grid md:grid-cols-2 gap-8 mb-6">
            <div className="text-left">
              <h4 className="font-bold text-red-500 mb-2">Usuario pregunta:</h4>
              <p className="italic">"Necesito un mensaje para retener a un cliente indeciso."</p>
            </div>
            <div className="text-left">
              <h4 className="font-bold text-green-500 mb-2">IA responde (tu tono):</h4>
              <p className="italic">
                "Hola [Nombre], sé que estás evaluando tus opciones. Quiero recordarte que este proceso no es solo sobre resultados, sino sobre transformación. Estoy aquí para acompañarte, sin presión, sin jerga. ¿Hablamos 5 minutos?"
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            ✅ Entrenado con tus textos • ✅ Sin salir de tu marca • ✅ Integrado a tu web o app
          </p>
        </motion.div>
      </section>

      {/* PARA QUIÉN ES / NO ES */}
      <section className="py-24 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-green-600 mb-6">✅ Ideal para</h3>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-500 mt-1" size={20} />
              PyMEs y empresas en crecimiento
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-500 mt-1" size={20} />
              Distribuidoras y negocios con stock
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-500 mt-1" size={20} />
              Negocios que hoy usan Excel o sistemas manuales
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="text-green-500 mt-1" size={20} />
              Equipos que necesitan control real y profesionalismo
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-red-500 mb-6">❌ No recomendado si</h3>
          <ul className="space-y-4 text-lg">
            <li className="flex items-start gap-2">
              <XCircle className="text-red-500 mt-1" size={20} />
              Buscás algo gratuito o de bajo costo
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="text-red-500 mt-1" size={20} />
              Es un proyecto personal sin ventas reales
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="text-red-500 mt-1" size={20} />
              No tenés ventas ni clientes todavía
            </li>
            <li className="flex items-start gap-2">
              <XCircle className="text-red-500 mt-1" size={20} />
              Querés algo genérico sin personalización
            </li>
          </ul>
        </motion.div>
      </section>

      {/* FORMULARIO DE CONTACTO */}
      <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-6"
          >
            Reservá tu demo GRATIS
          </motion.h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
            Completá el formulario y agendá tu demo personalizada sin compromiso.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl"
          >
            <FormContactLanding />
          </motion.div>
        </div>
      </section>

      {/* CTA FINAL CON URGENCIA */}
      <section className="py-24 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.1] bg-[length:20px_20px]" />
        <div className="relative max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">¿Listo para transformar tu negocio?</h2>
          <p className="text-xl mb-8">Solo 3 cupos disponibles este mes — Cada sistema se personaliza 100% para tu negocio.</p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={async () => {
              // Track click inline
              try {
                await fetch('/api/track-click', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    eventName: 'hero_consultar',
                    section: 'hero',
                    button: 'consultar'
                  }),
                });
                console.log('✅ Clic trackeado: hero_consultar');
              } catch (error) {
                console.error('Error trackeando clic:', error);
              }
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl"
          >
            Consultar →
          </motion.button>

          <p className="mt-6 text-sm">
            Incluye plan de escalabilidad, soporte premium 3 meses y garantía de satisfacción
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80">
            <div className="flex items-center gap-2">
              <Clock size={20} />
              Listo en 15 días hábiles
            </div>
            <div className="flex items-center gap-2">
              <Shield size={20} />
              Pago al 50% al inicio · Pago al 50% al final
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={20} />
              Garantía 100%
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}