'use client';

import { Playfair_Display, Inter } from 'next/font/google';
import { motion, useScroll, useTransform, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle, Star, Zap, Shield, TrendingUp } from 'lucide-react';
import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

// Tus componentes existentes
import ImageAccordion from '@/components/ImagenAcordeon';
import ValorDestacado from '@/components/ValorDestacado';
import AplicacionesAMedida from '@/components/AplicacionesAMedida';
import ServicioSEO from '@/components/ServicioSEO';
import AplicacionesIA from '@/components/AplicacionesIA';

import ScrollProgressBar from '@/components/scroolprogress/ScrollProgressBar';
import { useSectionTracker } from '@/app/(marketing)/components/useSectionTracker';
import VisitTracker from '@/app/(marketing)/components/VisitTracker';

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    variable: '--font-playfair',
});

const inter = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
});

// ===== OPTIMIZACIÓN: Detectar móvil y prefers-reduced-motion =====
function usePerformancePrefs() {
    const [isMobile, setIsMobile] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        // Detectar móvil
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Detectar prefers-reduced-motion
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);

        return () => {
            window.removeEventListener('resize', checkMobile);
            mediaQuery.removeEventListener('change', handler);
        };
    }, []);

    return { isMobile, reducedMotion };
}

// ===== OPTIMIZACIÓN: Animaciones simplificadas para móvil =====
const createAnimations = (reducedMotion: boolean) => ({
    fadeInUp: {
        hidden: { opacity: 0, y: reducedMotion ? 0 : 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: reducedMotion ? 0.3 : 0.6, ease: "easeOut" }
        }
    } as Variants,

    staggerContainer: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: reducedMotion ? 0 : 0.12,
                delayChildren: reducedMotion ? 0 : 0.3
            }
        }
    } as Variants,

    scaleIn: {
        hidden: { scale: reducedMotion ? 1 : 0.95, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: reducedMotion ? 0.2 : 0.5 }
        }
    } as Variants,
});

