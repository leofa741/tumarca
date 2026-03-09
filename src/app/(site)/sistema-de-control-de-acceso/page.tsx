// app/sistema-de-control-de-acceso-para-gimnasios/page.tsx
'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  Shield, Zap, Users, Smartphone, BarChart2, CheckCircle, XCircle,
  ArrowRight, Play, MessageCircle, Phone, Mail, Calendar,
  Lock, Wifi, Database, Bell, TrendingUp, Clock, CreditCard, Key,
  ChevronDown, ExternalLink, Star, Award, Truck, Headphones,
  Fingerprint, Sparkles, Crown, Diamond
} from 'lucide-react';
import FormContactLanding from '@/app/(marketing)/components/FormContactLanding';
import { useSectionTracker } from '@/app/(marketing)/components/useSectionTracker';
import VisitTracker from '@/app/(marketing)/components/VisitTracker';

// ============================================================================
// COMPONENTES REUTILIZABLES PREMIUM - DARK MODE ONLY
// ============================================================================

const GradientBlob = ({ className = '', color = 'blue' }: { className?: string; color?: 'blue' | 'purple' | 'amber' }) => {
  const colorClasses = {
    blue: 'bg-blue-500/30',
    purple: 'bg-purple-500/30',
    amber: 'bg-amber-500/30'
  };
  return (
    <div className={`absolute rounded-full blur-3xl opacity-40 animate-pulse ${colorClasses[color]} ${className}`} />
  );
};

