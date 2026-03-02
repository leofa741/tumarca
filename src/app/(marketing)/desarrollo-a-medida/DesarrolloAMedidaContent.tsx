'use client';

import { useEffect, useRef, useState } from 'react';
import FormContactLanding from '../components/FormContactLanding';
import { motion } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

interface ServiceItem {
  num: string;
  title: string;
  text: string;
}

interface AudienceItem {
  icon: string;
  title: string;
  text: string;
}

interface ProcessStep {
  num: string;
  days: string;
  title: string;
  text: string;
}

interface Testimonial {
  initials: string;
  name: string;
  role: string;
  text: string;
}

interface FormState {
  nombre: string;
  email: string;
  servicio: string;
  problema: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES: ServiceItem[] = [
  { num: '01', title: 'Auditoría y Diagnóstico Digital', text: 'Detectamos las pérdidas ocultas y cuellos de botella en tu operación. Primer paso obligatorio antes de cualquier desarrollo.' },
  { num: '02', title: 'Sistemas de Gestión a Medida', text: 'ERP, CRM y control de stock diseñados para tu flujo de trabajo. Nada genérico, todo adaptado a cómo funciona tu negocio.' },
  { num: '03', title: 'Business Intelligence', text: 'Dashboards ejecutivos con métricas clave. Tomás decisiones con datos reales en tiempo real, no con intuición.' },
  { num: '04', title: 'Automatización con IA', text: 'Reemplazamos tareas manuales repetitivas con procesos inteligentes. Tu equipo se libera para lo que realmente importa.' },
  { num: '05', title: 'Integraciones Avanzadas', text: 'Conectamos tus sistemas con pagos, logística, bancos, AFIP y APIs externas. Todo en un solo ecosistema integrado.' },
  { num: '06', title: 'Arquitectura Escalable', text: 'Infraestructura preparada para crecer. Construimos para hoy y para el doble de tu operación en 2 años.' },
  { num: '07', title: 'Soporte 24/7', text: 'Soporte técnico disponible las 24 horas del día, los 7 días de la semana. Estamos siempre ahí cuando nos necesitás.' },
  { num: '08', title: 'Capacitación y Onboarding', text: 'Capacitación y onboarding para que tu equipo pueda utilizar el sistema de manera eficiente. Te acompañamos en todo el proceso.' },
];

const AUDIENCE: AudienceItem[] = [
  { icon: '📈', title: 'Empresas en crecimiento', text: 'Tu operación ya superó lo que puede manejar Excel. Necesitás un sistema que te acompañe, no que te frene.' },
  { icon: '🔗', title: 'Negocios con múltiples áreas', text: 'Ventas, logística y administración que no se hablan entre sí. Unificamos todo en una sola plataforma coherente.' },
  { icon: '🚀', title: 'Startups que buscan inversión', text: 'Los inversores necesitan ver métricas claras y estructura profesional. Te ayudamos a construir esa base sólida.' },
];

const PROCESS: ProcessStep[] = [
  { num: '01', days: 'Día 1–3', title: 'Diagnóstico', text: 'Analizamos tu operación actual, identificamos los puntos de fricción y calculamos el impacto potencial.' },
  { num: '02', days: 'Día 4–5', title: 'Propuesta', text: 'Diseñamos una solución concreta con scope definido, cronograma y precio fijo. Sin sorpresas.' },
  { num: '03', days: 'Día 6–30', title: 'Desarrollo', text: 'Construcción ágil con revisiones semanales. Vos ves el avance en tiempo real, no solo al final.' },
  { num: '04', days: 'Post-entrega', title: 'Implementación', text: 'Capacitación de tu equipo, documentación completa y soporte 24/7 para que todo funcione perfectamente.' },
];

const TESTIMONIALS: Testimonial[] = [
  { initials: 'MG', name: 'Martín G.', role: 'Distribuidora, Buenos Aires', text: 'Teníamos 4 planillas de Excel distintas para controlar el stock. Ahora tenemos un dashboard que nos dice exactamente qué vender, cuándo y a quién. Las ventas subieron 30% en 60 días.' },
  { initials: 'LF', name: 'Laura F.', role: 'E-commerce, Córdoba', text: 'El sistema de gestión que nos hicieron reemplazó 3 herramientas distintas. Ahorramos 2 horas por día de trabajo manual. El ROI fue claro desde el mes 2.' },
  { initials: 'AR', name: 'Andrés R.', role: 'Startup Fintech, CABA', text: 'Necesitábamos presentarle métricas a los inversores y no teníamos nada. En 3 semanas TuMarca nos entregó un CRM y un dashboard ejecutivo que impresionó en la reunión.' },
];

const SERVICE_OPTIONS = [
  'Sistema de gestión / ERP',
  'Dashboard y Business Intelligence',
  'Automatización con IA',
  'CRM a medida',
  'Integración de sistemas',
  'No sé bien, quiero una auditoría',
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DesarrolloAMedidaContent() {
  const contactRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<FormState>({ nombre: '', email: '', servicio: '', problema: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<FormState>>({});

  // ── Cursor ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    const dot = document.getElementById('tmDot');
    const ring = document.getElementById('tmRing');
    if (!dot || !ring) return;
    let rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => {
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      rx += (e.clientX - rx) * 0.12;
      ry += (e.clientY - ry) * 0.12;
    };
    const raf = setInterval(() => {
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
    }, 16);
    document.addEventListener('mousemove', onMove);
    return () => { document.removeEventListener('mousemove', onMove); clearInterval(raf); };
  }, []);

  const scrollToContact = () =>
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleField = (k: keyof FormState, v: string) => {
    setForm(p => ({ ...p, [k]: v }));
    setErrors(p => ({ ...p, [k]: '' }));
  };

  const handleSubmit = () => {
    const next: Partial<FormState> = {};
    (Object.keys(form) as (keyof FormState)[]).forEach(k => {
      if (!form[k].trim()) next[k] = 'required';
    });
    if (Object.keys(next).length) { setErrors(next); return; }
    setSubmitted(true);
  };

  // ── Styles (inline — no Tailwind dependency for custom tokens) ──────────────
  const S = {
    wrap: {
      fontFamily: "'Instrument Sans', 'Helvetica Neue', sans-serif",
      background: '#060608',
      color: '#f0ede8',
      minHeight: '100vh',
      overflowX: 'hidden' as const,
      cursor: 'none',
    },
    dot: {
      position: 'fixed' as const, width: 8, height: 8,
      background: '#f59e0b', borderRadius: '50%',
      pointerEvents: 'none' as const, zIndex: 9999,
      transform: 'translate(-50%,-50%)', transition: 'transform .1s',
    },
    ring: {
      position: 'fixed' as const, width: 36, height: 36,
      border: '1px solid rgba(245,158,11,.4)', borderRadius: '50%',
      pointerEvents: 'none' as const, zIndex: 9998,
      transform: 'translate(-50%,-50%)', transition: 'all .15s ease',
    },
  } as const;

  const inputStyle = (err: boolean) => ({
    width: '100%',
    background: '#16161e',
    border: `1px solid ${err ? 'rgba(239,68,68,.6)' : 'rgba(255,255,255,.08)'}`,
    borderRadius: 10,
    padding: '12px 14px',
    color: '#f0ede8',
    fontFamily: 'inherit',
    fontSize: 14,
    outline: 'none',
    resize: 'none' as const,
    transition: 'border-color .2s',
  });

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;700;800&family=Instrument+Sans:ital,wght@0,400;0,500;1,400&display=swap');
        .tm-service-card { background:#0f0f14; transition:background .25s; }
        .tm-service-card:hover { background:#16161e; }
        .tm-service-card::after { content:''; display:block; height:2px; background:linear-gradient(90deg,#f59e0b,#ea580c); transform:scaleX(0); transition:transform .3s; transform-origin:left; }
        .tm-service-card:hover::after { transform:scaleX(1); }
        .tm-audience-card { transition: border-color .2s, transform .2s; }
        .tm-audience-card:hover { border-color:rgba(245,158,11,.35) !important; transform:translateY(-4px); }
        .tm-btn-primary:hover { transform:translateY(-2px); box-shadow:0 12px 40px rgba(245,158,11,.35); }
        .tm-btn-wa:hover { border-color:rgba(255,255,255,.35) !important; background:rgba(255,255,255,.05) !important; }
        .tm-submit:hover { transform:translateY(-1px); box-shadow:0 8px 30px rgba(245,158,11,.4); }
        .tm-input:focus { border-color:rgba(245,158,11,.5) !important; box-shadow:0 0 0 3px rgba(245,158,11,.08); }
      `}</style>

      {/* Cursor */}
      <div id="tmDot" style={S.dot} />
      <div id="tmRing" style={S.ring} />

      <main style={S.wrap}>

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section style={{
          padding: 'clamp(120px,14vw,160px) clamp(20px,5vw,64px) 80px',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) min(440px,100%)',
          gap: 'clamp(40px,6vw,80px)',
          alignItems: 'center',
          maxWidth: 1300,
          margin: '0 auto',
        }}>

          {/* Left */}
          <FadeIn>
            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 28 }}>
              <span style={{ width: 32, height: 1, background: '#f59e0b', display: 'inline-block' }} />
              Desarrollo a medida
            </div>

            {/* H1 */}
            <h1 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(38px,5.5vw,68px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-2px', marginBottom: 24 }}>
              Tu negocio merece un sistema que{' '}
              <span style={{ background: 'linear-gradient(135deg,#f59e0b,#ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                trabaje por vos
              </span>
            </h1>

            <p style={{ fontSize: 18, color: '#9090a0', lineHeight: 1.7, maxWidth: 520, marginBottom: 40 }}>
              Transformamos procesos caóticos en sistemas digitales que aumentan ventas,
              reducen costos y escalan sin fricción.
            </p>

            {/* Antes / Después */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40 }}>
              <div style={{ padding: 20, borderRadius: 14, background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.2)', fontSize: 13 }}>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: '#ef4444', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  ✕ Hoy
                </div>
                {['Excel y sistemas desconectados', 'Sin métricas claras', 'Decisiones a ciegas', 'Tareas manuales repetitivas'].map(t => (
                  <div key={t} style={{ color: '#aaa', padding: '2px 0' }}>— {t}</div>
                ))}
              </div>
              <div style={{ padding: 20, borderRadius: 14, background: 'rgba(34,197,94,.08)', border: '1px solid rgba(34,197,94,.2)', fontSize: 13 }}>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: 1, textTransform: 'uppercase', color: '#22c55e', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  ✓ Con TuMarca.AR
                </div>
                {['Dashboard en tiempo real', 'KPIs automáticos', 'Decisiones basadas en datos', 'Procesos 100% automatizados'].map(t => (
                  <div key={t} style={{ color: '#aaa', padding: '2px 0' }}>— {t}</div>
                ))}
              </div>
            </div>

            {/* Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
              {['✓ Auditoría inicial gratuita', '✓ Pago 50% inicio / 50% entrega', '✓ 15–30 días de desarrollo', '✓ Soporte 24/7 incluido'].map(b => (
                <span key={b} style={{ fontSize: 12, fontWeight: 500, padding: '7px 14px', borderRadius: 100, background: 'rgba(245,158,11,.15)', border: '1px solid rgba(245,158,11,.25)', color: '#f59e0b' }}>{b}</span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                className="tm-btn-primary"
                onClick={scrollToContact}
                style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 16, padding: '15px 30px', borderRadius: 12, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#f59e0b,#ea580c)', color: '#000', transition: 'all .2s' }}
              >
                Solicitar diagnóstico →
              </button>
              <button
                className="tm-btn-wa"
                onClick={() => window.open('https://wa.me/5491141461312', '_blank')}
                style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 16, padding: '15px 26px', borderRadius: 12, cursor: 'pointer', border: '1.5px solid rgba(255,255,255,.15)', background: 'transparent', color: '#f0ede8', transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 10 }}
              >
                <WhatsAppIcon /> WhatsApp directo
              </button>
            </div>
            <p style={{ fontSize: 12, color: '#6b6b7a', marginTop: 14 }}>+10 proyectos entregados · Sin contratos de largo plazo</p>
          </FadeIn>

          {/* Form Card */}
          <FadeIn delay={150}>



             {/* FORMULARIO DE CONTACTO */}
                <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-800 rounded-2xl shadow-xl text-black dark:text-white">
                  <div className="max-w-3xl mx-auto px-4">
                    <motion.h2
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="text-3xl font-bold text-center mb-6"
                    >
                      Reservá tu demo GRATIS
                    </motion.h2>
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
                      Completá el formulario y agendá tu demo personalizada sin compromiso.
                    </p>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl"
                    >
                      <FormContactLanding />
                    </motion.div>
                  </div>
                </section>
          </FadeIn>
        </section>

        {/* ── PROOF BAR ─────────────────────────────────────────────────────── */}
        <FadeIn>
          <div style={{ background: '#0f0f14', borderTop: '1px solid rgba(255,255,255,.07)', borderBottom: '1px solid rgba(255,255,255,.07)', padding: '28px clamp(20px,5vw,64px)', display: 'flex', justifyContent: 'center', gap: 'clamp(28px,6vw,64px)', flexWrap: 'wrap' }}>
            {[{ num: '+50', label: 'Marcas transformadas' }, { num: '10', label: 'Años de experiencia' }, { num: '15-30', label: 'Días de entrega' }, { num: '24/7', label: 'Soporte incluido' }].map(p => (
              <div key={p.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 34, fontWeight: 800, letterSpacing: -1, background: 'linear-gradient(135deg,#f59e0b,#ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{p.num}</div>
                <div style={{ fontSize: 13, color: '#6b6b7a', marginTop: 2 }}>{p.label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* ── SERVICIOS ─────────────────────────────────────────────────────── */}
        <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,64px)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <FadeIn>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} /> Lo que construimos
              </div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(26px,4vw,46px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 14 }}>Soluciones que resuelven<br />problemas reales</h2>
              <p style={{ fontSize: 17, color: '#6b6b7a', maxWidth: 560, lineHeight: 1.7, marginBottom: 48 }}>No vendemos tecnología por vender. Analizamos tu operación y construimos exactamente lo que necesitás.</p>
            </FadeIn>

            <FadeIn delay={100}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 1, background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.07)', borderRadius: 20, overflow: 'hidden' }}>
                {SERVICES.map(s => (
                  <div key={s.num} className="tm-service-card" style={{ padding: '34px 28px' }}>
                    <div style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: 2, color: '#f59e0b', marginBottom: 18, opacity: .7 }}>{s.num}</div>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 10, lineHeight: 1.3 }}>{s.title}</h3>
                    <p style={{ fontSize: 14, color: '#6b6b7a', lineHeight: 1.7 }}>{s.text}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── PARA QUIÉN ────────────────────────────────────────────────────── */}
        <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,64px)', background: '#0f0f14', borderTop: '1px solid rgba(255,255,255,.07)', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <FadeIn>
              <div style={{ textAlign: 'center', marginBottom: 52 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 14, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} /> ¿Es para tu empresa?
                </div>
                <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(26px,4vw,46px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.1 }}>
                  Trabajamos con empresas que<br />ya están creciendo
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
                {AUDIENCE.map(a => (
                  <div key={a.title} className="tm-audience-card" style={{ padding: '30px 26px', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, background: '#060608' }}>
                    <div style={{ fontSize: 28, marginBottom: 14 }}>{a.icon}</div>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 17, fontWeight: 700, color: '#f59e0b', marginBottom: 10 }}>{a.title}</h3>
                    <p style={{ fontSize: 14, color: '#6b6b7a', lineHeight: 1.65 }}>{a.text}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── PROCESO ───────────────────────────────────────────────────────── */}
        <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,64px)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <FadeIn>
              <div style={{ textAlign: 'center', marginBottom: 64 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 14, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} /> Cómo trabajamos
                </div>
                <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(26px,4vw,46px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.1 }}>
                  De diagnóstico a solución<br />en 4 pasos
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 32 }}>
                {PROCESS.map((s) => (
                  <div key={s.num} style={{ textAlign: 'center', padding: '0 16px' }}>
                    <div style={{ width: 52, height: 52, border: '1.5px solid rgba(245,158,11,.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 16, fontWeight: 700, color: '#f59e0b', margin: '0 auto 20px', background: '#060608', position: 'relative', zIndex: 1 }}>{s.num}</div>
                    <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, color: '#f59e0b', background: 'rgba(245,158,11,.15)', padding: '3px 12px', borderRadius: 100, marginBottom: 12 }}>{s.days}</div>
                    <h3 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{s.title}</h3>
                    <p style={{ fontSize: 13, color: '#6b6b7a', lineHeight: 1.65 }}>{s.text}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── TESTIMONIOS ───────────────────────────────────────────────────── */}
        <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,64px)', background: '#0f0f14', borderTop: '1px solid rgba(255,255,255,.07)', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <FadeIn>
              <div style={{ textAlign: 'center', marginBottom: 52 }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 14, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} /> Lo que dicen los clientes
                </div>
                <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(26px,4vw,46px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.1 }}>
                  Resultados que hablan<br />por sí solos
                </h2>
              </div>
            </FadeIn>
            <FadeIn delay={100}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
                {TESTIMONIALS.map(t => (
                  <div key={t.initials} style={{ background: '#060608', border: '1px solid rgba(255,255,255,.07)', borderRadius: 16, padding: '26px 22px' }}>
                    <div style={{ color: '#f59e0b', fontSize: 14, letterSpacing: 2, marginBottom: 14 }}>★★★★★</div>
                    <p style={{ fontSize: 14, color: '#aaa', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 20 }}>"{t.text}"</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#f59e0b,#ea580c)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 13, color: '#000', flexShrink: 0 }}>{t.initials}</div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                        <div style={{ fontSize: 12, color: '#6b6b7a' }}>{t.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── FINAL CTA ─────────────────────────────────────────────────────── */}
        <section style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,64px)', textAlign: 'center', background: 'linear-gradient(135deg,rgba(245,158,11,.06) 0%,transparent 50%), #060608', borderTop: '1px solid rgba(255,255,255,.07)' }}>
          <div style={{ maxWidth: 800, margin: '0 auto' }}>
            <FadeIn>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#f59e0b', marginBottom: 14, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 24, height: 1, background: '#f59e0b', display: 'inline-block' }} /> ¿Listo para crecer?
              </div>
              <h2 style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontSize: 'clamp(28px,4.5vw,52px)', fontWeight: 800, letterSpacing: -1, lineHeight: 1.1, marginBottom: 20 }}>
                Si tu empresa necesita estructura,{' '}
                <span style={{ background: 'linear-gradient(135deg,#f59e0b,#ea580c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>empezamos hoy.</span>
              </h2>
              <p style={{ fontSize: 17, color: '#6b6b7a', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 44px' }}>
                La auditoría inicial es gratuita. Te decimos exactamente qué podemos hacer por vos y cuánto cuesta.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                <button className="tm-btn-primary" onClick={scrollToContact} style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 16, padding: '15px 30px', borderRadius: 12, border: 'none', cursor: 'pointer', background: 'linear-gradient(135deg,#f59e0b,#ea580c)', color: '#000', transition: 'all .2s' }}>
                  Solicitar auditoría gratis →
                </button>
                <button className="tm-btn-wa" onClick={() => window.open('https://wa.me/5491141461312', '_blank')} style={{ fontFamily: "'Bricolage Grotesque',sans-serif", fontWeight: 700, fontSize: 16, padding: '15px 26px', borderRadius: 12, cursor: 'pointer', border: '1.5px solid rgba(255,255,255,.15)', background: 'transparent', color: '#f0ede8', transition: 'all .2s', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <WhatsAppIcon /> WhatsApp directo
                </button>
              </div>
              <p style={{ fontSize: 12, color: '#6b6b7a', marginTop: 24 }}>+50 marcas transformadas · Sin contratos de largo plazo · 100% personalizado</p>
            </FadeIn>
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────────────────────────── */}
        <footer style={{ padding: '28px clamp(20px,5vw,64px)', borderTop: '1px solid rgba(255,255,255,.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13, color: '#6b6b7a', flexWrap: 'wrap', gap: 12 }}>
          <span>© {new Date().getFullYear()} TuMarca.AR — Soluciones digitales estratégicas</span>
          <a href="https://www.tumarca.ar" style={{ color: '#f59e0b', textDecoration: 'none' }}>tumarca.ar</a>
        </footer>

      </main>
    </>
  );
}