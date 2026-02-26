'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FormContactLanding from '../components/FormContactLanding';
import {
  CheckCircle, XCircle, ArrowRight, Shield, TrendingUp,
  Users, Smartphone, BarChart2, Mail, Phone, Sun, Moon
} from 'lucide-react';
import VisitCounter from '../components/VisitCounter';
import VisitTracker from '../components/VisitTracker';
import { useSectionTracker } from '../components/useSectionTracker';

const GymAccessLanding = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Detectar preferencia del sistema al cargar
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Aplicar dark mode al DOM
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  const { ref: beneficiosRef } = useSectionTracker({
  sectionId: 'beneficios',
  sectionName: 'beneficios_principales',
  minReadTime: 4000, // 4 segundos para considerar lectura
  onEngagement: (data) => {
    // Opcional: lógica extra en cliente
    if (data.eventType === 'read') {
      console.log('🎯 Usuario leyó beneficios');
    }
  },
});

  const { ref: funcionesRef } = useSectionTracker({
  sectionId: 'funciones',
  sectionName: 'funciones ',
  minReadTime: 4000, // 4 segundos para considerar lectura
  onEngagement: (data) => {
    // Opcional: lógica extra en cliente
    if (data.eventType === 'read') {
      console.log('🎯 Usuario leyó funciones');
    }
  },
});

  return (

    
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">

      {/* Header con toggle de dark mode */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-xl px-4 py-2 rounded-xl shadow-md">
                tumarca.ar
              </div>
              <span className="text-gray-400 dark:text-gray-500">+</span>
              <div className="text-gray-700 dark:text-gray-300 font-semibold">
                Puentes Digitales
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Layout único con formulario integrado */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <VisitCounter />
          <VisitTracker
            pageName="sistema-de-control-de-acceso-para-gimnasios-landing"
          />
          {/* Contenido principal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Queres que tu gimnasio sea más eficiente? </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Transformá la gestión de tu gimnasio con <span className="text-blue-600 dark:text-blue-400">tecnología inteligente</span>
            </h1>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl">
              Sistema de control de acceso RFID con máxima seguridad, eficiencia y comodidad.
              <span className="font-medium text-blue-600 dark:text-blue-400"> Sin cuotas mensuales ocultas.</span>
            </p>

            {/* Antes / Después */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-5 rounded-2xl">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-3">
                  <XCircle size={20} />
                  <h4 className="font-bold">Antes</h4>
                </div>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span>•</span> Colas en recepción durante horas pico
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span> Fraude con membresías compartidas
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span> Personal sobredimensionado
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-5 rounded-2xl">
                <div className="flex items-center gap-2 text-green-600 dark:text-green-400 mb-3">
                  <CheckCircle size={20} />
                  <h4 className="font-bold">Después</h4>
                </div>
                <ul className="text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span>•</span> Ingreso en <span className="font-bold">1 segundo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span> Control anti-fraude automático
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span> Ahorro del <span className="font-bold">60%</span> en personal
                  </li>
                </ul>
              </div>
            </div>

            {/* Beneficios clave */}
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium">Sin cuotas mensuales</span>
              <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium">Instalación incluida</span>
              <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium">Soporte 24/7</span>
            </div>

            {/* CTA secundario */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={async () => {
                // Track click inline
                try {
                  await fetch('/api/track-click', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      eventName: 'hero_consultar',
                      section: 'hero',
                      button: 'consultar'
                    }),
                  });
                  console.log('✅ Clic trackeado: hero_consultar');
                } catch (error) {
                  console.error('Error trackeando clic:', error);
                }
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl"
            >
              Consultar →
            </motion.button>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              ⚠️ Solo 3 instalaciones disponibles este mes
            </p>
          </motion.div>

          {/* Formulario integrado - Diseño premium */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            id="contact-form"
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mx-auto mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Modernizá tu gimnasio hoy
              </h2>
              <p className="text-gray-500 dark:text-gray-400">
                Recibí una propuesta personalizada sin compromiso
              </p>
            </div>

            <FormContactLanding />
          </motion.div>
        </div>
      </section>

      {/* Beneficios Principales */}
      <section 
      ref={beneficiosRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              ¿Por qué elegir nuestro sistema?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tecnología inteligente adaptada a las necesidades específicas de cada gimnasio
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Reducción de fraudes",
                desc: "Evita el uso no autorizado de membresías con autenticación única por RFID",
                color: "text-red-500"
              },
              {
                icon: <TrendingUp className="w-8 h-8" />,
                title: "Ahorro operativo",
                desc: "Reduce la necesidad de personal en recepción y automatiza tareas repetitivas",
                color: "text-green-500"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Experiencia del socio",
                desc: "Ingreso rápido, sin colas ni trámites manuales",
                color: "text-blue-500"
              },
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Integración total",
                desc: "Compatible con tus sistemas de facturación, CRM o software de gestión actual",
                color: "text-purple-500"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
              >
                <div className={`${benefit.color} mb-6`}>
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tipos de Acceso */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Tipos de acceso disponibles
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Soluciones flexibles para cada necesidad de tu gimnasio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Tarjetas o tags RFID",
                desc: "Validación rápida y segura mediante lectores por proximidad en puertas y zonas comunes",
                svg: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-500">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ),
                gradient: "from-blue-500 to-blue-600"
              },
              {
                title: "Puertas automáticas",
                desc: "Apertura controlada desde dispositivos móviles o sistemas centralizados",
                svg: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-purple-500">
                    <path d="M5 12h14M5 12l4-4M5 12l4 4M19 12l-4-4M19 12l-4 4" />
                  </svg>
                ),
                gradient: "from-purple-500 to-purple-600"
              },
              {
                title: "Lectores RFID",
                desc: "Instalación en puntos estratégicos para control preciso del acceso",
                svg: (
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-green-500">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
                  </svg>
                ),
                gradient: "from-green-500 to-green-600"
              }
            ].map((access, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-8 rounded-2xl hover:border-blue-300 dark:hover:border-blue-700 transition-all"
              >
                <div className={`mb-6 p-4 rounded-xl bg-gradient-to-r ${access.gradient} bg-opacity-10 w-fit`}>
                  {access.svg}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{access.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{access.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Funciones Esenciales */}
      <section 
      ref={funcionesRef}
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Funciones esenciales del sistema
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Control total y trazabilidad en tiempo real
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <CheckCircle className="w-7 h-7" />,
                title: "Autenticación segura",
                desc: "Identificación precisa del socio antes de permitir el acceso",
                color: "text-green-500"
              },
              {
                icon: <CheckCircle className="w-7 h-7" />,
                title: "Autorización automática",
                desc: "Ingreso inmediato si el usuario tiene permisos vigentes",
                color: "text-green-500"
              },
              {
                icon: <BarChart2 className="w-7 h-7" />,
                title: "Trazabilidad en tiempo real",
                desc: "Monitoreo continuo del flujo de personas para control de aforo y horarios",
                color: "text-blue-500"
              },
              {
                icon: <Mail className="w-7 h-7" />,
                title: "Alertas inteligentes",
                desc: "Notificaciones ante intentos de acceso no autorizado o tarjetas bloqueadas",
                color: "text-red-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-4 bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
              >
                <div className={`${feature.color} p-2 bg-opacity-10 rounded-lg mt-1`}>
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final - Urgencia controlada */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para modernizar tu gimnasio?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
            Diseñamos soluciones personalizadas basadas en tu presupuesto, infraestructura y objetivos estratégicos
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={async () => {
              // Track click inline
              try {
                await fetch('/api/track-click', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    eventName: 'hero_consultar',
                    section: 'hero',
                    button: 'consultar'
                  }),
                });
                console.log('✅ Clic trackeado: hero_consultar');
              } catch (error) {
                console.error('Error trackeando clic:', error);
              }
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl"
          >
            Consultar →
          </motion.button>

          <p className="text-sm opacity-80 mt-6 max-w-md mx-auto">
            ✅ Auditoría técnica gratuita<br />
            ✅ Plan de implementación personalizado<br />
            ✅ Soporte post-instalación incluido
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-300 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="font-bold text-2xl text-white mb-4">tumarca.ar</div>
              <p className="max-w-xs">
                Soluciones tecnológicas a medida para potenciar tu negocio con innovación y eficiencia.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg text-white mb-4">Contacto</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span>hola@tumarca.ar</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-blue-400" />
                  <span>11-4146-1312</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg text-white mb-4">Puentes Digitales</h3>
              <p className="mb-2">info@puentesdigitales.com.ar</p>
              <div className="mt-4">
                <span className="inline-block bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                  Desarrollo web • Branding • SEO • Marketing
                </span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} tumarca.ar + Puentes Digitales. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default GymAccessLanding;