const GlassCard = ({ children, className = '', hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) => (
  <div className={`relative bg-gray-900/60 backdrop-blur-xl rounded-3xl border border-gray-700/50 ${hover ? 'hover:border-amber-500/50 hover:shadow-2xl hover:shadow-amber-500/10' : ''} transition-all duration-500 ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-purple-500/5 opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
    <div className="relative z-10">{children}</div>
  </div>
);

const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  gradient = true
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  align?: 'left' | 'center' | 'right';
  gradient?: boolean;
}) => (
  <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : align === 'right' ? 'ml-auto text-right' : ''}`}>
    <motion.span
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/10 to-purple-500/10 px-4 py-1.5 rounded-full text-sm font-medium text-amber-400 border border-amber-500/20 mb-6"
    >
      <Sparkles className="w-4 h-4" />
      {eyebrow}
    </motion.span>
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 text-white ${gradient ? 'bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent' : ''}`}
    >
      {title}
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="text-lg leading-relaxed text-gray-400"
    >
      {subtitle}
    </motion.p>
  </div>
);

const FeatureCard = ({
  icon,
  title,
  description,
  stats,
  delay
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  stats?: { label: string; value: string }[];
  delay: number
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50 hover:border-amber-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <motion.div
        animate={isHovered ? { scale: 1.1, rotate: 3 } : { scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="relative z-10 w-14 h-14 bg-gradient-to-br from-amber-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-amber-500/25"
      >
        <div className="text-white">
          {icon}
        </div>
      </motion.div>
      <h3 className="relative z-10 text-xl font-bold text-white mb-3 group-hover:text-amber-400 transition-colors">
        {title}
      </h3>
      <p className="relative z-10 text-gray-400 mb-6 leading-relaxed">
        {description}
      </p>
      {stats && (
        <div className="relative z-10 grid grid-cols-2 gap-3 pt-4 border-t border-gray-700/50">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div className="text-lg font-bold text-amber-400">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
      <motion.div
        animate={isHovered ? { x: 5, opacity: 1 } : { x: 0, opacity: 0.7 }}
        className="absolute bottom-6 right-6 text-amber-400"
      >
        <ArrowRight className="w-5 h-5" />
      </motion.div>
    </motion.div>
  );
};

const ComparisonCard = ({
  type,
  items,
  isPositive
}: {
  type: string;
  items: string[];
  isPositive: boolean
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className={`p-6 rounded-2xl border ${
      isPositive
        ? 'bg-green-900/20 border-green-500/30'
        : 'bg-red-900/20 border-red-500/30'
    }`}
  >
    <div className={`flex items-center gap-2 mb-4 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
      {isPositive ? <CheckCircle size={20} /> : <XCircle size={20} />}
      <h4 className="font-bold text-lg">{type}</h4>
    </div>
    <ul className="space-y-3">
      {items.map((item, idx) => (
        <motion.li
          key={idx}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="flex items-start gap-3 text-gray-300"
        >
          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full ${isPositive ? 'bg-green-500' : 'bg-red-500'}`} />
          <span className="text-sm">{item}</span>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

const PricingCard = ({
  tier,
  price,
  period,
  features,
  highlighted,
  cta
}: {
  tier: string;
  price: string;
  period: string;
  features: string[];
  highlighted: boolean;
  cta: string
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className={`relative rounded-3xl p-8 ${
      highlighted
        ? 'bg-gradient-to-b from-amber-600 via-purple-700 to-indigo-800 text-white shadow-2xl shadow-amber-500/25 scale-105 z-10 border border-amber-500/50'
        : 'bg-gray-900/80 border border-gray-700/50'
    }`}
  >
    {highlighted && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
        <Crown className="w-3 h-3" />
        Más popular
      </div>
    )}
    <div className="text-center mb-8">
      <h3 className={`text-xl font-bold mb-2 ${highlighted ? 'text-white' : 'text-white'}`}>{tier}</h3>
      <div className="flex items-baseline justify-center gap-1">
        <span className={`text-4xl font-extrabold ${highlighted ? 'text-white' : 'text-white'}`}>{price}</span>
        <span className={highlighted ? 'text-amber-200' : 'text-gray-400'}>{period}</span>
      </div>
    </div>
    <ul className="space-y-4 mb-8">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-start gap-3">
          <CheckCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${highlighted ? 'text-amber-300' : 'text-green-400'}`} />
          <span className={highlighted ? 'text-amber-50' : 'text-gray-300'}>{feature}</span>
        </li>
      ))}
    </ul>
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full py-3.5 rounded-xl font-semibold transition-all ${
        highlighted
          ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg'
          : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
      }`}
    >
      {cta}
    </motion.button>
  </motion.div>
);

const FAQItem = ({
  question,
  answer,
  isOpen,
  onToggle
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void
}) => (
  <motion.div
    className="border border-gray-700/50 rounded-2xl overflow-hidden bg-gray-900/60 backdrop-blur-xl"
    initial={false}
  >
    <button
      onClick={onToggle}
      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-gray-800/50 transition-colors"
    >
      <span className="font-semibold text-white pr-4">{question}</span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
        className="text-gray-400 flex-shrink-0"
      >
        <ChevronDown className="w-5 h-5" />
      </motion.div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="overflow-hidden"
        >
          <div className="px-6 pb-5 text-gray-400 leading-relaxed">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// ============================================================================
// COMPONENTE PRINCIPAL
// ============================================================================

const GymAccessControlPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<'rfid' | 'app' | 'biometric'>('rfid');
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 40]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: <Lock className="w-7 h-7" />,
      title: "Autenticación RFID segura",
      description: "Tags y tarjetas de proximidad con encriptación única. Cada socio tiene un identificador irrepetible que elimina el fraude por membresías compartidas.",
      stats: [
        { label: "Tiempo de acceso", value: "<1s" },
        { label: "Precisión", value: "99.9%" }
      ],
      delay: 0
    },
    {
      icon: <Wifi className="w-7 h-7" />,
      title: "Conectividad en tiempo real",
      description: "Sistema cloud-based que sincroniza accesos, membresías y alertas instantáneamente. Funciona online y offline con sincronización automática.",
      stats: [
        { label: "Uptime", value: "99.99%" },
        { label: "Sync", value: "<500ms" }
      ],
      delay: 0.1
    },
    {
      icon: <BarChart2 className="w-7 h-7" />,
      title: "Analytics & Reportes",
      description: "Dashboard intuitivo con métricas de asistencia, picos horarios, retención de socios y alertas personalizadas para optimizar tu operación.",
      stats: [
        { label: "Reportes", value: "50+" },
        { label: "Export", value: "CSV/PDF" }
      ],
      delay: 0.2
    },
    {
      icon: <Bell className="w-7 h-7" />,
      title: "Alertas inteligentes",
      description: "Notificaciones push/email ante intentos de acceso no autorizado, membresías vencidas o comportamientos inusuales. Toma acción antes de que sea un problema.",
      stats: [
        { label: "Tipos de alerta", value: "15+" },
        { label: "Canales", value: "Email/SMS/Push" }
      ],
      delay: 0.3
    },
    {
      icon: <Smartphone className="w-7 h-7" />,
      title: "App móvil integrada",
      description: "Tus socios pueden gestionar su membresía, reservar clases y acceder con QR desde su smartphone. Experiencia premium que fideliza.",
      stats: [
        { label: "Plataformas", value: "iOS/Android" },
        { label: "Rating", value: "4.9★" }
      ],
      delay: 0.4
    },
    {
      icon: <Database className="w-7 h-7" />,
      title: "Integraciones nativas",
      description: "Conecta con tu software de gestión actual: facturación, CRM, email marketing y más. API REST documentada para desarrolladores.",
      stats: [
        { label: "Integraciones", value: "30+" },
        { label: "API", value: "REST/GraphQL" }
      ],
      delay: 0.5
    }
  ];

  const accessMethods = {
    rfid: {
      title: "Tags & Tarjetas RFID",
      description: "La solución más confiable y económica. Tags resistentes al agua, sudor y golpes. Duración estimada: 5+ años.",
      icon: <Key className="w-12 h-12" />,
      benefits: ["Bajo costo por unidad", "Sin batería requerida", "Lectura a 5-10cm", "Personalización con logo"]
    },
    app: {
      title: "Acceso vía App Móvil",
      description: "QR dinámico con refresh cada 30 segundos para máxima seguridad. Ideal para socios tech-savvy que prefieren no cargar tags adicionales.",
      icon: <Smartphone className="w-12 h-12" />,
      benefits: ["Sin hardware adicional", "Actualizaciones en tiempo real", "Notificaciones push", "Geolocalización opcional"]
    },
    biometric: {
      title: "Huella dactilar",
      description: "Tecnología de vanguardia con algoritmos anti-spoofing. Acceso hands-free ideal para zonas de alto tráfico o experiencias premium.",
      icon: <Fingerprint className="w-12 h-12" />,
      benefits: ["Experiencia sin contacto", "Máxima seguridad", "Escalable a múltiples zonas", "Cumple con privacidad GDPR"]
    }
  };

  const pricingPlans = [
    {
      tier: "Starter",
      price: "$299",
      period: "pago único",
      features: [
        "Hasta 200 socios activos",
        "1 lector RFID incluido",
        "Dashboard básico",
        "Soporte por email",
        "Actualizaciones de seguridad"
      ],
      highlighted: false,
      cta: "Comenzar"
    },
    {
      tier: "Professional",
      price: "$799",
      period: "pago único",
      features: [
        "Hasta 1,000 socios activos",
        "3 lectores RFID + 1 puerta automática",
        "Analytics avanzado + reportes",
        "App móvil para socios",
        "Integración con software de gestión",
        "Soporte prioritario 24/7",
        "Capacitación del personal incluida"
      ],
      highlighted: true,
      cta: "Más popular →"
    },
    {
      tier: "Enterprise",
      price: "Personalizado",
      period: "cotización",
      features: [
        "Socios ilimitados",
        "Hardware ilimitado + instalación",
        "API dedicada + webhooks",
        "SSO & roles personalizados",
        "SLA garantizado 99.99%",
        "Account manager dedicado",
        "Desarrollo de features a medida"
      ],
      highlighted: false,
      cta: "Contactar ventas"
    }
  ];

  const faqs = [
    {
      question: "¿Qué pasa si se corta la luz o internet?",
      answer: "Nuestros lectores tienen batería de respaldo de hasta 8 horas y almacenan localmente hasta 10,000 accesos. Cuando se restablece la conexión, sincronizan automáticamente con la nube sin pérdida de datos."
    },
    {
      question: "¿Puedo migrar mis socios desde mi sistema actual?",
      answer: "Sí. Ofrecemos migración gratuita de bases de datos desde los principales softwares de gestión de gimnasios. Nuestro equipo se encarga de importar socios, membresías y historial de accesos sin interrupciones."
    },
    {
      question: "¿El sistema funciona sin conexión a internet?",
      answer: "Absolutamente. Los lectores operan en modo offline validando accesos contra una lista local encriptada. Los registros se sincronizan automáticamente cuando se restablece la conexión."
    },
    {
      question: "¿Qué tipo de soporte técnico incluyen?",
      answer: "Todos los planes incluyen soporte remoto. Professional y Enterprise cuentan con soporte 24/7 vía chat, email y teléfono. Además, ofrecemos visitas técnicas presenciales en Buenos Aires y GBA para instalaciones y mantenimiento."
    },
    {
      question: "¿Puedo agregar más lectores después?",
      answer: "Sí, el sistema es 100% escalable. Puedes agregar lectores, puertas automáticas o módulos adicionales en cualquier momento desde tu dashboard, sin necesidad de reconfigurar todo el sistema."
    },
    {
      question: "¿Cumple con leyes de protección de datos?",
      answer: "Sí. Cumplimos con la Ley 25.326 de Protección de Datos Personales de Argentina y estándares internacionales como GDPR. Los datos biométricos (si se usan) se encriptan y nunca se almacenan en texto plano."
    }
  ];

  const { ref: caracteristicasRfidRef } = useSectionTracker({
    sectionId: 'caracteristicasRfid',
    sectionName: 'caracteristicasRfid',
    minReadTime: 3000,
    onEngagement: (data) => {
      if (data.eventType === 'read') {
        console.log('🎯 Usuario leyó caracteristicasRfid');
      }
    },
  });

  const { ref: heroRfidRef } = useSectionTracker({
    sectionId: 'heroRfid',
    sectionName: 'heroRfid',
    minReadTime: 3000,
    onEngagement: (data) => {
      if (data.eventType === 'read') {
        console.log('🎯 Usuario leyó heroRfid');
      }
    },
  });

  const { ref: comoFuncionaRfidRef } = useSectionTracker({
    sectionId: 'como-funcionaRfid',
    sectionName: 'como-funcionaRfid',
    minReadTime: 3000,
    onEngagement: (data) => {
      if (data.eventType === 'read') {
        console.log('🎯 Usuario leyó como-funcionaRfid');
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <VisitTracker pageName="sistema-de-control-de-acceso" />
      
      {/* Scroll Progress Bar - Premium Gold */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-purple-500 to-blue-500 z-[100] origin-left shadow-lg shadow-amber-500/50"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <section
        ref={heroRfidRef}
        id="heroRfid" 
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        <GradientBlob className="w-96 h-96 -top-48 -left-48" color="purple" />
        <GradientBlob className="w-96 h-96 top-1/4 -right-48" color="amber" />
        <GradientBlob className="w-96 h-96 -bottom-48 left-1/3" color="blue" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Radial Glow */}
        <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-transparent to-transparent" />

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/30"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-sm font-medium text-amber-400">
                  Tecnología RFID + Cloud Premium
                </span>
              </motion.div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight text-white">
                Control de acceso inteligente para gimnasios que{' '}
                <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  elimina fraudes y optimiza tu operación
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg text-gray-400 leading-relaxed max-w-xl">
                Sistema todo-en-uno con lectores RFID, dashboard en tiempo real y app para socios.
                <span className="font-semibold text-amber-400"> Sin cuotas mensuales ocultas.</span>
              </p>

              {/* Before/After Quick */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <GlassCard className="p-4" hover={false}>
                  <div className="flex items-center gap-2 text-red-400 mb-2">
                    <XCircle size={16} />
                    <span className="font-semibold text-sm">Antes</span>
                  </div>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Colas en recepción</li>
                    <li>• Membresías compartidas</li>
                    <li>• Control manual</li>
                  </ul>
                </GlassCard>
                <GlassCard className="p-4" hover={false}>
                  <div className="flex items-center gap-2 text-green-400 mb-2">
                    <CheckCircle size={16} />
                    <span className="font-semibold text-sm">Después</span>
                  </div>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Acceso en &lt;1 segundo</li>
                    <li>• Anti-fraude automático</li>
                    <li>• Ahorro 60% en personal</li>
                  </ul>
                </GlassCard>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('contacto')}
                  className="group flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-purple-600 hover:from-amber-600 hover:to-purple-700 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-amber-500/25 transition-all"
                >
                  Solicitar demo
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => scrollToSection('como-funciona')}
                  className="flex items-center justify-center gap-2 bg-gray-800/80 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-semibold text-base sm:text-lg border border-gray-700 hover:border-amber-500/50 transition-all backdrop-blur-xl"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
                  Ver cómo funciona
                </motion.button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-6 border-t border-gray-800">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span className="text-sm text-gray-400">
                    <span className="font-semibold text-white">200+</span> gimnasios
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-400">Garantía 30 días</span>
                </div>
                <div className="flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-purple-500" />
                  <span className="text-sm text-gray-400">Soporte 24/7</span>
                </div>
              </div>
            </motion.div>

            {/* Visual / Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <GlassCard className="p-6 sm:p-8">
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-amber-400 to-purple-400 rounded-2xl blur-2xl opacity-30" />
                <div className="relative z-10">
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-purple-600 rounded-2xl mx-auto mb-4 shadow-lg shadow-amber-500/25">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      ¿Cuánto podrías ahorrar?
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Calculá tu ROI en 30 segundos
                    </p>
                  </div>
                  <FormContactLanding />
                  <p className="text-xs text-gray-500 text-center mt-4 flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" />
                    Datos seguros • Sin compromiso
                  </p>
                </div>
              </GlassCard>

              {/* Floating stats */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-4 sm:-left-6 bg-gray-900/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-gray-700/50 hidden lg:flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-green-900/30 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">-60%</div>
                  <div className="text-xs text-gray-500">Costos operativos</div>
                </div>
              </motion.div>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -right-4 sm:-right-6 bg-gray-900/90 backdrop-blur-xl rounded-2xl p-4 shadow-xl border border-gray-700/50 hidden lg:flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-amber-900/30 rounded-xl flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">&lt;1s</div>
                  <div className="text-xs text-gray-500">Tiempo de acceso</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => scrollToSection('caracteristicas')}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-amber-400 transition-colors cursor-pointer"
        >
          <span className="text-xs font-medium hidden sm:block">Explorar características</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.button>
      </section>

      {/* Features Section */}
      <section
        ref={caracteristicasRfidRef}
        id="caracteristicasRfid" 
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative"
      >
        <GradientBlob className="w-96 h-96 top-0 right-0" color="purple" />
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Características principales"
            title="Todo lo que necesitás para controlar accesos con inteligencia"
            subtitle="Tecnología probada en más de 200 gimnasios. Cada feature está diseñada para resolver problemas reales de operación y seguridad."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 sm:mt-16">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Access Methods */}
      <section
        ref={comoFuncionaRfidRef}
        id="como-funcionaRfid" 
        className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative"
      >
        <GradientBlob className="w-96 h-96 bottom-0 left-0" color="amber" />
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            eyebrow="Flexibilidad total"
            title="Elegí el método de acceso que mejor se adapta a tu gimnasio"
            subtitle="Tags RFID hasta huella dactilar. Mezclá métodos según la zona o el tipo de socio."
          />
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-12 mb-10">
            {Object.entries(accessMethods).map(([key, method]) => (
              <motion.button
                key={key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(key as typeof activeTab)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-amber-500 to-purple-600 text-white shadow-lg shadow-amber-500/25'
                    : 'bg-gray-900/80 text-gray-400 border border-gray-700/50 hover:border-amber-500/50 backdrop-blur-xl'
                }`}
              >
                {method.title}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              <GlassCard className="p-6 sm:p-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-amber-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-amber-500/25">
                      {accessMethods[activeTab].icon}
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {accessMethods[activeTab].title}
                    </h3>
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {accessMethods[activeTab].description}
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {accessMethods[activeTab].benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
        <GradientBlob className="w-96 h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" color="purple" />
        <div className="max-w-5xl mx-auto relative z-10">
          <SectionHeading
            eyebrow="Resultados comprobados"
            title="De la gestión manual al control inteligente"
            subtitle="Compará cómo cambia tu operación antes y después de implementar nuestro sistema."
            align="center"
          />
          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <ComparisonCard
              type="Sin sistema de control"
              isPositive={false}
              items={[
                "Colas de 5-15 minutos en horas pico",
                "Personal dedicado solo a verificar membresías",
                "Fraude por tarjetas compartidas o vencidas",
                "Sin datos reales de asistencia para tomar decisiones",
                "Quejas de socios por trámites lentos"
              ]}
            />
            <ComparisonCard
              type="Con nuestro sistema"
              isPositive={true}
              items={[
                "Acceso en menos de 1 segundo, sin colas",
                "Personal reasignado a atención y ventas",
                "Cero fraudes: cada acceso está autenticado",
                "Dashboard con métricas para optimizar horarios y ofertas",
                "Experiencia premium que fideliza socios"
              ]}
            />
          </div>

          {/* ROI Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-amber-600 via-purple-700 to-indigo-800 rounded-3xl p-6 sm:p-10 text-center text-white border border-amber-500/30 shadow-2xl shadow-amber-500/20"
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Diamond className="w-8 h-8 text-amber-300" />
              <div className="text-4xl sm:text-5xl font-extrabold">3.5x</div>
              <Diamond className="w-8 h-8 text-amber-300" />
            </div>
            <p className="text-lg sm:text-xl text-amber-100 mb-6">
              Retorno de inversión promedio en los primeros 6 meses
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-amber-100">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Ahorro en personal
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Reducción de fraudes
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" /> Mayor retención de socios
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section 
      <section id="precios" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
        <GradientBlob className="w-96 h-96 bottom-0 right-0" color="amber" />
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading
            eyebrow="Planes transparentes"
            title="Inversión única, sin sorpresas mensuales"
            subtitle="Elegí el plan que se adapta al tamaño de tu gimnasio. Todos incluyen instalación, capacitación y actualizaciones de por vida."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <PricingCard key={index} {...plan} />
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <GlassCard className="inline-flex items-center gap-3 px-6 py-3" hover={false}>
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-gray-300 font-medium">
                Garantía de satisfacción de 30 días • Si no estás conforme, te devolvemos el 100%
              </span>
            </GlassCard>
          </motion.div>
        </div>
      </section>*/}

      {/* FAQ Section */}
      <section id="faq" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative">
        <GradientBlob className="w-96 h-96 top-0 left-0" color="blue" />
        <div className="max-w-4xl mx-auto relative z-10">
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="Todo lo que necesitás saber antes de empezar"
            subtitle="Si tenés otra duda, nuestro equipo está disponible para ayudarte en cualquier momento."
          />
          <div className="space-y-4 mt-12">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openFAQ === index}
                onToggle={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="contacto" className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950 to-black" />
        <GradientBlob className="w-96 h-96 top-0 left-0" color="amber" />
        <GradientBlob className="w-96 h-96 bottom-0 right-0" color="purple" />
        
        {/* Animated border glow */}
        <div className="absolute inset-0 border-2 border-amber-500/10 rounded-3xl m-4" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-500/30 mb-6">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-amber-400">Oferta limitada</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              ¿Listo para transformar la gestión de tu gimnasio?
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Agenda una demo personalizada de 30 minutos. Te mostramos el sistema en acción y calculamos tu ROI estimado.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/30 transition-shadow"
              >
                <Calendar className="w-5 h-5" />
                Agendar demo
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/5491141461312"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl transition-colors border border-green-500/50"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp: 11-4146-1312
              </motion.a>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Sin compromiso
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Propuesta en 24hs
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                Instalación incluida
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-gray-400 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 via-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/25">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-xl text-white">Tu Marca <span className="text-amber-400">AR</span></div>
                  <div className="text-xs text-gray-500">Sistemas de Acceso Premium</div>
                </div>
              </div>
              <p className="text-gray-500 mb-6 max-w-md leading-relaxed">
                Soluciones tecnológicas para gimnasios que buscan eficiencia, seguridad y una experiencia premium para sus socios.
              </p>
              <div className="flex gap-3">
                {['linkedin', 'instagram', 'whatsapp'].map((social) => (
                  <motion.a
                    key={social}
                    whileHover={{ y: -3 }}
                    href={social === 'whatsapp' ? 'https://wa.me/5491141461312' : `https://${social}.com/tumarcaar`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-900 hover:bg-gray-800 border border-gray-700 rounded-xl flex items-center justify-center transition-colors"
                  >
                    {social === 'whatsapp' ? <MessageCircle className="w-5 h-5 text-gray-400" /> : <ExternalLink className="w-5 h-5 text-gray-400" />}
                  </motion.a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Producto</h4>
              <ul className="space-y-3">
                {['Características', 'Precios', 'Integraciones', 'Roadmap', 'Changelog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors text-sm">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Soporte</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <a href="mailto:hola@tumarca.ar" className="text-gray-500 hover:text-amber-400 transition-colors text-sm">
                    hola@tumarca.ar
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <a href="tel:+5491141461312" className="text-gray-500 hover:text-amber-400 transition-colors text-sm">
                    11-4146-1312
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-500 text-sm">Buenos Aires, Argentina</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-600">
            <p>© {new Date().getFullYear()} Tu Marca AR. Todos los derechos reservados.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-amber-400 transition-colors">Privacidad</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Términos</a>
              <a href="#" className="hover:text-amber-400 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA (mobile) */}
      <motion.button
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => scrollToSection('contacto')}
        className="fixed bottom-5 right-5 z-50 sm:hidden flex items-center gap-2 bg-gradient-to-r from-amber-500 to-purple-600 text-white px-5 py-3 rounded-2xl font-semibold shadow-xl shadow-amber-500/30"
      >
        <MessageCircle className="w-5 h-5" />
        Demo
      </motion.button>
    </div>
  );
};

export default GymAccessControlPage;