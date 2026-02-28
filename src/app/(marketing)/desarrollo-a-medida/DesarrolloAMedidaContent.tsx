'use client';

import { motion } from 'framer-motion';
import FormContactLanding from '../components/FormContactLanding';
import { CheckCircle, XCircle } from 'lucide-react';
import VisitCounter from '../components/VisitCounter';
import VisitTracker from '../components/VisitTracker';
import { useSectionTracker } from '../components/useSectionTracker';

export default function DesarrolloAMedidaContent() {

  const { ref: desarrolloAMedidaRef } = useSectionTracker({
    sectionId: 'desarrolloAMedida',
    sectionName: 'desarrolloAMedida',
    minReadTime: 2000,
  });

  const { ref: serviciosDevAMedidaRef } = useSectionTracker({
    sectionId: 'serviciosDevAMedida',
    sectionName: 'serviciosDevAMedida',
    minReadTime: 2000,
  });

  async function trackAndScroll(eventName: string, section: string) {
    try {
      await fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventName, section }),
      });
    } catch (error) {
      console.error('Tracking error:', error);
    }

    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">

      <VisitCounter />
      <VisitTracker pageName="desarrollo-a-medida-landing" />

      {/* HERO */}
      <section
        ref={desarrolloAMedidaRef}
        id="desarrolloAMedida"
        className="px-6 py-28 max-w-7xl mx-auto"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>

            <div className="inline-flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">Consultoría estratégica disponible</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Transformamos procesos desorganizados en sistemas que aumentan ventas y reducen costos
            </h1>

            <p className="text-gray-300 text-lg mb-8 max-w-xl">
              Diseñamos y desarrollamos soluciones digitales a medida para empresas que necesitan
              estructura, automatización y escalabilidad real.
            </p>

            {/* ANTES / DESPUÉS */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              <div className="bg-red-900/20 border border-red-700/50 p-4 rounded-xl">
                <h4 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                  <XCircle size={16} /> Antes
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Excel y sistemas desconectados</li>
                  <li>• Falta de métricas claras</li>
                  <li>• Pérdidas por desorganización</li>
                </ul>
              </div>

              <div className="bg-green-900/20 border border-green-700/50 p-4 rounded-xl">
                <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
                  <CheckCircle size={16} /> Después
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Dashboard ejecutivo en tiempo real</li>
                  <li>• Procesos automatizados</li>
                  <li>• Decisiones basadas en datos</li>
                </ul>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-10">
              <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm">Pago 50% al inicio</span>
              <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm">Pago 50% al entregar</span>
              <span className="bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm">Auditoría inicial gratuita</span>
            </div>

            <button
              onClick={() => trackAndScroll('hero_consultar', 'hero')}
              className="bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl mr-4"
            >
              Solicitar diagnóstico →
            </button>

            <button
              onClick={() => window.open('https://wa.me/5491141461312', '_blank')}
              className="border-2 border-amber-500 text-amber-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-500/10"
            >
              WhatsApp
            </button>

            <p className="text-xs text-gray-500 mt-3">
              +10 proyectos entregados • 100% personalizados
            </p>

          </div>

          <div
            id="contact"
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold mb-6">
              Contanos tu proyecto
            </h2>
            <FormContactLanding />
          </div>

        </div>
      </section>

      {/* SERVICIOS ESTRATÉGICOS */}
      <section
        ref={serviciosDevAMedidaRef}
        id="serviciosDevAMedida"
        className="px-6 py-24 bg-black/40"
      >
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold text-center mb-16">
            Soluciones estratégicas para empresas
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                title: 'Auditoría y Optimización Digital',
                text: 'Detectamos pérdidas ocultas y oportunidades de mejora en tu operación.',
              },
              {
                title: 'Sistemas de Gestión a Medida',
                text: 'ERP, CRM y control de stock adaptados a tu modelo de negocio.',
              },
              {
                title: 'Business Intelligence',
                text: 'Dashboards ejecutivos con métricas clave para decisiones estratégicas.',
              },
              {
                title: 'Automatización con IA',
                text: 'Procesos inteligentes y reducción radical de tareas manuales.',
              },
              {
                title: 'Integraciones Avanzadas',
                text: 'Conexión con pagos, logística, bancos y APIs externas.',
              },
              {
                title: 'Arquitectura Escalable',
                text: 'Infraestructura preparada para crecer y recibir inversión.',
              },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-amber-500/40 transition"
              >
                <h3 className="text-xl font-bold mb-3">
                  {s.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {s.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PARA QUIÉN ES */}
      <section className="px-6 py-24 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-3xl font-bold mb-12">
            ¿Este servicio es para tu empresa?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: 'Empresas en crecimiento',
                text: 'Tu operación ya no entra en Excel y necesitás orden real.',
              },
              {
                title: 'Negocios con múltiples áreas',
                text: 'Ventas, logística y administración desconectadas.',
              },
              {
                title: 'Startups que buscan inversión',
                text: 'Necesitan métricas claras y estructura profesional.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <h3 className="font-bold mb-3 text-amber-400">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PROCESO */}
      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-3xl font-bold mb-16">
            Cómo trabajamos
          </h2>

          <div className="grid md:grid-cols-4 gap-8 text-left">
            {[
              { step: '01', title: 'Diagnóstico', text: 'Analizamos tu operación actual.' },
              { step: '02', title: 'Propuesta', text: 'Diseñamos una solución concreta.' },
              { step: '03', title: 'Desarrollo', text: 'Construcción en 15–30 días.' },
              { step: '04', title: 'Implementación', text: 'Capacitación y soporte continuo.' },
            ].map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-xl">
                <div className="text-amber-500 font-bold text-lg mb-2">{s.step}</div>
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm">{s.text}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA FINAL */}
      <section className="px-6 py-24 text-center">
        <div className="max-w-4xl mx-auto">

          <h2 className="text-3xl font-bold mb-6">
            Si tu empresa necesita estructura y escalabilidad real
          </h2>

          <p className="text-gray-400 mb-10">
            Analizamos tu caso y te proponemos una solución estratégica adaptada a tu modelo de negocio.
          </p>

          <button
            onClick={() => trackAndScroll('final_consultar', 'cta')}
            className="bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl"
          >
            Solicitar auditoría →
          </button>

          <p className="text-xs text-gray-500 mt-4">
            Incluye diagnóstico técnico y propuesta personalizada
          </p>

        </div>
      </section>

      <footer className="py-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Tu Marca AR — Soluciones digitales estratégicas
      </footer>

    </main>
  );
}