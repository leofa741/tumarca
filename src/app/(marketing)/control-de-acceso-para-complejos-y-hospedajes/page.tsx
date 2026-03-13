'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FormContactLanding from '../components/FormContactLanding';
import {
    CheckCircle, XCircle, Shield, TrendingUp, Users, Smartphone,
    BarChart2, Mail, Phone, Sun, Moon, Key, Building2, DoorOpen, Spool
} from 'lucide-react';
import VisitCounter from '../components/VisitCounter';
import VisitTracker from '../components/VisitTracker';
import { useSectionTracker } from '../components/useSectionTracker';
import { trackClick } from '@/lib/rackClick';



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
                        <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/30 px-4 py-2 rounded-full">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <VisitCounter />
                            <VisitTracker pageName="control-acceso-complejos-hospedaje-landing" />
                            <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                                ¿Tu complejo necesita más seguridad y control?
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                            Control de acceso inteligente para <span className="text-emerald-600 dark:text-emerald-400">complejos y hospedajes</span>
                        </h1>

                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
                            Gestioná el acceso a cabañas, habitaciones, oficinas e instalaciones comunes
                            (pileta, gimnasio, sector VIP) con tecnología RFID y móvil.
                            <span className="font-medium text-emerald-600 dark:text-emerald-400"> Sin cuotas mensuales ocultas.</span>
                        </p>

                        {/* Antes / Después */}
                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-5 rounded-2xl">
                                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-3">
                                    <XCircle size={20} />
                                    <h4 className="font-bold">Antes</h4>
                                </div>
                                <ul className="text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                                    <li className="flex items-start gap-2"><span>•</span> Control manual de llaves y registros en papel</li>
                                    <li className="flex items-start gap-2"><span>•</span> Acceso no autorizado a áreas restringidas</li>
                                    <li className="flex items-start gap-2"><span>•</span> Dificultad para gestionar huéspedes temporales</li>
                                </ul>
                            </div>
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-5 rounded-2xl">
                                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-3">
                                    <CheckCircle size={20} />
                                    <h4 className="font-bold">Después</h4>
                                </div>
                                <ul className="text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                                    <li className="flex items-start gap-2"><span>•</span> Acceso con <span className="font-bold">tag o móvil</span> en segundos</li>
                                    <li className="flex items-start gap-2"><span>•</span> Permisos por zona y horario automatizados</li>
                                    <li className="flex items-start gap-2"><span>•</span> Registro digital de cada ingreso y egreso</li>
                                </ul>
                            </div>
                        </div>

                        {/* Beneficios clave */}
                        <div className="flex flex-wrap gap-3 mt-6">
                            <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium">Sin cuotas mensuales</span>
                            <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium">Instalación incluida</span>
                            <span className="bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-4 py-1.5 rounded-full text-sm font-medium">Soporte 24/7</span>
                        </div>

                        {/* CTA Principal */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleConsultarClick('hero', 'consultar_principal')}
                            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl"
                        >
                            Consultar →
                        </motion.button>


                    </motion.div>

                    {/* Formulario */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
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
                                Recibí una propuesta personalizada sin compromiso
                            </p>
                        </div>
                        <FormContactLanding />
                    </motion.div>
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
                            Tecnología adaptable a cabañas, hoteles, oficinas y espacios compartidos
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Shield className="w-8 h-8" />, title: "Seguridad por zonas", desc: "Controlá quién accede a pileta, gimnasio, sector VIP o áreas administrativas", color: "text-emerald-500" },
                            { icon: <TrendingUp className="w-8 h-8" />, title: "Gestión simplificada", desc: "Activá o desactivá accesos remotamente sin cambiar cerraduras físicas", color: "text-blue-500" },
                            { icon: <Users className="w-8 h-8" />, title: "Experiencia del huésped", desc: "Check-in digital y acceso autónomo sin esperas en recepción", color: "text-purple-500" },
                            { icon: <Smartphone className="w-8 h-8" />, title: "Acceso móvil opcional", desc: "Permití que tus huéspedes usen su celular como llave digital", color: "text-amber-500" }
                        ].map((b, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700">
                                <div className={`${b.color} mb-6`}>{b.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{b.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{b.desc}</p>
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
                            Una sola plataforma para gestionar todos tus accesos
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Cabañas y hospedajes", desc: "Control de acceso a unidades individuales y áreas comunes", icon: <Building2 className="w-8 h-8" />, gradient: "from-emerald-500 to-teal-600" },
                            { title: "Instalaciones compartidas", desc: "Pileta, gimnasio, quincho, sector VIP con permisos configurables", icon: <Spool className="w-8 h-8" />, gradient: "from-blue-500 to-cyan-600" },
                            { title: "Oficinas y coworking", desc: "Acceso diferenciado para empleados, clientes y visitas", icon: <DoorOpen className="w-8 h-8" />, gradient: "from-purple-500 to-indigo-600" }
                        ].map((s, i) => (
                            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl hover:border-emerald-300 dark:hover:border-emerald-700 transition-all">
                                <div className={`mb-6 p-4 rounded-xl bg-gradient-to-r ${s.gradient} bg-opacity-10 w-fit`}>{s.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{s.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{s.desc}</p>
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
                            Control total y trazabilidad en tiempo real para tu complejo
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {[
                            { icon: <Key className="w-7 h-7" />, title: "Permisos por zona y horario", desc: "Configurá accesos por huésped, empleado o proveedor", color: "text-emerald-500" },
                            { icon: <Smartphone className="w-7 h-7" />, title: "Accesos temporales", desc: "Credenciales con vencimiento automático para visitas", color: "text-blue-500" },
                            { icon: <BarChart2 className="w-7 h-7" />, title: "Reportes de uso", desc: "Flujo de personas, horarios pico y ocupación en tiempo real", color: "text-purple-500" },
                            { icon: <Shield className="w-7 h-7" />, title: "Alertas de seguridad", desc: "Notificaciones ante accesos no autorizados", color: "text-red-500" }
                        ].map((f, i) => (
                            <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="flex items-start space-x-4 bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                                <div className={`${f.color} p-2 bg-opacity-10 rounded-lg mt-1`}>{f.icon}</div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{f.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para llevar tu complejo al siguiente nivel?</h2>
                    <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                        Soluciones personalizadas según infraestructura, unidades y necesidades de seguridad
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleConsultarClick('cta_final', 'consultar_final')}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl"
                    >
                        Solicitar propuesta →
                    </motion.button>
                    <p className="text-sm opacity-80 mt-6 max-w-md mx-auto">
                        ✅ Diagnóstico técnico sin costo<br />
                        ✅ Plan de implementación escalable<br />
                        ✅ Capacitación y soporte incluido
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-300 border-t border-gray-800">
                <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
                    <div>
                        <div className="font-bold text-2xl text-white mb-4">tumarca.ar</div>
                        <p className="max-w-xs">Soluciones de control de acceso a medida para complejos, hospedajes y espacios compartidos.</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white mb-4">Contacto</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3"><Mail className="w-5 h-5 text-emerald-400" /><span>hola@tumarca.ar</span></div>
                            <div className="flex items-center gap-3"><Phone className="w-5 h-5 text-emerald-400" /><span>11-4146-1312</span></div>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white mb-4">Puentes Digitales</h3>
                        <p className="mb-2">info@puentesdigitales.com.ar</p>
                        <span className="inline-block bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm">
                            Desarrollo web • IoT • Seguridad • Automatización
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