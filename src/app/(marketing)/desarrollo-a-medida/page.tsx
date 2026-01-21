'use client';

import { motion } from 'framer-motion';
import FormContactLanding from '../components/FormContactLanding';
import { CheckCircle } from 'lucide-react';

export default function DesarrolloAMedidaLanding() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">

      {/* HERO */}
      <section className="relative px-6 py-28 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Desarrollo de soluciones digitales <span className="text-amber-500">a medida</span>
            </h1>

            <p className="text-gray-300 text-lg mb-8 max-w-xl">
              Creamos sistemas, plataformas web y automatizaciones diseñadas
              específicamente para resolver problemas reales de tu negocio.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                'Sistemas internos y plataformas web',
                'Automatización de procesos',
                'Integraciones con APIs y servicios externos',
                'Desarrollo escalable y seguro',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-200">
                  <CheckCircle className="text-amber-500" />
                  {item}
                </li>
              ))}
            </ul>

            {/* WhatsApp */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                window.open('https://wa.me/5491141461312', '_blank')
              }
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl"
            >
              Consultar por WhatsApp
            </motion.button>
          </div>

          {/* FORM */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">
              Contanos tu proyecto
            </h2>
            <FormContactLanding />
          </div>
        </motion.div>
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

      {/* CTA FINAL */}
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
            onClick={() =>
              window.open('https://wa.me/5491141461312', '_blank')
            }
            className="bg-gradient-to-r from-amber-500 to-orange-600 px-10 py-5 rounded-xl font-bold text-lg shadow-xl"
          >
            Solicitar consulta sin costo →
          </motion.button>
        </div>
      </section>
    </main>
  );
}
