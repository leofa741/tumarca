'use client';

import { motion, Variants } from 'framer-motion';
import {
    BookOpen,
    Mic,
    Headphones,
    Waves,
    Sliders,
    UploadCloud,
    BadgeCheck,
    Megaphone,
    BarChart3,
    Sparkles,
    ArrowRight,
    Shield
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

export default function AudiobookPremiumSection({ reducedMotion = false }: Props) {
    const animations = createAnimations(reducedMotion);

    const blocks = [
        {
            icon: BookOpen,
            title: "Adaptación & Guion Sonoro",
            items: [
                "Estructura de capítulos optimizada",
                "Mapeo de ritmo y pausas narrativas",
                "Guía de pronunciación y fonética",
                "Adaptación de diálogos a formato audio",
                "Indicadores de tono y emoción"
            ]
        },
        {
            icon: Mic,
            title: "Casting & Dirección de Voz",
            items: [
                "Selección de narradores profesionales",
                "Proceso de audiciones curadas",
                "Coincidencia de voz con la obra",
                "Ajuste de acento y registro"
            ]
        },
        {
            icon: Headphones,
            title: "Grabación de calidad en mp3",
            items: [
                "Calidad de audio profesional",
                "MP3 de alta calidad",
                "Formato compatible con todas las plataformas",
                "Entrega rápida y eficiente",
                "Precio accesible"

            ]
        },
        {
            icon: Waves,
            title: "Edición & Postproducción",
            items: [
                "Eliminación de ruido de fondo",
                "Control de respiraciones y clics",
                "Corrección de errores de lectura",
                "Segmentación por capítulos",
                "Limpieza y alineación de pistas"
            ]
        },
        {
            icon: Sliders,
            title: "Masterización Profesional",
            items: [
                "Cumplimiento de estándares ACX/Audible",
                "Nivelación a -23 LUFS RMS",
                "Exportación en WAV/MP3 de alta calidad",
                "Control de picos y dinámica",
                "QC auditivo final certificado"
            ]
        },
        {
            icon: UploadCloud,
            title: "Distribución Global",
            items: [
                "Publicación en Audible, Apple, Spotify",
                "Carga directa a Google Play & Kobo",
                "Optimización de metadatos",
                "Categorización estratégica",
                "Sincronización de ISBN/ASIN"
            ]
        },
        {
            icon: BadgeCheck,
            title: "Certificación & Calidad",
            items: [
                "Archivos 100% compatibles con plataformas",
                "Informe de control de calidad",
                "Rondas de revisión incluidas",
                "Garantía de aprobación técnica",
                "Entrega de master + stems editables"
            ]
        },
        {
            icon: Megaphone,
            title: "Lanzamiento & Promoción",
            items: [
                "Clips de audio para redes sociales",
                "Estrategia de lanzamiento escalonada",
                "Optimización de descripción y keywords",
                "Generación de reseñas iniciales",
                "Cross-promoción con podcasts/creadores"
            ]
        },
        {
            icon: BarChart3,
            title: "Monetización & Escalabilidad",
            items: [
                "Estrategia de regalías (exclusivo vs abierto)",
                "Dashboard de rendimiento",
                "Preparación para secuelas/series",
                "Optimización de precio por mercado",
                "Sistema listo para ingresos recurrentes"
            ]
        }
    ];

    return (
        <section className="relative py-28 px-6 bg-[#0A0A0C] overflow-hidden">
            {/* Ambient Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-amber-900/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-500/8 blur-[120px] rounded-full pointer-events-none" />

            <div className="relative max-w-7xl mx-auto">

                {/* HEADER */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={animations.fadeInUp}
                    className="text-center mb-20"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-400 text-sm font-semibold rounded-full mb-6 border border-amber-500/20">
                        <Sparkles size={14} />
                        PRODUCCIÓN AUDIOVISUAL PREMIUM
                    </span>

                    <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        AUDIOLIBROS QUE SE ESCUCHAN <br className="hidden md:block" /> Y VENDEN
                    </h2>

                    <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
                        Transformamos tu manuscrito en una experiencia sonora de alta fidelidad.
                        Producción profesional, distribución global y un sistema listo para monetizar tu obra desde el día uno.
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
                                className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-amber-500/40 hover:bg-white/[0.07] transition-all duration-300 cursor-default"
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform duration-300">
                                        <Icon size={20} />
                                    </div>
                                    <h3 className="text-white font-semibold text-lg">{block.title}</h3>
                                </div>

                                <ul className="space-y-2.5">
                                    {block.items.map((item, idx) => (
                                        <li key={idx} className="text-gray-400 text-sm flex gap-2 leading-snug">
                                            <span className="text-amber-400 mt-1 flex-shrink-0">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* PREMIUM CTA SECTION */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    variants={animations.fadeInUp}
                    className="mt-24 relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-900/20 to-black border border-amber-500/20 p-8 md:p-12 text-center"
                >
                    {/* Subtle pattern overlay */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                    <h3 className="relative text-2xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                        Tu historia merece ser escuchada en alta definición
                    </h3>

                    <p className="relative text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
                        No dejes tu voz al azar. Cada capítulo, cada pausa y cada matiz es diseñado
                        para retener oyentes, generar autoridad y convertir palabras en ingresos recurrentes.
                    </p>

                    {/* Trust Strip */}
                    <div className="relative flex flex-wrap justify-center gap-4 mb-8 text-sm text-gray-400">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                            <BadgeCheck size={14} className="text-amber-400" /> ACX Approved
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                            <UploadCloud size={14} className="text-amber-400" /> Distribución Multiplataforma
                        </span>
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                            <Shield size={14} className="text-amber-400" /> Garantía de Calidad Técnica
                        </span>
                    </div>

                    <div className="relative flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="/contact"
                            className="group inline-flex items-center gap-2 px-8 py-4 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 hover:shadow-lg hover:shadow-amber-500/20 hover:scale-[1.02] transition-all duration-300"
                        >
                            Quiero producir mi audiolibro
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>

                        <p className="text-gray-500 text-sm">
                            🎧 Entregas listas en 15-21 días hábiles
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}