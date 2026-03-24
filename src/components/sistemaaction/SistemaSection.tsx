'use client';

import { motion } from 'framer-motion';
import { Globe, Megaphone, MessageCircle, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Globe,
    title: "Creamos tu web que convierte",
    description:
      "Diseñamos una página optimizada para transformar visitas en consultas reales.",
  },
  {
    icon: Megaphone,
    title: "Activamos publicidad en Google",
    description:
      "Lanzamos campañas para atraer personas que ya están buscando tu servicio.",
  },
  {
    icon: MessageCircle,
    title: "Automatizamos WhatsApp y seguimiento",
    description:
      "Respondemos automáticamente y organizamos tus clientes para no perder oportunidades.",
  },
];

interface SistemaSectionProps {
    id: string;
    ref: React.RefObject<HTMLElement | null>;
}

export default function SistemaSection({ id, ref }: SistemaSectionProps) {
  return (
    <section id={id} ref={ref} className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-amber-300 text-xs uppercase tracking-wider font-semibold mb-4">
            Cómo funciona
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Un sistema simple que genera{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              clientes todos los días
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Nos encargamos de todo para que tu negocio reciba consultas de forma automática.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* Glow */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition duration-500" />

                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full">

                  {/* Icon */}
                  <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-amber-500/10 mb-6 mx-auto">
                    <Icon className="text-amber-400" size={28} />
                  </div>

                  {/* Paso */}
                  <h3 className="text-xl font-semibold text-white mb-3">
                    Paso {index + 1}
                  </h3>

                  {/* Título */}
                  <p className="text-white font-medium mb-3">
                    👉 {step.title}
                  </p>

                  {/* Descripción */}
                  <p className="text-gray-400 text-sm">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Resultado final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <p className="text-gray-400 mb-4">Resultado:</p>

          <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
            🔥 Clientes llegando todos los días a tu negocio
          </h3>

          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/30 transition"
          >
            Quiero este sistema
            <ArrowRight size={18} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}