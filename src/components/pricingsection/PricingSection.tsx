'use client';

import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const WHATSAPP_NUMBER = "5491141461312";

const plans = [
  {
    name: "Starter",
    price: "$70.000 ARS",
    setup: "$120.000 ARS",
    description: "Ideal para empezar a generar tus primeros clientes",
    features: [
      "Página web optimizada",
      "Botón directo a WhatsApp",
      "Configuración básica de Google Ads",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$140.000 ARS",
    setup: "$240.000 ARS",
    description: "Sistema completo para generar clientes todos los días",
    features: [
      "Web optimizada para conversión",
      "Google Ads activo y gestionado",
      "Automatización de WhatsApp",
      "CRM básico de clientes",
      "Seguimiento de leads",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "$250.000 ARS",
    setup: "$350.000 ARS",
    description: "Escala tu negocio con automatización avanzada",
    features: [
      "Todo lo del plan Pro",
      "Automatizaciones avanzadas",
      "Optimización continua",
      "Estrategia personalizada",
    ],
    highlight: false,
  },
];

export default function PricingSection() {
  return (
    <section className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 text-xs uppercase tracking-wider font-semibold mb-4">
            Planes
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Empezá a generar{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              clientes hoy mismo
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Elegí el plan que mejor se adapte a tu negocio. Todos incluyen nuestro sistema de generación de clientes.
          </p>
        </motion.div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-8 border ${
                plan.highlight
                  ? "border-amber-400 bg-white/10 scale-105 shadow-2xl shadow-amber-500/20"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {/* Badge PRO */}
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-black text-xs font-bold rounded-full">
                  MÁS ELEGIDO
                </div>
              )}

              <h3 className="text-xl font-semibold text-white mb-2">
                {plan.name}
              </h3>

              <p className="text-gray-400 text-sm mb-6">
                {plan.description}
              </p>

              {/* Precio */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">
                  {plan.price}
                </span>
                <span className="text-gray-400"> / mes</span>

                <p className="text-sm text-gray-500 mt-2">
                  Setup inicial: {plan.setup}
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 text-left">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                    <Check className="text-green-400 mt-1" size={16} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hola!%20Quiero%20contratar%20el%20plan%20${plan.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block w-full text-center py-3 rounded-xl font-semibold transition ${
                  plan.highlight
                    ? "bg-gradient-to-r from-amber-400 to-amber-600 text-black hover:shadow-lg hover:shadow-amber-500/30"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Quiero este plan →
              </a>
            </motion.div>
          ))}
        </div>

        {/* Extra confianza */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-10 text-gray-500 text-sm"
        >
          Sin contratos largos • Resultados en días • Cancelá cuando quieras
        </motion.p>
      </div>
    </section>
  );
}