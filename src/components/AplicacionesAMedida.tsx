// components/AplicacionesAMedida.tsx
'use client';
import { Code, Zap, Layout, Database } from 'lucide-react';
import { useSectionTracker } from '@/app/(marketing)/components/useSectionTracker';

export default function AplicacionesAMedida() {
  const { ref: medidaRef } = useSectionTracker({ 
    sectionId: 'medidaHome',
    sectionName: 'medidaHome ',
    minReadTime: 3000, // 4 segundos para considerar lectura
    onEngagement: (data) => {
      // Opcional: lógica extra en cliente
      if (data.eventType === 'read') {
        console.log('🎯 Usuario leyó medidaHome');
      }
    },
  });
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-900/50 to-gray-950" ref={medidaRef}>
      <div className="max-w-5xl mx-auto text-center">
        <div className="flex justify-center mb-6">
          <div className="flex space-x-4 text-amber-500">
            <Code size={32} />
            <Zap size={32} />
            <Layout size={32} />
            <Database size={32} />
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Aplicaciones a Medida para tu Negocio
        </h2>
        <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
          No más soluciones genéricas. Desarrollo aplicaciones personalizadas que se adaptan exactamente a las necesidades 
          operativas, comerciales y digitales de tu empresa o emprendimiento profesional.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-left hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300">
            <h3 className="text-white font-semibold text-xl mb-3 flex items-center">
              <Zap className="text-amber-500 mr-2" size={24} />
              Hechas a tu Medida
            </h3>
            <p className="text-gray-300">
              Analizamos tu flujo de trabajo, clientes y objetivos para construir una aplicación que resuelva tus problemas reales, sin funcionalidades innecesarias.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-left hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300">
            <h3 className="text-white font-semibold text-xl mb-3 flex items-center">
              <Database className="text-amber-500 mr-2" size={24} />
              Integración y Escalabilidad
            </h3>
            <p className="text-gray-300">
              Tus sistemas, tu ERP, tu web o tu tienda online. Todo integrado. Diseñamos para crecer contigo.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-left hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300">
            <h3 className="text-white font-semibold text-xl mb-3 flex items-center">
              <Code className="text-amber-500 mr-2" size={24} />
              Tecnología de Vanguardia
            </h3>
            <p className="text-gray-300">
              Usamos las mejores herramientas (React, Next.js, Node.js, Supabase, etc.) para garantizar rendimiento, seguridad y mantenimiento sencillo.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-left hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300">
            <h3 className="text-white font-semibold text-xl mb-3 flex items-center">
              <Layout className="text-amber-500 mr-2" size={24} />
              UI/UX Profesional
            </h3>
            <p className="text-gray-300">
              Una app útil también debe ser intuitiva. Diseño interfaces limpias, modernas y fáciles de usar para tu equipo o clientes.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 max-w-2xl mx-auto">
          <p className="text-amber-200 italic text-sm md:text-base">
            “Desde apps internas para gestión hasta herramientas de atención al cliente o comercios digitales únicos: 
            si lo necesitas, lo construimos.”
          </p>
        </div>
      </div>
    </section>
  );
}