export default function HomeContent() {
    const { isMobile, reducedMotion } = usePerformancePrefs();
    const animations = useMemo(() => createAnimations(reducedMotion), [reducedMotion]);

    // ===== OPTIMIZACIÓN: useScroll se llama siempre (no admite prop disabled) =====
    const scrollData = useScroll();
    const yBackground = useTransform(scrollData.scrollYProgress, [0, 1], ["0%", "25%"]);

    const [activeSection, setActiveSection] = useState('hero');
    const { ref: serviciosRef } = useSectionTracker({
        sectionId: 'servis-Home',
        sectionName: 'servis-Home',
        minReadTime: 3000,
        onEngagement: (data) => {
            if (data.eventType === 'read') {
                console.log('🎯 Usuario leyó serviciosHome');
            }
        },
    });

    // ===== OPTIMIZACIÓN: Scroll listener throttled para móvil =====
    useEffect(() => {
        if (isMobile || reducedMotion) return;

        let ticking = false;
        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const sections = ['hero', 'servis-Home', 'portfolio', 'cta'];
                    const scrollPosition = window.scrollY + 200;

                    for (const section of sections) {
                        const element = document.getElementById(section);
                        if (element) {
                            const { offsetTop, offsetHeight } = element;
                            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                                setActiveSection(section);
                                break;
                            }
                        }
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isMobile, reducedMotion]);

    // ===== OPTIMIZACIÓN: Datos memoizados =====
    const services = useMemo(() => [
        {
            titulo: "Diseño de Marca",
            descripcion: "Creamos identidades visuales únicas que comunican la esencia de tu marca. Desde el logo hasta la paleta de colores y la tipografía, cada elemento está diseñado para transmitir profesionalismo, confianza y personalidad.",
            imagenSrc: "/d-marca.png",
            alt: "Diseño de Marca",
            icon: Sparkles,
            gradient: "from-amber-500/20 to-orange-500/20",
            delay: 0.4
        },
        {
            titulo: "Desarrollo Web",
            descripcion: "Diseñamos y desarrollamos la plataforma web ideal para tu proyecto con tecnologías de vanguardia, y te proporcionamos las herramientas necesarias para administrarla de manera eficiente.",
            imagenSrc: "/desarrollo.png",
            alt: "Desarrollo Web",
            icon: Zap,
            gradient: "from-purple-500/20 to-pink-500/20",
            delay: 0.5
        },
        {
            titulo: "SEO & Posicionamiento",
            descripcion: "Optimizamos tu sitio web para que sea fácilmente encontrado por los motores de búsqueda, mejorando su visibilidad y atrayendo más tráfico orgánico.",
            imagenSrc: "/seo.png",
            alt: "SEO & Posicionamiento",
            icon: TrendingUp,
            gradient: "from-cyan-500/20 to-blue-500/20",
            delay: 0.6
        },
        {
            titulo: "Soporte Técnico",
            descripcion: "Mantené tu web siempre activa, actualizada y segura con nuestro soporte técnico especializado. Estamos aquí para resolver cualquier inconveniente.",
            imagenSrc: "/soporte-1.png",
            alt: "Soporte Técnico",
            icon: Shield,
            gradient: "from-emerald-500/20 to-teal-500/20",
            delay: 0.7
        },
        {
            titulo: "Consultoría Estratégica",
            descripcion: "Impulsá tu marca con decisiones estratégicas. Te acompañamos con asesoramiento experto para construir, optimizar o redefinir tu presencia digital.",
            imagenSrc: "/consultoria.png",
            alt: "Consultoría Estratégica",
            icon: Star,
            gradient: "from-rose-500/20 to-red-500/20",
            delay: 0.8
        }
    ], []);

    // ===== OPTIMIZACIÓN: Background simplificado para móvil =====
    const BackgroundEffects = useCallback(() => {
        if (reducedMotion) {
            return (
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-black" />
                </div>
            );
        }

        if (isMobile) {
            return (
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/5 via-transparent to-transparent" />
                </div>
            );
        }

        return (
            <div className="fixed inset-0 pointer-events-none">
                <motion.div
                    style={{ y: yBackground }}
                    className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl"
                />
                <motion.div
                    style={{ y: useTransform(scrollData.scrollYProgress, [0, 1], ["0%", "40%"]) }}
                    className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/10 via-transparent to-transparent" />
            </div>
        );
    }, [isMobile, reducedMotion, yBackground, scrollData.scrollYProgress]);

    return (
        <main className={`min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white overflow-x-hidden ${playfair.variable} ${inter.className}`}>

            <BackgroundEffects />

            {/* Scroll Progress Bar - solo desktop */}
            {!isMobile && !reducedMotion && (
                <ScrollProgressBar
                    gradient="from-amber-400 to-amber-600"
                    opacity={1}
                    className="shadow-lg shadow-amber-500/30 z-50"
                />
            )}

            {/* Navigation Dots - solo desktop */}
            {!isMobile && !reducedMotion && (
                <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
                    {['hero', 'serviciosHome', 'portfolio', 'cta'].map((section) => (
                        <a
                            key={section}
                            href={`#${section}`}
                            className={`group relative w-3 h-3 rounded-full transition-all duration-300 ${activeSection === section ? 'bg-amber-400 scale-125' : 'bg-white/20 hover:bg-white/40'
                                }`}
                        >
                            <span className="absolute right-6 top-1/2 -translate-y-1/2 px-3 py-1 bg-gray-800/90 backdrop-blur-sm rounded-lg text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">
                                {section === 'hero' ? 'Inicio' : section === 'serviciosHome' ? 'Servicios' : section === 'portfolio' ? 'Portafolio' : 'Contacto'}
                            </span>
                        </a>
                    ))}
                </nav>
            )}

            {/* HERO SECTION */}
            <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20">


                {/* Glow effect simplificado para móvil */}
                {!reducedMotion && (
                    <div className="absolute inset-0 overflow-hidden">
                        <div className={`absolute top-1/4 left-1/2 -translate-x-1/2 ${isMobile ? 'w-[400px] h-[400px]' : 'w-[800px] h-[800px]'} bg-gradient-to-r from-amber-500/20 to-purple-500/20 rounded-full blur-3xl ${reducedMotion ? '' : 'animate-pulse'}`} />
                    </div>
                )}

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                     <VisitTracker pageName="Home" /> 
                  
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 border border-amber-500/30 rounded-full mb-8"
                    >
                        <Sparkles className="text-amber-400" size={18} />
                        <span className="text-amber-300 text-sm font-medium">
                            +50 marcas transformadas desde 2015
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: reducedMotion ? 0.3 : 0.8, delay: reducedMotion ? 0 : 0.2 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8"
                    >
                        Tu marca merece
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                            ser inolvidable
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: reducedMotion ? 0.3 : 0.8, delay: reducedMotion ? 0 : 0.4 }}
                        className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Diseñamos identidades auténticas, sitios web que convierten y estrategias digitales para emprendedores que <strong className="text-white">quieren destacar con propósito</strong>.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: reducedMotion ? 0.3 : 0.8, delay: reducedMotion ? 0 : 0.6 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <a
                            href="/contact"
                            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-lg rounded-2xl hover:shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 hover:-translate-y-1"
                        >
                            Empezar mi proyecto
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                        </a>
                        <a
                            href="#serviciosHome"
                            className="inline-flex items-center gap-2 px-6 py-4 border border-white/20 rounded-2xl text-white/90 hover:bg-white/5 transition-all duration-300"
                        >
                            Explorar servicios
                        </a>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: reducedMotion ? 0 : 0.8 }}
                        className="mt-16 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400"
                    >
                        <div className="flex items-center gap-2">
                            <CheckCircle className="text-green-400" size={16} />
                            <span>Entrega en tiempo récord</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="text-green-400" size={16} />
                            <span>Soporte 24/7 incluido</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle className="text-green-400" size={16} />
                            <span>100% personalizado</span>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll indicator - solo desktop */}
                {!isMobile && !reducedMotion && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500"
                    >
                        <span className="text-xs uppercase tracking-wider">Scroll</span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center"
                        >
                            <motion.div
                                animate={{ opacity: [1, 0.5, 1], y: [0, 8, 0] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </section>

            {/* SECCIÓN SERVICIOS */}
            <section ref={serviciosRef} id="servis-Home" className="relative py-24 md:py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-300 text-xs uppercase tracking-wider font-semibold mb-4">
                            Nuestros servicios
                        </span>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                            Cómo te ayudamos a <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                                crecer sin límites
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            Soluciones integrales diseñadas para emprendedores que buscan resultados reales, no solo estética.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={animations.staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="space-y-8"
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                variants={animations.fadeInUp}
                                className="group relative"
                            >
                                {/* Glow effect - solo desktop */}
                                {!isMobile && !reducedMotion && (
                                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${service.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                                )}

                                <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-1 border border-white/10">
                                    <ValorDestacado
                                        titulo={service.titulo}
                                        descripcion={service.descripcion}
                                        imagenSrc={service.imagenSrc}
                                        alt={service.alt}
                                        delay={service.delay}
                                        className="rounded-3xl"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTA intermedio */}
                    <motion.div
                        className="text-center mt-20"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-gray-400 mb-6">¿No estás seguro qué necesitas?</p>
                        <a
                            href="/contact"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/20 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
                        >
                            Agendá una consultoría 
                            <ArrowRight size={18} />
                        </a>
                    </motion.div>
                </div>
            </section>

            {/* SECCIÓN PORTFOLIO */}
            <section id="portfolio" className="relative py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Resultados que <span className="text-amber-400">hablan por sí mismos</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Explorá algunos de nuestros proyectos más recientes y descubrí cómo transformamos ideas en marcas memorables.
                        </p>
                    </motion.div>

                    {/* Lazy load ImageAccordion */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: reducedMotion ? 0.3 : 0.6 }}
                    >
                        <ImageAccordion />
                    </motion.div>
                </div>
            </section>

            {/* COMPONENTES ADICIONALES */}
            <ServicioSEO />
            <AplicacionesAMedida />
            <AplicacionesIA />

            {/* CTA FINAL */}
            <section id="cta" className="relative py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        className="relative rounded-3xl overflow-hidden p-8 md:p-16 text-center"
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-gray-900 to-purple-900/30" />
                        <div className="absolute inset-0 bg-[url('/pattern-premium.svg')] opacity-10" />

                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <Star className="mx-auto text-amber-400 mb-6" size={48} />
                                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                    ¿Listo para que tu marca <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                                        deje huella?
                                    </span>
                                </h2>
                                <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
                                    No somos una agencia más. Somos tu aliado estratégico: proceso claro, entregas puntuales y un enfoque 100% personalizado.
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: reducedMotion ? 0 : 0.2 }}
                                className="flex flex-col sm:flex-row items-center justify-center gap-4"
                            >
                                <a
                                    href="/contact"
                                    className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-xl rounded-2xl hover:shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:-translate-y-1"
                                >
                                    🚀 Agendar llamada
                                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={22} />
                                </a>
                                <span className="text-gray-400 text-sm flex items-center gap-2">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    Respuesta en &lt; 24hs
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Floating CTA para mobile - SIEMPRE visible */}
            <motion.div
                className="fixed bottom-6 left-0 right-0 px-6 z-40 md:hidden"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
            >
                <a
                    href="/contact"
                    className="block w-full py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold text-center rounded-2xl shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-shadow"
                >
                    Empezar mi proyecto →
                </a>
            </motion.div>
        </main>
    );
}