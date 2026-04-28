'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';
import FormContactLanding from '../components/FormContactLanding';
import VisitCounter from '../components/VisitCounter';
import VisitTracker from '../components/VisitTracker';
import { useSectionTracker } from '../components/useSectionTracker';

export default function DesarrolloAMedidaContent() {

  const { ref: heroRef } = useSectionTracker({
    sectionId: 'hero-amedida',
    sectionName: 'hero-amedida',
    minReadTime: 2000,
  });

  const { ref: autoridadRef } = useSectionTracker({
    sectionId: 'autoridad-amedida',
    sectionName: 'autoridad-amedida',
    minReadTime: 2000,
  });

  const { ref: procesoRef } = useSectionTracker({
    sectionId: 'proceso-amedida',
    sectionName: 'proceso-amedida',
    minReadTime: 2000,
  });

  async function trackAndScroll(eventName: string, section: string) {

    try {

      await fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventName, section }),
      });

    } catch { }

    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });

  }

  return (

    <main className="relative min-h-screen bg-black text-white overflow-hidden">

      <VisitCounter />
      <VisitTracker pageName="desarrollo-a-medida-landing" />

      {/* BACKGROUND PREMIUM */}

      <div className="absolute inset-0 -z-10">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-amber-500/10 blur-[160px]" />

        <div className="absolute bottom-0 right-1/3 w-[700px] h-[700px] bg-purple-500/10 blur-[160px]" />

      </div>

      {/* BARRA CTA */}

      <div className="fixed bottom-0 left-0 w-full bg-black/80 backdrop-blur-lg border-t border-gray-800 py-4 px-6 flex justify-center z-50">

        <button
          onClick={() => trackAndScroll('sticky_cta', 'sticky')}
          className="bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-3 rounded-xl font-bold shadow-lg"
        >

          Solicitar diagnóstico gratuito

        </button>

      </div>

      {/* HERO */}

      <section ref={heroRef} className="px-6 py-32 max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .6 }}
              className="inline-flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full mb-6"
            >

              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />

              <span className="text-sm">
                Diagnóstico tecnológico sin costo
              </span>

            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .1, duration: .6 }}
              className="text-4xl md:text-6xl font-extrabold leading-tight mb-6"
            >

              Desarrollo de Software a Medida
              <br />
              para Empresas

            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .2, duration: .6 }}
              className="text-gray-300 text-xl mb-10 max-w-xl"
            >

              Creamos sistemas que automatizan procesos,
              integran herramientas y convierten datos en decisiones estratégicas.

            </motion.p>

            <div className="flex flex-wrap gap-4 mb-12">

              <button
                onClick={() => trackAndScroll('hero_cta', 'hero')}
                className="bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 shadow-xl hover:scale-[1.02] transition"
              >

                Solicitar diagnóstico

                <ArrowRight size={18} />

              </button>

              <button
                onClick={() => window.open('https://wa.me/5491141461312', '_blank')}
                className="border border-amber-500 text-amber-400 px-8 py-4 rounded-xl font-bold hover:bg-amber-500/10 transition"
              >

                WhatsApp

              </button>

            </div>

            <div className="grid grid-cols-3 gap-8 text-sm text-gray-400">

              <div>

                <p className="text-3xl font-bold text-amber-400">+10</p>

                Proyectos entregados

              </div>

              <div>

                <p className="text-3xl font-bold text-amber-400">15-30</p>

                Días promedio

              </div>

              <div>

                <p className="text-3xl font-bold text-amber-400">100%</p>

                Personalizado

              </div>

            </div>

          </div>

          {/* FORM */}

          <motion.div
            initial={{ opacity: 0, scale: .95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: .6 }}
            id="contact"
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(251,191,36,0.15)]"
          >

            <h2 className="text-2xl font-bold mb-6">

              Contanos tu proyecto

            </h2>

            <FormContactLanding />

          </motion.div>

        </div>

      </section>

      {/* AUTORIDAD */}

      <section
       ref={autoridadRef}
       id="autoridad"
       className="py-20 border-y border-gray-900 px-6">

        <div className="max-w-6xl mx-auto text-center">

          <p className="text-gray-400 mb-10">
            Empresas que optimizan su operación con tecnología
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 opacity-60">

            <div className="h-12 bg-white/5 rounded-lg flex items-center justify-center">
              ERP
            </div>

            <div className="h-12 bg-white/5 rounded-lg flex items-center justify-center">
              BI
            </div>

            <div className="h-12 bg-white/5 rounded-lg flex items-center justify-center">
              Automation
            </div>

            <div className="h-12 bg-white/5 rounded-lg flex items-center justify-center">
              AI
            </div>

          </div>

        </div>

      </section>

      {/* BENEFICIOS */}

      <section className="py-28 px-6 border-t border-gray-900">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-center mb-20">

            Soluciones tecnológicas estratégicas

          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            {[
              [
                'Automatización de procesos',
                'Reducí tareas manuales y errores operativos.'
              ],

              [
                'Sistemas a medida',
                'ERP, CRM y plataformas adaptadas a tu empresa.'
              ],

              [
                'Business Intelligence',
                'Dashboards ejecutivos en tiempo real.'
              ],

              [
                'Integraciones',
                'Pagos, APIs, logística y herramientas externas.'
              ],

              [
                'Escalabilidad',
                'Arquitectura preparada para crecimiento.'
              ],

              [
                'Consultoría tecnológica',
                'Estrategia tecnológica alineada a tu negocio.'
              ]

            ].map((item, i) => (

              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: .4, delay: i * .05 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 p-8 rounded-xl hover:border-amber-500/40 hover:scale-[1.02] transition"
              >

                <h3 className="font-bold mb-3 flex items-center gap-2">

                  <CheckCircle size={16} className="text-amber-400" />

                  {item[0]}

                </h3>

                <p className="text-gray-400 text-sm">

                  {item[1]}

                </p>

              </motion.div>

            ))}

          </div>

        </div>

      </section>

      {/* PROCESO */}

      <section
       ref={procesoRef}
       id="proceso"
       className="py-28 px-6 bg-gradient-to-b from-black to-gray-950">

        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-3xl font-bold mb-16">

            Cómo trabajamos

          </h2>

          <div className="grid md:grid-cols-4 gap-10">

            {[
              ['01', 'Diagnóstico', 'Analizamos tu operación'],
              ['02', 'Propuesta', 'Diseñamos la solución'],
              ['03', 'Desarrollo', 'Construcción del sistema'],
              ['04', 'Implementación', 'Capacitación y soporte']
            ].map((s, i) => (

              <div
                key={i}
                className="bg-white/5 border border-white/10 p-6 rounded-xl"
              >

                <div className="text-amber-500 font-bold text-lg mb-2">

                  {s[0]}

                </div>

                <h3 className="font-bold mb-2">

                  {s[1]}

                </h3>

                <p className="text-gray-400 text-sm">

                  {s[2]}

                </p>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* VALOR */}

      <section className="py-28 px-6">

        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-3xl font-bold mb-16">
            El costo de no optimizar tu operación
          </h2>

          <div className="grid md:grid-cols-3 gap-10">

            <div className="bg-white/5 border border-white/10 p-8 rounded-xl">

              <h3 className="font-bold mb-3">
                Errores operativos
              </h3>

              <p className="text-gray-400 text-sm">
                Procesos manuales generan pérdidas invisibles todos los días.
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-xl">

              <h3 className="font-bold mb-3">
                Decisiones sin datos
              </h3>

              <p className="text-gray-400 text-sm">
                Sin métricas claras es imposible optimizar el negocio.
              </p>

            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-xl">

              <h3 className="font-bold mb-3">
                Escalar es difícil
              </h3>

              <p className="text-gray-400 text-sm">
                Sin sistemas adecuados el crecimiento se vuelve caótico.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* CASOS */}

      <section className="py-28 px-6 border-t border-gray-900">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-center mb-20">
            Resultados que lograron nuestros clientes
          </h2>

          <div className="grid md:grid-cols-2 gap-10">


            {/* CASO 1 */}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">

              <p className="text-sm text-amber-400 mb-3">
                Distribuidora mayorista
              </p>

              <h3 className="text-xl font-bold mb-4">
                Automatización de pedidos y stock
              </h3>

              <p className="text-gray-400 text-sm mb-6">
                La empresa gestionaba pedidos manualmente con Excel y tenía errores frecuentes en stock.
              </p>

              <ul className="text-sm text-gray-300 space-y-2">

                <li>✔ Sistema interno de gestión</li>

                <li>✔ Integración con logística</li>

                <li>✔ Dashboard de ventas</li>

              </ul>

              <div className="mt-6 border-t border-gray-800 pt-4">

                <p className="text-amber-400 font-bold">
                  Resultado: -40% tiempo operativo
                </p>

              </div>

            </div>


            {/* CASO 2 */}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-8">

              <p className="text-sm text-amber-400 mb-3">
                Ecommerce en crecimiento
              </p>

              <h3 className="text-xl font-bold mb-4">
                Sistema de control de ventas y logística
              </h3>

              <p className="text-gray-400 text-sm mb-6">
                El negocio tenía múltiples canales de venta y no podía medir rentabilidad.
              </p>

              <ul className="text-sm text-gray-300 space-y-2">

                <li>✔ Integración de ventas</li>

                <li>✔ Dashboard financiero</li>

                <li>✔ Automatización de reportes</li>

              </ul>

              <div className="mt-6 border-t border-gray-800 pt-4">

                <p className="text-amber-400 font-bold">
                  Resultado: decisiones basadas en datos
                </p>

              </div>

            </div>


          </div>

        </div>

      </section>

      {/* DISPONIBILIDAD */}

      <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-950">

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl font-bold mb-6">

            Agenda limitada para nuevos proyectos

          </h2>

          <p className="text-gray-400 mb-10">

            Solo aceptamos una cantidad reducida de proyectos por mes para garantizar calidad en el desarrollo.

          </p>

          <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-400 px-4 py-2 rounded-full">

            <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>

            3 lugares disponibles este mes

          </div>

        </div>

      </section>

      {/* CTA FINAL */}

      <section className="py-32 text-center px-6">

        <div className="max-w-4xl mx-auto">

          <h2 className="text-4xl font-bold mb-6">

            Transformá tu empresa con tecnología a medida

          </h2>

          <p className="text-gray-400 mb-10">

            Solicitá un diagnóstico estratégico y descubrí qué procesos podés optimizar.

          </p>

          <button
            onClick={() => trackAndScroll('cta_final', 'cta')}
            className="bg-gradient-to-r from-amber-500 to-orange-600 px-10 py-5 rounded-xl font-bold text-lg shadow-xl hover:scale-[1.02] transition"
          >

            Solicitar diagnóstico

          </button>

        </div>

      </section>

      <footer className="py-8 border-t border-gray-800 text-center text-gray-500 text-sm">

        © {new Date().getFullYear()} Tu Marca AR — Tecnología estratégica

      </footer>

    </main>

  );
}