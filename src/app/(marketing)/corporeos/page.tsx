'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FormContactLanding from '../components/FormContactLanding';
import {
    CheckCircle, XCircle, Palette, Ruler, Sparkles, Truck,
    Users, Smartphone, BarChart2, Mail, Phone, 
    Building2, Scissors, Layers, Zap, Award, Clock, X
} from 'lucide-react';
import VisitCounter from '../components/VisitCounter';
import VisitTracker from '../components/VisitTracker';
import { useSectionTracker } from '../components/useSectionTracker';
import { trackClick } from '@/lib/rackClick';

const GraficaComercialLanding = () => {
    const [hasSeenLanding, setHasSeenLanding] = useState(false);
    const [showBanner, setShowBanner] = useState(false);

    // 🌙 DARK MODE FORZADO: Siempre activo, sin toggle, sin detectar sistema
    useEffect(() => {
        // Forzar clase 'dark' en el html
        document.documentElement.classList.add('dark');
        
        // Opcional: guardar en localStorage por consistencia (aunque ya no se usa toggle)
        localStorage.setItem('darkMode', 'true');
        
        // Cleanup: no removemos la clase al desmontar para evitar FOUC en navegación
        return () => {
            // Si querés que otras páginas no tengan dark mode, descomentá:
            // document.documentElement.classList.remove('dark');
        };
    }, []);

    // 🎯 Lógica para detectar primera visita y mostrar banner
    useEffect(() => {
        const LANDING_KEY = 'grafica_comercial_landing_seen';
        const BANNER_KEY = 'grafica_comercial_banner_dismissed';
        const LAST_VISIT_KEY = 'grafica_comercial_last_visit';
        
        const bannerDismissed = localStorage.getItem(BANNER_KEY);
        const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
        const sevenDays = 7 * 24 * 60 * 60 * 1000; // 7 días en ms
        
        const shouldShowBanner = () => {
            if (bannerDismissed === 'true') return false;
            if (!lastVisit) return true;
            return Date.now() - parseInt(lastVisit) > sevenDays;
        };
        
        if (shouldShowBanner()) {
            localStorage.setItem(LANDING_KEY, 'true');
            localStorage.setItem(LAST_VISIT_KEY, Date.now().toString());
            const timer = setTimeout(() => setShowBanner(true), 2000);
            return () => clearTimeout(timer);
        } else {
            setHasSeenLanding(true);
        }
    }, []);

    const dismissBanner = () => {
        setShowBanner(false);
        localStorage.setItem('grafica_comercial_banner_dismissed', 'true');
    };

    const handleBannerCTAClick = () => {
        trackClick('banner_cta_click', { location: 'sticky_banner' });
        dismissBanner();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    // 📊 Trackers de sección
    const { ref: materialesRef } = useSectionTracker({
        sectionId: 'materiales-grafica',
        sectionName: 'materiales_y_tecnicas-grafica',
        minReadTime: 4000,
        onEngagement: (data) => {
            if (data.eventType === 'read') console.log('🎯 Usuario leyó materiales');
        },
    });

    const { ref: aplicacionesRef } = useSectionTracker({
        sectionId: 'aplicaciones-grafica',
        sectionName: 'aplicaciones-grafica',
        minReadTime: 4000,
        onEngagement: (data) => {
            if (data.eventType === 'read') console.log('🎯 Usuario leyó aplicaciones');
        },
    });

    // 🎯 Handler reutilizable para CTAs
    const handleConsultarClick = (section: string, button: string) => {
        trackClick('consultar_click', { section, button });
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 transition-colors duration-300">

            {/* 🚨 Banner Sticky de CTA - Solo para primeras visitas */}
            <AnimatePresence>
                {showBanner && (
                    <motion.div
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-violet-700 to-fuchsia-800 text-white shadow-lg border-b border-white/10"
                    >
                        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <Sparkles className="w-5 h-5 text-amber-300 flex-shrink-0" />
                                <p className="text-sm md:text-base font-medium">
                                    ¡Hola! 👋 ¿Listo para concretar tu proyecto de gráfica comercial?
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleBannerCTAClick}
                                    className="bg-white text-violet-700 px-4 py-2 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
                                >
                                    Cotizar ahora →
                                </button>
                                <button
                                    onClick={dismissBanner}
                                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                                    aria-label="Cerrar banner"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className={`relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-7xl mx-auto ${showBanner ? 'mt-16' : ''}`}>
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Contenido principal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-violet-900/40 px-4 py-2 rounded-full border border-violet-700/50">
                            <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse"></div>
                            <VisitCounter />
                            <VisitTracker pageName="grafica-comercial-landing" />
                            <span className="text-sm font-medium text-violet-200">
                                ¿Tu marca necesita destacar en el mundo físico?
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
                            Corpóreos y gráfica comercial que <span className="text-violet-400">hacen hablar a tu marca</span>
                        </h1>

                        <p className="text-lg text-gray-300 max-w-xl">
                            Especialistas en letras corpóreas en <span className="font-semibold text-white">Polifan y MDF</span>, 
                            ploteos de corte en vinilo y banners de alto impacto. 
                            <span className="font-medium text-violet-300"> Calidad profesional, entrega rápida.</span>
                        </p>

                        {/* Materiales Destacados */}
                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            <div className="bg-violet-900/30 border border-violet-700/50 p-5 rounded-2xl">
                                <div className="flex items-center gap-2 text-violet-300 mb-3">
                                    <Layers size={20} />
                                    <h4 className="font-bold text-white">Polifan Premium</h4>
                                </div>
                                <ul className="text-gray-300 space-y-2 text-sm">
                                    <li className="flex items-start gap-2"><span>•</span> Liviano y fácil de instalar</li>
                                    <li className="flex items-start gap-2"><span>•</span> Corte láser de precisión</li>
                                    <li className="flex items-start gap-2"><span>•</span> Ideal para interiores y ferias</li>
                                </ul>
                            </div>
                            <div className="bg-amber-900/30 border border-amber-700/50 p-5 rounded-2xl">
                                <div className="flex items-center gap-2 text-amber-300 mb-3">
                                    <Building2 size={20} />
                                    <h4 className="font-bold text-white">MDF Terminado</h4>
                                </div>
                                <ul className="text-gray-300 space-y-2 text-sm">
                                    <li className="flex items-start gap-2"><span>•</span> Acabado pintado o laminado</li>
                                    <li className="flex items-start gap-2"><span>•</span> Resistentes para exteriores</li>
                                    <li className="flex items-start gap-2"><span>•</span> Elegancia para locales y oficinas</li>
                                </ul>
                            </div>
                        </div>

                        {/* Badges de valor */}
                        <div className="flex flex-wrap gap-3 mt-6">
                            <span className="bg-violet-900/40 text-violet-200 px-4 py-1.5 rounded-full text-sm font-medium border border-violet-700/50">Corte incluido</span>
                            <span className="bg-violet-900/40 text-violet-200 px-4 py-1.5 rounded-full text-sm font-medium border border-violet-700/50">Instalación disponible</span>
                            <span className="bg-violet-900/40 text-violet-200 px-4 py-1.5 rounded-full text-sm font-medium border border-violet-700/50">Entrega express</span>
                        </div>

                        {/* CTA Principal */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleConsultarClick('hero', 'cotizar_principal')}
                            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow"
                        >
                            Cotizar mi proyecto →
                        </motion.button>

                    </motion.div>

                    {/* Columna derecha - Imagen y Formulario */}
                    <div className="space-y-8">
                        {/* Imagen del sistema */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-700 rounded-3xl blur-2xl opacity-30"></div>
                            <img 
                                src="/corporeos-polifan-mdf-banner..png" 
                                alt="Corpóreos en Polifan y MDF, ploteos en vinilo y banners para gráfica comercial"
                                className="relative rounded-3xl shadow-2xl border-4 border-gray-700 w-full object-cover"
                            />
                            {/* Badge flotante */}
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                                className="absolute -bottom-4 -right-4 bg-gray-800 rounded-2xl shadow-xl p-4 border-2 border-violet-500"
                            >
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 text-amber-400" />
                                    <span className="font-bold text-white">Acabado Premium</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Formulario */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            id="contact"
                            className="bg-gray-800 rounded-3xl shadow-xl border border-gray-700 p-6 sm:p-8"
                        >
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl mx-auto mb-4">
                                    <Palette className="w-7 h-7 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-white mb-2">
                                    Convertí tu idea en realidad
                                </h2>
                                <p className="text-gray-400">
                                    Envianos tu diseño o idea y recibí una cotización sin compromiso
                                </p>
                            </div>
                            <FormContactLanding />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Materiales y Técnicas */}
            <section ref={materialesRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Materiales que marcan la diferencia
                        </h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Trabajamos con insumos de primera calidad para garantizar durabilidad y presencia
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { 
                                icon: <Layers className="w-8 h-8" />, 
                                title: "Polifan de alta densidad", 
                                desc: "Corte limpio, bordes perfectos y superficie ideal para pintar o vinilar", 
                                color: "text-violet-400" 
                            },
                            { 
                                icon: <Building2 className="w-8 h-8" />, 
                                title: "MDF pintado/laminado", 
                                desc: "Resistencia y elegancia para señalética permanente en exteriores e interiores", 
                                color: "text-amber-400" 
                            },
                            { 
                                icon: <Scissors className="w-8 h-8" />, 
                                title: "Vinilo de corte", 
                                desc: "Precisión milimétrica para logos, frases y decoración en cualquier superficie", 
                                color: "text-emerald-400" 
                            },
                            { 
                                icon: <Zap className="w-8 h-8" />, 
                                title: "Banners y lonas", 
                                desc: "Impresión de alto impacto con resistencia a la intemperie para eventos y locales", 
                                color: "text-fuchsia-400" 
                            }
                        ].map((b, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, y: 20 }} 
                                whileInView={{ opacity: 1, y: 0 }} 
                                viewport={{ once: true }} 
                                transition={{ delay: i * 0.1 }}
                                className="bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-700"
                            >
                                <div className={`${b.color} mb-6`}>{b.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-3">{b.title}</h3>
                                <p className="text-gray-300">{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Aplicaciones / Sectores */}
            <section ref={aplicacionesRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Soluciones para cada espacio
                        </h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Adaptamos cada proyecto a las necesidades de tu negocio o evento
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { 
                                title: "Locales comerciales", 
                                desc: "Cartelería, logos corpóreos y vinilos para vidrieras que atraen clientes", 
                                icon: <Building2 className="w-8 h-8" />, 
                                gradient: "from-violet-600 to-fuchsia-700" 
                            },
                            { 
                                title: "Eventos y ferias", 
                                desc: "Stands, banners y señalética temporal con montaje rápido y desmonte limpio", 
                                icon: <Sparkles className="w-8 h-8" />, 
                                gradient: "from-amber-500 to-orange-600" 
                            },
                            { 
                                title: "Oficinas y empresas", 
                                desc: "Señalética institucional, logos en recepción y gráficos motivacionales", 
                                icon: <Users className="w-8 h-8" />, 
                                gradient: "from-emerald-500 to-teal-600" 
                            }
                        ].map((s, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, scale: 0.95 }} 
                                whileInView={{ opacity: 1, scale: 1 }} 
                                viewport={{ once: true }} 
                                transition={{ delay: i * 0.1 }}
                                className="bg-gray-800 border border-gray-700 p-8 rounded-2xl hover:border-violet-600 transition-all"
                            >
                                <div className={`mb-6 p-4 rounded-xl bg-gradient-to-r ${s.gradient} bg-opacity-20 w-fit`}>
                                    {s.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                                <p className="text-gray-300">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Proceso de Trabajo */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Así trabajamos tu proyecto
                        </h2>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Proceso simple, transparente y enfocado en resultados
                        </p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            { step: "01", icon: <Palette className="w-6 h-6" />, title: "Briefing", desc: "Nos contás tu idea, medidas y ubicación" },
                            { step: "02", icon: <Ruler className="w-6 h-6" />, title: "Cotización", desc: "Te enviamos propuesta con materiales y tiempos" },
                            { step: "03", icon: <Sparkles className="w-6 h-6" />, title: "Producción", desc: "Corte, impresión y acabado con control de calidad" },
                            { step: "04", icon: <Truck className="w-6 h-6" />, title: "Entrega", desc: "Retiro o instalación según lo acordado" }
                        ].map((p, i) => (
                            <motion.div 
                                key={i} 
                                initial={{ opacity: 0, y: 20 }} 
                                whileInView={{ opacity: 1, y: 0 }} 
                                viewport={{ once: true }} 
                                transition={{ delay: i * 0.15 }}
                                className="text-center bg-gray-900 p-6 rounded-2xl border border-gray-700 relative"
                            >
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                                    {p.step}
                                </div>
                                <div className="text-violet-400 mb-4 mt-4 flex justify-center">{p.icon}</div>
                                <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                                <p className="text-gray-300 text-sm">{p.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-violet-700 to-fuchsia-800 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para darle presencia física a tu marca?</h2>
                    <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                        Trabajamos con archivos vectoriales o te ayudamos a adaptar tu diseño para producción
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleConsultarClick('cta_final', 'cotizar_final')}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow"
                    >
                        Empezar mi proyecto →
                    </motion.button>
                    <p className="text-sm opacity-80 mt-6 max-w-md mx-auto">
                        ✅ Asesoramiento técnico sin costo<br />
                        ✅ Archivos de corte incluidos<br />
                        ✅ Garantía de calidad en materiales
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-950 text-gray-300 border-t border-gray-800">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    <div>
                        <div className="font-bold text-2xl text-white mb-4">tumarca.ar</div>
                        <p className="max-w-xs">Gráfica comercial: corpóreos en Polifan y MDF, vinilos de corte y banners de alto impacto.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white mb-4">Contacto</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-violet-400" /><span>hola@tumarca.ar</span></div>
                            <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-violet-400" /><span>11-4146-1312</span></div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white mb-4">Servicios</h3>
                        <ul className="space-y-2 text-sm">
                            <li>• Corpóreos en Polifan y MDF</li>
                            <li>• Vinilos de corte y ploteo</li>
                            <li>• Banners y lonas publicitarias</li>
                            <li>• Instalación y asesoría</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} tumarca.ar. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default GraficaComercialLanding;