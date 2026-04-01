'use client';

import { motion, Variants } from 'framer-motion';
import {
  Sparkles,
  Palette,
  FileText,
  MessageSquare,
  Globe,
  Instagram,
  Printer,
  Rocket,
  ShieldCheck,
  Search,
  Target,
  LayoutDashboard
} from 'lucide-react';

type Props = {
  reducedMotion?: boolean;
};

const createAnimations = (reducedMotion: boolean) => ({
  fadeInUp: {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reducedMotion ? 0.3 : 0.6 }
    }
  } as Variants,
  stagger: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.08
      }
    }
  } as Variants
});

export default function BrandFullPackSection({ reducedMotion = false }: Props) {
  const animations = createAnimations(reducedMotion);

  const blocks = [
    {
      icon: Search,
      title: "Estrategia de Marca",
      items: [
        "Análisis de mercado y competidores",
        "Benchmark de marcas referentes",
        "Definición de cliente ideal (buyer persona)",
        "Mapa de dolores y necesidades del cliente",
        "Propuesta de valor diferencial",
        "Posicionamiento estratégico",
        "Definición de objetivos de negocio",
        "Estructura de oferta inicial"
      ]
    },
    {
      icon: Sparkles,
      title: "Naming",
      items: [
        "Creación de propuestas de nombres",
        "Validación semántica y comercial",
        "Chequeo de dominio disponible (.com / .com.ar)",
        "Verificación en redes sociales",
        "Recomendación estratégica del nombre final",
        "Sugerencia para registro de marca"
      ]
    },
    {
      icon: Palette,
      title: "Identidad Visual",
      items: [
        "Diseño de logo principal",
        "Variantes del logo (horizontal, vertical, isotipo)",
        "Versión monocromática",
        "Favicon e íconos",
        "Paleta de colores (HEX, RGB, CMYK)",
        "Sistema tipográfico",
        "Estilo visual (formas, líneas, recursos)",
        "Dirección de arte general"
      ]
    },
    {
      icon: FileText,
      title: "Manual de Marca (Brandbook)",
      items: [
        "Normas de uso del logo",
        "Aplicaciones correctas e incorrectas",
        "Guía de colores",
        "Guía tipográfica",
        "Estilo de imágenes",
        "Ejemplos de uso en piezas reales",
        "Lineamientos visuales globales"
      ]
    },
    {
      icon: MessageSquare,
      title: "Identidad Verbal",
      items: [
        "Definición de tono de voz",
        "Personalidad de marca",
        "Mensajes clave",
        "Slogan / tagline",
        "Propuesta de comunicación",
        "Copy base para web",
        "Guía de redacción para redes"
      ]
    },
    {
      icon: Globe,
      title: "Desarrollo Web",
      items: [
        "Diseño UX/UI personalizado",
        "Desarrollo web responsive",
        "Optimización para conversión",
        "SEO técnico inicial",
        "Carga rápida optimizada",
        "Integración de formularios",
        "Conexión con WhatsApp",
        "Configuración de hosting y dominio"
      ]
    },
    {
      icon: LayoutDashboard,
      title: "Sistema de Conversión",
      items: [
        "Estructura de embudo básico",
        "Call to actions estratégicos",
        "Optimización de landing",
        "Tracking de eventos",
        "Configuración de métricas",
        "Base para automatización futura"
      ]
    },
    {
      icon: Instagram,
      title: "Redes Sociales",
      items: [
        "Creación / optimización de perfiles",
        "Diseño de foto y portada",
        "Línea estética definida",
        "Plantillas editables",
        "Guía de contenido",
        "Ideas de publicaciones iniciales"
      ]
    },
    {
      icon: Printer,
      title: "Material Comercial",
      items: [
        "Tarjetas personales",
        "Firma de email profesional",
        "Presentación institucional",
        "Papelería corporativa",
        "Plantillas comerciales",
        "Documentos base de ventas"
      ]
    },
    {
      icon: Rocket,
      title: "Lanzamiento",
      items: [
        "Estrategia de salida al mercado",
        "Plan de contenido inicial",
        "Activación digital",
        "Primeras campañas",
        "Optimización inicial",
        "Acompañamiento en el lanzamiento"
      ]
    },
    {
      icon: ShieldCheck,
      title: "Base Escalable",
      items: [
        "Estructura preparada para crecer",
        "Base para campañas publicitarias",
        "Preparación para automatización",
        "Sistema listo para escalar",
        "Orden digital profesional completo"
      ]
    }
  ];

  return (
    <section className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={animations.fadeInUp}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            PACK MARCA COMPLETA
          </h2>

          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Un sistema integral diseñado para crear, posicionar y hacer crecer tu marca 
            desde cero, listo para generar clientes desde el primer día.
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div
          variants={animations.stagger}
          initial="hidden"
          whileInView="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {blocks.map((block, i) => {
            const Icon = block.icon;

            return (
              <motion.div
                key={i}
                variants={animations.fadeInUp}
                className="bg-white/5 border border-white/10 rounded-2xl p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Icon className="text-amber-400" size={22} />
                  <h3 className="text-white font-semibold">{block.title}</h3>
                </div>

                <ul className="space-y-2">
                  {block.items.map((item, idx) => (
                    <li key={idx} className="text-gray-400 text-sm flex gap-2">
                      <span className="text-amber-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* CIERRE DE VENTA */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Esto no es un gasto, es una inversión estratégica
          </h3>

          <p className="text-gray-400 max-w-2xl mx-auto mb-6">
            Cada uno de estos elementos trabaja en conjunto para generar confianza,
            atraer clientes y posicionarte como una marca profesional en tu mercado.
          </p>

          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-amber-500 text-black font-bold rounded-xl"
          >
            Quiero mi marca completa
          </a>
        </div>

      </div>
    </section>
  );
}