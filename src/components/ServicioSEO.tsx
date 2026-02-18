// components/ServicioSEO.tsx
'use client';
import { useSectionTracker } from '@/app/(marketing)/components/useSectionTracker';
import { Search, BarChart3, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';


export default function ServicioSEO() {

    const { ref: seoRef } = useSectionTracker({ 
    sectionId: 'seoHome',
    sectionName: 'seoHome ',
    minReadTime: 3000, // 4 segundos para considerar lectura
    onEngagement: (data) => {
      // Opcional: lógica extra en cliente
      if (data.eventType === 'read') {
        console.log('🎯 Usuario leyó seoHome');
      }
    },
  }); 
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-gray-900/40 via-transparent to-gray-950" ref={seoRef}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Texto principal */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Search className="text-amber-500" size={28} />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                SEO que Funciona de Verdad
              </h2>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              No adivinamos. <strong>Medimos, analizamos y optimizamos</strong> usando Google Search Console y otras herramientas profesionales. 
              Porque tu visibilidad en Google no debe depender de la suerte, sino de datos reales.
            </p>

            <p className="text-gray-400 mb-8">
              El 93% de todas las visitas web comienzan con un motor de búsqueda. Si tu sitio no aparece, tu negocio es invisible. 
              Nosotros te hacemos <span className="text-white font-medium">encontrable</span> por las personas que ya están buscando lo que ofrecés.
            </p>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-white font-semibold">Monitoreo con Google Search Console</h3>
                  <p className="text-gray-400 text-sm">
                    Identificamos qué palabras clave ya te están trayendo tráfico, cuáles fallan y dónde hay oportunidades ocultas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BarChart3 className="text-blue-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-white font-semibold">Reportes de rendimiento reales</h3>
                  <p className="text-gray-400 text-sm">
                    Te mostramos clics, impresiones, CTR y posiciones. Nada de métricas inventadas: solo datos de Google.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <AlertTriangle className="text-orange-400 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-white font-semibold">Corrección de errores técnicos</h3>
                  <p className="text-gray-400 text-sm">
                    Encontramos y solucionamos problemas de indexación, enlaces rotos, errores de rastreo y más.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ArrowRight className="text-amber-500 mt-1 flex-shrink-0" size={20} />
                <div>
                  <h3 className="text-white font-semibold">Optimización continua</h3>
                  <p className="text-gray-400 text-sm">
                    No es un trabajo único. Ajustamos tu estrategia mes a mes basados en el comportamiento real de tu audiencia.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 bg-amber-500/10 border border-amber-500/30 rounded-xl p-5">
              <p className="text-amber-200 text-sm italic">
                “Un sitio web sin SEO es como una tienda en un barrio desierto: nadie sabe que existe.”
              </p>
            </div>
          </div>

          {/* Imagen ilustrativa o bloque de datos */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 flex flex-col justify-center">
            <h3 className="text-white font-bold text-2xl mb-6">Lo que Google te está diciendo (y nadie escucha)</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-300">Palabras clave con tráfico orgánico</span>
                <span className="text-amber-400 font-semibold">+127 detectadas</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-300">Páginas no indexadas (errores)</span>
                <span className="text-red-400 font-semibold">8 encontradas</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-300">CTR promedio en resultados</span>
                <span className="text-blue-400 font-semibold">3.2% → Objetivo: 5.5%</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-300">Mejores oportunidades</span>
                <span className="text-green-400 font-semibold">+40 keywords subutilizadas</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-6">
              Ejemplo real de diagnóstico inicial con Google Search Console.
            </p>
          </div>
        </div>

        {/* CTA interno */}
        <div className="text-center mt-16">
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
          >
            🔍 Quiero que mi web aparezca en Google
          </a>
          <p className="text-gray-500 text-sm mt-3">
            Incluye auditoría SEO gratuita con Google Search Console
          </p>
        </div>
      </div>
    </section>
  );
}