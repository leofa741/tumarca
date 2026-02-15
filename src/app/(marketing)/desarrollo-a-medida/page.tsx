// app/(marketing)/desarrollo-a-medida/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FormContactLanding from '../components/FormContactLanding';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import VisitCounter from '../components/VisitCounter';
import VisitTracker from '../components/VisitTracker';
import { trackClick } from '../components/clickTracker';


export default function DesarrolloAMedidaLanding() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setDarkMode(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">

      {/* HERO CON DOLOR + SOLUCIÓN */}
      <section className="relative px-6 py-28 max-w-7xl mx-auto">
        <motion.div                                   
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Disponible ahora</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              ¿Perdés ventas porque tus sistemas no crecen con tu negocio?
            </h1>

            <p className="text-gray-300 text-lg mb-8 max-w-xl">
              Desarrollamos soluciones digitales a medida que resuelven problemas reales —
              <span className="text-amber-500 font-bold"> listas en 15 días.</span>
            </p>

            {/* ANTES / DESPUÉS */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl">
                <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                  <XCircle size={16} /> Antes
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• No sabés cuánto stock tenés</li>
                  <li>• Perdés ventas por desorganización</li>
                  <li>• Gastás horas en tareas manuales</li>
                </ul>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 p-4 rounded-xl">
                <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                  <CheckCircle size={16} /> Después
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Dashboard en tiempo real</li>
                  <li>• Automatización inteligente</li>
                  <li>• Reportes para inversores</li>
                </ul>
              </div>
            </div>

            {/* BENEFICIOS CLAVE */}
            <div className="flex flex-wrap gap-4 mb-10">

              <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm">Pago 50% al inicio</span>
              <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm">Pago 50% al entregar</span>
              <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm">Garantía 100%</span>
            </div>

            {/* CTA URGENTE */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl flex items-center gap-2"
            >
              Enviar consulta   <ArrowRight size={20} />
            </motion.button>

            <p className="text-xs text-gray-500 mt-3">Solo 3 cupos disponibles este mes</p>
          </div>
          {/* FORM */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl" id="contact">
            <h2 className="text-2xl font-bold mb-6">Contanos tu proyecto</h2>
            <FormContactLanding />
          </div>
        </motion.div>
      </section>

      {/* TESTIMONIOS */}
      <section className="px-6 py-24 bg-gradient-to-r from-amber-900/10 to-orange-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Lo que dicen quienes ya lo usan</h2>

          <div className="bg-white/5 backdrop-blur-sm border border-amber-500/30 rounded-2xl p-8">
            <p className="text-xl italic mb-6">
              "Pasé de perder clientes por desorganización a tener todo controlado en un solo lugar.
              En 10 días tenía mi sistema funcionando y ya generé mis primeras ventas."
            </p>
            <p className="font-bold">— María G., Emprendedora de moda premium</p>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="px-6 py-24 bg-black/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">
            ¿Qué tipo de desarrollos realizamos?
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: 'Sistemas de Gestión',
                text: 'ERP, CRM, control de stock, facturación y reportes en tiempo real.',
              },
              {
                title: 'Plataformas Web',
                text: 'Portales B2B, dashboards, backoffice y apps internas.',
              },
              {
                title: 'Automatización',
                text: 'Procesos automáticos, reducción de tareas manuales y errores.',
              },
              {
                title: 'Integraciones',
                text: 'APIs, pagos, logística, servicios externos y legacy systems.',
              },
              {
                title: 'Escalabilidad',
                text: 'Arquitectura preparada para crecer junto a tu negocio.',
              },
              {
                title: 'Soporte Profesional',
                text: 'Acompañamiento técnico real, sin intermediarios.',
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-amber-500/40 transition"
              >
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASO DE ÉXITO */}
      <section className="px-6 py-24 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Ejemplo real: Asistente IA para Coaching</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 p-6 rounded-xl">
              <h3 className="font-bold mb-3 text-amber-400">Usuario pregunta:</h3>
              <p className="text-gray-300">"Necesito un mensaje para retener a un cliente indeciso."</p>
            </div>

            <div className="bg-amber-900/20 p-6 rounded-xl">
              <h3 className="font-bold mb-3 text-green-400">IA responde (tu tono):</h3>
              <p className="text-gray-300">
                "Hola [Nombre], sé que estás evaluando tus opciones. Quiero recordarte que este proceso no es solo sobre resultados, sino sobre transformación. Estoy aquí para acompañarte, sin presión, sin jerga. ¿Hablamos 5 minutos?"
              </p>
            </div>
          </div>

          <div className="mt-8 text-center text-sm text-gray-400">
            ✅ Entrenado con tus textos • ✅ Sin salir de tu marca • ✅ Integrado a tu web o app
          </div>
        </div>
      </section>

      {/* CTA FINAL CON URGENCIA */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            ¿Tenés una idea o un problema que resolver?
          </h2>
          <p className="text-gray-400 mb-10">
            Analizamos tu caso y te proponemos una solución realista, escalable y eficiente.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-amber-500 to-orange-600 px-10 py-5 rounded-xl font-bold text-lg shadow-xl flex items-center gap-2 mx-auto"
          >
            Solicitar consulta sin costo → <ArrowRight size={20} />
          </motion.button>

          <p className="text-xs text-gray-500 mt-4">Incluye auditoría técnica gratuita + plan de implementación</p>
        </div>
      </section>

      {/* FOOTER SIMPLE */}
      <footer className="py-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Tu Marca AR — Soluciones digitales premium para emprendedores exigentes
      </footer>º
      
      <VisitCounter />
            <VisitTracker 
            pageName="desarrollo-a-medida-landing"
            />


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
          eventName: 'footer_consultar',
          section: 'footer',
          button: 'consultar'
        }),
      });
      console.log('✅ Clic trackeado: footer_consultar');
    } catch (error) {
      console.error('Error trackeando clic:', error);
    }
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }}
  className="bg-black px-12 py-5 rounded-xl text-xl font-bold shadow-2xl"
>
  Consultar →
</motion.button>


    </main>
  );
}