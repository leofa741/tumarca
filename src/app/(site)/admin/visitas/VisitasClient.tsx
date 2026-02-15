// app/admin/visitas/VisitasClient.tsx
'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { signOut } from 'next-auth/react';

async function getStats() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  try {
    const resVisits = await fetch(`${baseUrl}/api/visits`, {
      cache: 'no-store',
    });

    const resClicks = await fetch(`${baseUrl}/api/track-click`, {
      cache: 'no-store',
    });

    if (!resVisits.ok || !resClicks.ok) {
      throw new Error('Error fetching stats');
    }

    const visits = await resVisits.json();
    const clicks = await resClicks.json();

    return { visits, clicks };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      visits: { today: 0, total: 0, breakdown: [] },
      clicks: { today: 0, total: 0, breakdown: [] },
    };
  }
}
 const logout = () => {
    signOut({ callbackUrl: '/admin/login' });
  };

export default function VisitasClient() {
  const [stats, setStats] = useState({
    visits: { today: 0, total: 0, breakdown: [] },
    clicks: { today: 0, total: 0, breakdown: [] },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getStats();
        setStats(data);
        setError(null);
      } catch (err) {
        setError('Error al cargar las estadísticas');
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refrescar cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  const { visits, clicks } = stats;
  const todayVisits = visits.today || 0;
  const totalVisits = visits.total || 0;
  const todayClicks = clicks.today || 0;
  const totalClicks = clicks.total || 0;
  const visitBreakdown = visits.breakdown || [];
  const clickBreakdown = clicks.breakdown || [];

  const conversionRate =
    totalVisits > 0 ? ((totalClicks / totalVisits) * 100).toFixed(2) : '0';

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-400 mx-auto mb-4"></div>
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
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-10">📊 Dashboard Analytics</h1>
       {/* Botón Cerrar Sesión */}
          <button
            onClick={logout}
            className="group relative px-5 py-2.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 
               text-white font-medium shadow-lg hover:shadow-xl 
               transition-all duration-300 hover:from-red-600 hover:to-red-700 
               active:scale-[0.98] hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Salir
            </span>
          </button>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
        <Stat title="VISITAS HOY" value={todayVisits} />
        <Stat title="VISITAS TOTAL" value={totalVisits} />
        <Stat title="CLICS HOY" value={todayClicks} />
        <Stat title="CLICS TOTAL" value={totalClicks} />
        <Stat title="CONVERSIÓN" value={`${conversionRate}%`} />
      </div>

      {/* Desglose de visitas por página */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">👁️ Visitas por página (hoy)</h2>

          {visitBreakdown.length === 0 ? (
            <p className="text-gray-400">Sin visitas registradas hoy</p>
          ) : (
            <div className="space-y-3">
              {visitBreakdown.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-800 py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-amber-400 font-bold">{index + 1}</span>
                    <span className="text-gray-300">{item.page}</span>
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">🖱️ Top eventos clics</h2>

          {clickBreakdown.length === 0 ? (
            <p className="text-gray-400">Sin clics registrados</p>
          ) : (
            <div className="space-y-3">
              {clickBreakdown.map((item: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-b border-gray-800 py-3"
                >
                  <div className="flex flex-col">
                    <span className="text-gray-300 text-sm">{item.eventName}</span>
                    <span className="text-gray-500 text-xs">{item.button}</span>
                  </div>
                  <span className="text-xl font-bold text-blue-400">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-10 text-sm text-gray-500">
        Actualizado: {format(new Date(), 'dd/MM/yyyy HH:mm:ss')}
      </div>
    </div>
  );
}

function Stat({ title, value }: { title: string; value: any }) {
  return (
    <div className="bg-gray-900 p-6 rounded-xl">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-4xl font-bold mt-2">{value}</p>
    </div>
  );
}