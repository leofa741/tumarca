'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FormContactLanding from '../components/FormContactLanding';
import {
    CheckCircle, XCircle, Shield, TrendingUp, Users, Smartphone,
    BarChart2, Mail, Phone, Key, Building2, DoorOpen, 
    Zap, LayoutDashboard, WifiOff, Clock, AlertTriangle
} from 'lucide-react';
import VisitCounter from '../components/VisitCounter';
import VisitTracker from '../components/VisitTracker';
import { useSectionTracker } from '../components/useSectionTracker';
import { trackClick } from '@/lib/rackClick'; // Asumo que es trackClick, corregido de 'rackClick' si fue typo

const AccessControlComplexLanding = () => {
    const [darkMode, setDarkMode] = useState(false);

    // 🔆 Dark mode: preferencia del sistema + persistencia
    useEffect(() => {
        const saved = localStorage.getItem('darkMode');
        if (saved !== null) {
            setDarkMode(saved === 'true');
        } else {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setDarkMode(prefersDark);
        }
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('darkMode', 'true');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('darkMode', 'false');
        }
    }, [darkMode]);

    // 📊 Trackers de sección
    const { ref: beneficiosRef } = useSectionTracker({
        sectionId: 'beneficios-rfid',
        sectionName: 'beneficios_principales-rfid',
        minReadTime: 4000,
        onEngagement: (data) => {
            if (data.eventType === 'read') console.log('🎯 Usuario leyó beneficios');
        },
    });

    const { ref: funcionesRef } = useSectionTracker({
        sectionId: 'funciones-rfid',
        sectionName: 'funciones-rfid',
        minReadTime: 4000,
        onEngagement: (data) => {
            if (data.eventType === 'read') console.log('🎯 Usuario leyó funciones');
        },
    });

    // 🎯 Handler reutilizable para CTAs
    const handleConsultarClick = (section: string, button: string) => {
        trackClick('consultar_click', { section, button });
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">

            {/* Hero Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Contenido principal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-800">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <VisitCounter />
                            <VisitTracker pageName="control-acceso-complejos-hospedaje-landing" />
                            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                ¿Tu complejo necesita más seguridad y control?
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900 dark:text-white">
                            Control de acceso inteligente para <span className="text-emerald-600 dark:text-emerald-400">complejos y hospedajes</span>
                        </h1>

                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
                            Gestioná el acceso a cabañas, habitaciones y áreas comunes con nuestro sistema <span className="font-semibold text-gray-900 dark:text-white">RFID + Panel Web</span>. 
                            Diseñado con hardware de memoria local: <span className="font-bold text-emerald-600 dark:text-emerald-400">funciona incluso si se corta la luz o el WiFi.</span> Sin cuotas mensuales ocultas.
                        </p>

                        {/* Antes / Después */}
                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-5 rounded-2xl">
                                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-3">
                                    <XCircle size={20} />
                                    <h4 className="font-bold">Antes</h4>
                                </div>
                                <ul className="text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                                    <li className="flex items-start gap-2"><span>•</span> Control manual de llaves físicas y registros en papel</li>
                                    <li className="flex items-start gap-2"><span>•</span> Acceso no autorizado por copias de llaves</li>
                                    <li className="flex items-start gap-2"><span>•</span> Dependencia total de internet o electricidad</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-5 rounded-2xl">
                                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-3">
                                    <CheckCircle size={20} />
                                    <h4 className="font-bold">Después</h4>
                                </div>
                                <ul className="text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                                    <li className="flex items-start gap-2"><span>•</span> Acceso con <span className="font-bold">tag RFID</span> en segundos (funciona offline)</li>
                                    <li className="flex items-start gap-2"><span>•</span> Panel web para dueños: aperturas remotas y auditoría</li>
                                    <li className="flex items-start gap-2"><span>•</span> Revocación instantánea de accesos perdidos</li>
                                </ul>
                            </div>
                        </div>

                        {/* Beneficios clave (Badges) */}
                        <div className="flex flex-wrap gap-3 mt-6">
                            <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium border border-emerald-200 dark:border-emerald-800">Sin cuotas mensuales</span>
                            <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium border border-emerald-200 dark:border-emerald-800">Funciona sin internet</span>
                            <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium border border-emerald-200 dark:border-emerald-800">Soporte 24/7</span>
                        </div>

                        {/* CTA Principal */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleConsultarClick('hero', 'consultar_principal')}
                            className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-amber-500/20 transition-all"
                        >
                            Solicitar demo y presupuesto →
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
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl blur-2xl opacity-20 dark:opacity-30"></div>
                            <img 
                                src="/Control de acceso inteligente en resort.png" 
                                alt="Control de Acceso Inteligente para Complejos y Hospedajes - Sistema RFID con cerraduras digitales y acceso web"
                                className="relative rounded-3xl shadow-2xl border-4 border-white dark:border-gray-700 w-full object-cover"
                            />
                            {/* Badge flotante */}
                            <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                                className="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 border-2 border-emerald-500 flex items-center gap-3"
                            >
                                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
                                    <WifiOff className="w-5 h-5 text-green-600 dark:text-green-400" />
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 dark:text-white text-sm">Modo Offline Activo</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">El acceso no se detiene</div>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Formulario */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            id="contact"
                            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8"
                        >
                            <div className="text-center mb-8">
                                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl mx-auto mb-4">
                                    <Building2 className="w-7 h-7 text-white" />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    Modernizá tu complejo hoy
                                </h2>
                                <p className="text-gray-500 dark:text-gray-400">
                                    Recibí una propuesta técnica personalizada sin compromiso
                                </p>
                            </div>
                            <FormContactLanding />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Beneficios */}
            <section ref={beneficiosRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            ¿Por qué elegir nuestro sistema?
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Tecnología propia, adaptable y diseñada para la realidad de la infraestructura turística.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { 
                                icon: <WifiOff className="w-8 h-8" />, 
                                title: "Resiliencia Offline (ESP32)", 
                                desc: "Las credenciales se guardan en la memoria local de la placa. Si se va la luz o el WiFi, el tag RFID sigue abriendo la puerta.", 
                                color: "text-emerald-500" 
                            },
                            { 
                                icon: <LayoutDashboard className="w-8 h-8" />, 
                                title: "Panel Administrativo Web", 
                                desc: "Toma el control desde tu PC o celular. Abrí puertas remotamente, gestioná usuarios y revisá el historial en tiempo real.", 
                                color: "text-blue-500" 
                            },
                            { 
                                icon: <Shield className="w-8 h-8" />, 
                                title: "Seguridad por Zonas", 
                                desc: "Controlá quién accede a cabañas, piletas, gimnasios o sectores VIP con tags reutilizables y de baja fricción.", 
                                color: "text-purple-500" 
                            },
                            { 
                                icon: <AlertTriangle className="w-8 h-8" />, 
                                title: "Aperturas de Emergencia", 
                                desc: "Protocolos de seguridad integrados y mecanismos de apertura manual que garantizan el acceso en situaciones excepcionales.", 
                                color: "text-amber-500" 
                            }
                        ].map((b, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700 group hover:border-emerald-500/50">
                                <div className={`${b.color} mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-xl w-fit group-hover:scale-110 transition-transform`}>{b.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{b.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{b.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Espacios Compatibles */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Ideal para múltiples espacios
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Una sola plataforma modular para gestionar todos tus accesos
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Cabañas y hospedajes", desc: "Control de acceso a unidades individuales con entrega de tag al llegar.", icon: <Building2 className="w-8 h-8" />, gradient: "from-emerald-500 to-teal-600" },
                            { title: "Instalaciones compartidas", desc: "Pileta, gimnasio, quincho o sector VIP con permisos configurables por horario.", icon: <Users className="w-8 h-8" />, gradient: "from-blue-500 to-cyan-600" },
                            { title: "Oficinas y mantenimiento", desc: "Acceso diferenciado y auditado para empleados, limpieza y proveedores.", icon: <DoorOpen className="w-8 h-8" />, gradient: "from-purple-500 to-indigo-600" }
                        ].map((s, i) => (
                            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
                                <div className={`mb-6 p-4 rounded-xl bg-gradient-to-r ${s.gradient} bg-opacity-10 dark:bg-opacity-20 w-fit text-white`}>{s.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{s.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Funciones */}
            <section ref={funcionesRef} className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800/50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Funciones esenciales del sistema
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Control total, trazabilidad y tecnología que se adapta a tus necesidades
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {[
                            { icon: <LayoutDashboard className="w-7 h-7" />, title: "Panel de Control para Dueños", desc: "Gestioná accesos, asigná roles (Admin, Limpieza, Huésped) y abrí puertas de forma remota.", color: "text-emerald-500" },
                            { icon: <Key className="w-7 h-7" />, title: "Revocación Instantánea", desc: "¿Se perdió un tag? Desactivadlo con un clic desde el panel web. Sin costos de reemplazo de cerraduras.", color: "text-blue-500" },
                            { icon: <BarChart2 className="w-7 h-7" />, title: "Auditoría en Tiempo Real", desc: "Registro digital exacto de qué credencial abrió qué puerta y a qué hora. Exportable.", color: "text-purple-500" },
                            { icon: <Clock className="w-7 h-7" />, title: "Roadmap: QR y PIN", desc: "Desarrollo activo de integración con códigos QR dinámicos y teclados PIN para check-in 100% digital.", color: "text-amber-500" }
                        ].map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="flex items-start space-x-4 bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                                <div className={`${f.color} p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mt-1 flex-shrink-0`}>{f.icon}</div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{f.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-teal-700 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para llevar tu complejo al siguiente nivel?</h2>
                    <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                        Soluciones personalizadas según tu infraestructura, cantidad de unidades y necesidades de seguridad.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleConsultarClick('cta_final', 'consultar_final')}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-black/20 transition-all"
                    >
                        Solicitar propuesta técnica →
                    </motion.button>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm opacity-90 mt-8">
                        <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Diagnóstico técnico sin costo</span>
                        <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Plan de implementación escalable</span>
                        <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Capacitación y soporte incluido</span>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-300 border-t border-gray-800">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    <div>
                        <div className="font-bold text-2xl text-white mb-4">tumarca.ar</div>
                        <p className="max-w-xs text-sm leading-relaxed">Soluciones de control de acceso a medida para complejos, hospedajes y espacios compartidos. Tecnología propia, segura y escalable.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white mb-4">Contacto</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-emerald-400" /><a href="mailto:hola@tumarca.ar" className="hover:text-emerald-400 transition-colors">hola@tumarca.ar</a></div>
                            <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-emerald-400" /><a href="tel:+5491141461312" className="hover:text-emerald-400 transition-colors">11-4146-1312</a></div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white mb-4">Puentes Digitales</h3>
                        <p className="mb-3 text-sm">info@puentesdigitales.com.ar</p>
                        <span className="inline-block bg-emerald-500/20 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-medium border border-emerald-500/30">
                            Desarrollo Web • IoT • Seguridad • Automatización
                        </span>
                    </div>
                </div>
                <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} tumarca.ar + Puentes Digitales. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default AccessControlComplexLanding;