// app/admin/visitas/VisitasClient.tsx
'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import { signOut } from 'next-auth/react';

// Tipos para mejor autocompletado
interface EngagementStat {
  _id: string;
  views: number;
  reads: number;
  hovers: number;
  touches: number;
  avgDwellTime: number;
}

interface StatsData {
  visits: { today: number; total: number; breakdown: Array<{ page: string; count: number }> };
  clicks: { today: number; total: number; breakdown: Array<{ eventName: string; button: string; count: number }> };
  engagement: EngagementStat[];
}

async function getStats(): Promise<StatsData> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    // Fetch paralelo para mejor performance
    const [resVisits, resClicks, resEngagement] = await Promise.all([
      fetch(`${baseUrl}/api/visits`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/track-click`, { cache: 'no-store' }),
      fetch(`${baseUrl}/api/track-engagement`, { cache: 'no-store' }),
    ]);

    const visits = await resVisits.json();
    const clicks = await resClicks.json();
    const engagement = resEngagement.ok ? await resEngagement.json() : { stats: [] };

    return { 
      visits, 
      clicks,
      engagement: engagement.stats || []
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      visits: { today: 0, total: 0, breakdown: [] },
      clicks: { today: 0, total: 0, breakdown: [] },
      engagement: [],
    };
  }
}

// Componente auxiliar para barras comparativas
function EngagementBar({ label, value, max, color = 'from-amber-400 to-orange-500' }: {
  label: string;
  value: number;
  max: number;
  color?: string;
}) {
  const percentage = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  
  return (
    <div className="mb-2">
      <div className="flex justify-between text-xs mb-1">
        <span className="text-gray-400">{label}</span>
        <span className="font-medium text-white">{value}</span>
      </div>
      <div className="w-full bg-gray-800 rounded-full h-1.5">
        <div 
          className={`bg-gradient-to-r ${color} h-1.5 rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

// Componente Stat reutilizable
function Stat({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-amber-500/30 transition-colors">
      <p className="text-gray-400 text-xs uppercase tracking-wider">{title}</p>
      <p className="text-4xl font-bold mt-2 text-white">{value}</p>
    </div>
  );
}

export default function VisitasClient() {
  const [stats, setStats] = useState<StatsData>({
    visits: { today: 0, total: 0, breakdown: [] },
    clicks: { today: 0, total: 0, breakdown: [] },
    engagement: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'reads' | 'views' | 'dwell'>('reads');

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getStats();
        setStats(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar las estadísticas');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refrescar cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  const { visits, clicks, engagement } = stats;
  const todayVisits = visits.today || 0;
  const totalVisits = visits.total || 0;
  const todayClicks = clicks.today || 0;
  const totalClicks = clicks.total || 0;
  const visitBreakdown = visits.breakdown || [];
  const clickBreakdown = clicks.breakdown || [];

  const conversionRate = totalVisits > 0 ? ((totalClicks / totalVisits) * 100).toFixed(2) : '0';

  // Ordenar engagement según criterio seleccionado
  const sortedEngagement = [...engagement].sort((a, b) => {
    if (sortBy === 'reads') return b.reads - a.reads;
    if (sortBy === 'views') return b.views - a.views;
    if (sortBy === 'dwell') return b.avgDwellTime - a.avgDwellTime;
    return 0;
  });

  // Calcular máximos para las barras
  const maxViews = Math.max(1, ...engagement.map(s => s.views));
  const maxReads = Math.max(1, ...engagement.map(s => s.reads));
  const maxInteractions = Math.max(1, ...engagement.map(s => s.hovers + s.touches));

  const logout = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-10 flex items-center justify-center">
        <div className="text-center">
       
          <p className="text-gray-400">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-10">
        <div className="bg-red-900 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-200">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-10">
      <br /><br /><br />
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold">📊 Dashboard Analytics</h1>
        
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <a href="/admin/chat" className="flex-shrink-0">
            <Image
              src="/marca-2-ar-removebg.png"
              width={70}
              height={70}
              priority
              loading="eager"
              draggable="false"
              quality={100}
              placeholder="blur"
              blurDataURL="/marca-2-ar-removebg.png"
              alt="TU.MARCA.AR Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover"
            />
          </a>
          
          <button
            onClick={logout}
            className="group relative px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 
               text-white font-medium shadow-lg hover:shadow-xl 
               transition-all duration-300 hover:from-red-600 hover:to-red-700 
               active:scale-[0.98] hover:-translate-y-0.5 text-sm"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Salir
            </span>
          </button>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <Stat title="VISITAS HOY" value={todayVisits} />
        <Stat title="VISITAS TOTAL" value={totalVisits} />
        <Stat title="CLICS HOY" value={todayClicks} />
        <Stat title="CLICS TOTAL" value={totalClicks} />
        <Stat title="CONVERSIÓN" value={`${conversionRate}%`} />
      </div>

      {/* 🔥 Engagement por sección */}
      <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-800">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-xl font-bold">🔥 Engagement por sección</h2>
          
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
              Lectura = ≥4s visibles
            </span>
            
            {/* Selector de ordenamiento */}
            <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
              {(['reads', 'views', 'dwell'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSortBy(opt)}
                  className={`px-3 py-1 text-xs rounded-md transition-colors whitespace-nowrap ${
                    sortBy === opt 
                      ? 'bg-amber-500 text-black font-medium' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {opt === 'reads' ? '📖 Lecturas' : opt === 'views' ? '👁️ Vistas' : '⏱️ Tiempo'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {sortedEngagement.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400 text-sm mb-2">📭 Aún no hay datos de engagement</p>
            <p className="text-gray-500 text-xs">
              Los datos aparecerán cuando los usuarios interactúen con las secciones trackeadas
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {sortedEngagement.map((section) => {
              const readRate = section.views > 0 ? (section.reads / section.views) * 100 : 0;
              const interactions = section.hovers + section.touches;
              const isLowRetention = readRate < 10 && section.views > 20;
              
              return (
                <div 
                  key={section._id} 
                  className="bg-gray-800/50 rounded-lg p-4 border border-gray-700 hover:border-amber-500/50 transition-all group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="min-w-0">
                      <h4 className="font-semibold text-white capitalize truncate">
                        {section._id.replace(/_/g, ' ')}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {section._id}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-green-400 block">
                        {section.reads}
                      </span>
                      <span className="text-xs text-gray-500">lecturas</span>
                    </div>
                  </div>
                  
                  {/* Alerta de baja retención */}
                  {isLowRetention && (
                    <div className="mb-3 p-2 bg-red-900/30 border border-red-700/50 rounded text-xs text-red-300">
                      ⚠️ Baja retención ({readRate.toFixed(0)}%)
                    </div>
                  )}
                  
                  {/* Barras de métricas */}
                  <div className="space-y-1.5 text-xs mb-3">
                    <EngagementBar 
                      label="👁️ Vistas" 
                      value={section.views} 
                      max={maxViews} 
                      color="from-blue-400 to-cyan-500" 
                    />
                    <EngagementBar 
                      label="📖 Lecturas" 
                      value={section.reads} 
                      max={maxReads} 
                    />
                    <EngagementBar 
                      label="✋ Interacciones" 
                      value={interactions} 
                      max={maxInteractions} 
                      color="from-purple-400 to-pink-500" 
                    />
                  </div>
                  
                  {/* Tiempo promedio y tasa de lectura */}
                  <div className="flex justify-between items-center text-xs pt-3 border-t border-gray-700">
                    <span className="text-gray-400">
                      ⏱️ {(section.avgDwellTime / 1000).toFixed(1)}s prom.
                    </span>
                    <span className={`font-medium ${readRate >= 30 ? 'text-green-400' : readRate >= 15 ? 'text-amber-400' : 'text-red-400'}`}>
                      {readRate.toFixed(0)}% tasa lectura
                    </span>
                  </div>
                  
                  {/* Barra visual de tasa de lectura */}
                  <div className="mt-2">
                    <div className="w-full bg-gray-700 rounded-full h-1">
                      <div 
                        className={`h-1 rounded-full transition-all ${
                          readRate >= 30 ? 'bg-green-500' : readRate >= 15 ? 'bg-amber-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${Math.min(100, readRate)}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Grid: Visitas por página + Top clics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Visitas por página */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold mb-4">👁️ Visitas por página (hoy)</h2>

          {visitBreakdown.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Sin visitas registradas hoy</p>
          ) : (
            <div className="space-y-3">
              {visitBreakdown.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-800 py-3 last:border-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-amber-400 font-bold w-6">{index + 1}</span>
                    <span className="text-gray-300 truncate">{item.page}</span>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent flex-shrink-0">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top eventos clics */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h2 className="text-xl font-bold mb-4">🖱️ Top eventos de clics</h2>

          {clickBreakdown.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Sin clics registrados</p>
          ) : (
            <div className="space-y-3">
              {clickBreakdown.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-800 py-3 last:border-0"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="text-gray-300 text-sm truncate">{item.eventName}</span>
                    <span className="text-gray-500 text-xs">{item.button}</span>
                  </div>
                  <span className="text-xl font-bold text-blue-400 flex-shrink-0">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer con timestamp */}
      <div className="mt-10 text-sm text-gray-500 flex flex-col sm:flex-row items-center gap-2 justify-center">
        <span>🔄 Actualizado:</span>
        <span className="font-mono">{format(new Date(), 'dd/MM/yyyy HH:mm:ss')}</span>
        {engagement.length > 0 && (
          <span className="text-amber-400 text-xs bg-amber-400/10 px-2 py-0.5 rounded-full">
            {engagement.length} secciones trackeadas
          </span>
        )}
      </div>
    </div>
  );
}