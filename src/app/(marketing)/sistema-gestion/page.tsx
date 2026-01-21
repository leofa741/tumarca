'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FormContactLanding from '../components/FormContactLanding';

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

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-600/20" />
        <div className="relative max-w-6xl mx-auto px-4 py-28 text-center">

          <div className="inline-flex items-center gap-2 bg-black/10 dark:bg-white/10 px-4 py-2 rounded-full mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium">Disponible · Cupos limitados</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sistema de Gestión a Medida para Empresas
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto">
            Controlá stock, ventas y clientes desde un solo lugar. <br />
            Listo en 10 días · Escalable · Pensado para crecer.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl"
            >
              Quiero una demo
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://wa.me/5491141461312', '_blank')}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl"
            >
              Consultar por WhatsApp
            </motion.button>
          </div>

          <p className="mt-4 text-sm text-gray-500">Tomamos solo 3 proyectos nuevos por mes</p>
        </div>
      </section>

      {/* PROBLEMA / SOLUCIÓN */}
      <section className="py-24 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl border border-red-300/40">
          <h3 className="text-2xl font-bold text-red-500 mb-4">Antes</h3>
          <ul className="space-y-3">
            <li>❌ Stock desactualizado</li>
            <li>❌ Ventas sin control</li>
            <li>❌ Información dispersa</li>
            <li>❌ Excel, WhatsApp y errores</li>
          </ul>
        </div>
        <div className="p-8 rounded-2xl border border-green-300/40">
          <h3 className="text-2xl font-bold text-green-500 mb-4">Después</h3>
          <ul className="space-y-3">
            <li>✅ Dashboard en tiempo real</li>
            <li>✅ Catálogo profesional</li>
            <li>✅ Control total del negocio</li>
            <li>✅ Sistema listo para escalar</li>
          </ul>
        </div>
      </section>

      {/* PARA QUIÉN ES */}
      <section className="py-24 max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
        <div>
          <h3 className="text-3xl font-bold text-green-600 mb-6">Ideal para</h3>
          <ul className="space-y-3 text-lg">
            <li>✔ PyMEs y empresas en crecimiento</li>
            <li>✔ Distribuidoras y negocios con stock</li>
            <li>✔ Negocios que hoy usan Excel</li>
            <li>✔ Equipos que necesitan control real</li>
          </ul>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-red-500 mb-6">No recomendado si</h3>
          <ul className="space-y-3 text-lg">
            <li>✘ Buscás algo gratuito</li>
            <li>✘ Es un proyecto personal</li>
            <li>✘ No tenés ventas todavía</li>
          </ul>
        </div>
      </section>

      {/* TESTIMONIO */}
      <section className="py-24 max-w-4xl mx-auto px-4 text-center">
        <blockquote className="p-10 rounded-3xl bg-gradient-to-br from-amber-100/40 to-orange-100/40">
          <p className="text-xl italic mb-6">
            “En menos de dos semanas pasamos del caos al control total. Hoy vendemos con catálogo y sabemos exactamente cuánto ganamos.”
          </p>
          <strong>— Cliente PyME</strong>
        </blockquote>
      </section>

      {/* FORM */}
      <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-6">Solicitá tu demo sin compromiso</h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
            Te mostramos cómo se adapta el sistema a tu negocio.
          </p>
          <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl">
            <FormContactLanding />
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Sistema listo en 10 días hábiles</h2>
        <p className="text-xl mb-8">Se paga al entregar el sistema funcionando</p>
        <button
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-black px-10 py-4 rounded-xl text-xl font-bold"
        >
          Quiero hablar ahora
        </button>
        <p className="mt-4 text-sm">Solo 3 proyectos activos por mes</p>
      </section>

    </div>
  );
}
