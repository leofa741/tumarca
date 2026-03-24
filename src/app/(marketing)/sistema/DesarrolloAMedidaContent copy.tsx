'use client';

import { motion } from 'framer-motion';
import FormContactLanding from '../components/FormContactLanding';
import { CheckCircle, ArrowRight } from 'lucide-react';
import VisitCounter from '../components/VisitCounter';
import VisitTracker from '../components/VisitTracker';
import { useSectionTracker } from '../components/useSectionTracker';

export default function DesarrolloAMedidaContent() {

  const { ref: heroRef } = useSectionTracker({
    sectionId: 'hero',
    sectionName: 'hero',
    minReadTime: 2000,
  });

  async function trackAndScroll(eventName: string, section: string) {
    try {
      await fetch('/api/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ eventName, section }),
      });
    } catch (error) {
      console.error('Tracking error:', error);
    }

    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (

<main className="min-h-screen bg-gradient-to-b from-black via-gray-950 to-black text-white">

<VisitCounter />
<VisitTracker pageName="desarrollo-a-medida-landing" />

{/* HERO */}
<section ref={heroRef} className="px-6 py-28 max-w-7xl mx-auto relative">

<div className="absolute left-1/2 -translate-x-1/2 top-0 w-[700px] h-[700px] bg-amber-500/10 blur-[140px] -z-10"></div>

<div className="grid lg:grid-cols-2 gap-16 items-center">

<div>

<div className="inline-flex items-center gap-2 bg-emerald-500/20 px-4 py-2 rounded-full mb-6">
<span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
<span className="text-sm font-medium">
Diagnóstico estratégico sin costo
</span>
</div>

<h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
Desarrollo de Software a Medida para Empresas
</h1>

<p className="text-gray-300 text-xl mb-8 max-w-xl">
Creamos sistemas personalizados que automatizan procesos,
integran herramientas y convierten datos en decisiones estratégicas.
</p>

<div className="flex flex-wrap gap-4 mb-10">

<button
onClick={() => trackAndScroll('hero_consultar', 'hero')}
className="bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-4 rounded-xl font-bold text-lg shadow-xl flex items-center gap-2"
>
Solicitar diagnóstico
<ArrowRight size={18}/>
</button>

<button
onClick={() => window.open('https://wa.me/5491141461312','_blank')}
className="border-2 border-amber-500 text-amber-400 px-8 py-4 rounded-xl font-bold text-lg hover:bg-amber-500/10"
>
WhatsApp
</button>

</div>

<div className="flex gap-8 text-sm text-gray-400">

<div>
<p className="text-amber-400 font-bold text-lg">+10</p>
Proyectos entregados
</div>

<div>
<p className="text-amber-400 font-bold text-lg">15-30</p>
Días promedio
</div>

<div>
<p className="text-amber-400 font-bold text-lg">100%</p>
Personalizado
</div>

</div>

</div>

<div
id="contact"
className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_40px_rgba(251,191,36,0.15)]"
>

<h2 className="text-2xl font-bold mb-6">
Contanos tu proyecto
</h2>

<FormContactLanding />

</div>

</div>

</section>


{/* PROBLEMA */}
<section className="py-24 bg-black/60 px-6">

<div className="max-w-6xl mx-auto text-center">

<h2 className="text-3xl font-bold mb-16">
¿Tu empresa está creciendo pero tus sistemas no?
</h2>

<div className="grid md:grid-cols-3 gap-10">

<div className="bg-white/5 border border-white/10 p-8 rounded-xl hover:scale-[1.02] transition">
<h3 className="font-bold mb-3">Operación caótica</h3>
<p className="text-gray-400 text-sm">
Excel, herramientas desconectadas y procesos manuales que generan errores.
</p>
</div>

<div className="bg-white/5 border border-white/10 p-8 rounded-xl hover:scale-[1.02] transition">
<h3 className="font-bold mb-3">Falta de métricas</h3>
<p className="text-gray-400 text-sm">
No tenés visibilidad real de ventas, costos o rendimiento operativo.
</p>
</div>

<div className="bg-white/5 border border-white/10 p-8 rounded-xl hover:scale-[1.02] transition">
<h3 className="font-bold mb-3">Escalar es difícil</h3>
<p className="text-gray-400 text-sm">
Tu negocio depende demasiado de procesos manuales.
</p>
</div>

</div>

</div>

</section>


{/* SOLUCIONES */}
<section className="py-24 px-6">

<div className="max-w-6xl mx-auto">

<h2 className="text-3xl font-bold text-center mb-16">
Soluciones estratégicas
</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

{[
{
title:'Sistemas de gestión a medida',
text:'ERP, CRM y plataformas internas adaptadas a tu negocio.'
},
{
title:'Automatización de procesos',
text:'Reducción de tareas manuales y optimización operativa.'
},
{
title:'Business Intelligence',
text:'Dashboards ejecutivos para decisiones basadas en datos.'
},
{
title:'Integraciones',
text:'Pagos, logística, APIs y sistemas existentes conectados.'
},
{
title:'Arquitectura escalable',
text:'Infraestructura preparada para crecimiento.'
},
{
title:'Consultoría tecnológica',
text:'Definición estratégica de tecnología para tu empresa.'
},
].map((s,i)=>(

<div
key={i}
className="bg-white/5 border border-white/10 rounded-xl p-8 hover:border-amber-500/40 hover:scale-[1.02] transition"
>

<h3 className="font-bold mb-3">
{s.title}
</h3>

<p className="text-gray-400 text-sm">
{s.text}
</p>

</div>

))}

</div>

</div>

</section>


{/* PROCESO */}
<section className="py-24 px-6 bg-gradient-to-b from-gray-950 to-black">

<div className="max-w-6xl mx-auto text-center">

<h2 className="text-3xl font-bold mb-16">
Cómo trabajamos
</h2>

<div className="grid md:grid-cols-4 gap-8">

{[
['01','Diagnóstico','Analizamos tu operación'],
['02','Propuesta','Diseñamos la solución'],
['03','Desarrollo','Construcción del sistema'],
['04','Implementación','Puesta en producción']
].map((s,i)=>(
<div
key={i}
className="bg-white/5 border border-white/10 p-6 rounded-xl"
>

<div className="text-amber-500 font-bold text-lg mb-2">
{s[0]}
</div>

<h3 className="font-bold mb-2">
{s[1]}
</h3>

<p className="text-gray-400 text-sm">
{s[2]}
</p>

</div>
))}

</div>

</div>

</section>


{/* CTA FINAL */}
<section className="py-28 text-center px-6">

<div className="max-w-4xl mx-auto">

<h2 className="text-4xl font-bold mb-6">
Transformá tu operación con tecnología diseñada para tu empresa
</h2>

<p className="text-gray-400 mb-10">
Solicitá un diagnóstico estratégico y descubrí qué procesos podés automatizar.
</p>

<button
onClick={()=>trackAndScroll('cta_final','cta')}
className="bg-gradient-to-r from-amber-500 to-orange-600 px-10 py-5 rounded-xl font-bold text-lg shadow-xl"
>
Solicitar diagnóstico
</button>

</div>

</section>


<footer className="py-8 border-t border-gray-800 text-center text-gray-500 text-sm">
© {new Date().getFullYear()} Tu Marca AR — Soluciones digitales estratégicas
</footer>

</main>
);
}