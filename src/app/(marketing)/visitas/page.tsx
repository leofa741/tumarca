// app/(marketing)/visitas/page.tsx
import fs from 'fs';
import path from 'path';
import { format } from 'date-fns';

function readData(filename: string) {
  const file = path.join(process.cwd(), 'data', filename);
  if (!fs.existsSync(file)) return [];
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch {
    return [];
  }
}

export default function VisitasPage() {
  const visits = readData('visits.json');
  const clicks = readData('clicks.json');

  // Estadísticas de visitas
  const totalVisits = visits.length;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayVisits = visits.filter((v: any) => new Date(v.timestamp) >= today).length;

  // Estadísticas de clics
  const totalClicks = clicks.length;
  const todayClicks = clicks.filter((c: any) => new Date(c.timestamp) >= today).length;

  // Clics agrupados por evento
  const clicksByEvent = clicks.reduce((acc: any, click: any) => {
    acc[click.eventName] = (acc[click.eventName] || 0) + 1;
    return acc;
  }, {});

  // Calcular tasa de conversión (clics/visitas)
  const conversionRate = totalVisits > 0
    ? ((totalClicks / totalVisits) * 100).toFixed(2)
    : 0;

  // Calcular visitas por hora (últimas 24h)
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const visitsByHour = visits
    .filter((v: any) => new Date(v.timestamp) >= last24Hours)
    .reduce((acc: any, visit: any) => {
      const hour = new Date(visit.timestamp).getHours();
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      {/* Header con branding */}
      <header className="bg-black/50 backdrop-blur-sm border-b border-amber-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center font-bold">
              SG
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                Sistema de Gestión
              </h1>
              <p className="text-sm text-gray-400">Analytics & Estadísticas</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            {new Date().toLocaleString('es-AR')}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            📊 Dashboard Analytics
          </h2>
          <p className="text-gray-400 text-lg">
            Métricas en tiempo real de tu landing page
          </p>
        </div>

        {/* Métricas principales - Cards mejorados */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
          <div className="bg-gradient-to-br from-blue-900/50 to-blue-950/50 border border-blue-500/20 rounded-2xl p-6 hover:border-blue-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">VISITAS HOY</h3>
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 text-xs">📅</span>
              </div>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              {todayVisits}
            </p>
            <div className="mt-2 text-sm text-blue-300/70">
              {totalVisits > 0 && todayVisits > 0 && (
                <>↑ {Math.round((todayVisits / (totalVisits / 30)) * 100)}% vs promedio</>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900/50 to-green-950/50 border border-green-500/20 rounded-2xl p-6 hover:border-green-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">VISITAS TOTAL</h3>
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <span className="text-green-400 text-xs">📊</span>
              </div>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
              {totalVisits}
            </p>
            <div className="mt-2 text-sm text-green-300/70">
              Desde el inicio
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/50 to-purple-950/50 border border-purple-500/20 rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">CLICS HOY</h3>
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-purple-400 text-xs">🖱️</span>
              </div>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
              {todayClicks}
            </p>
            <div className="mt-2 text-sm text-purple-300/70">
              Interacciones activas
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-900/50 to-amber-950/50 border border-amber-500/20 rounded-2xl p-6 hover:border-amber-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">CLICS TOTAL</h3>
              <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                <span className="text-amber-400 text-xs">🎯</span>
              </div>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              {totalClicks}
            </p>
            <div className="mt-2 text-sm text-amber-300/70">
              Todos los eventos
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/50 to-red-950/50 border border-red-500/20 rounded-2xl p-6 hover:border-red-500/40 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 text-sm font-medium">CONVERSIÓN</h3>
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
                <span className="text-red-400 text-xs">📈</span>
              </div>
            </div>
            <p className="text-4xl font-bold bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
              {conversionRate}%
            </p>
            <div className="mt-2 text-sm text-red-300/70">
              Clics / Visitas
            </div>
          </div>
        </div>

        {/* Gráfico de actividad (simulado) */}
        <div className="bg-gray-900/50 border border-amber-500/10 rounded-2xl p-6 mb-12">
          <h3 className="text-xl font-bold mb-6 text-amber-400">Actividad últimas 24h</h3>
          <div className="grid grid-cols-24 gap-1 h-32">
            {[...Array(24)].map((_, i) => {
              const hour = (new Date().getHours() - 23 + i + 24) % 24;
              const count = visitsByHour[hour] || 0;
              const maxHeight = Math.max(...(Object.values(visitsByHour) as number[]), 1);
              const height = (count / maxHeight) * 100;

              return (
                <div
                  key={i}
                  className="flex flex-col items-center group"
                >
                  <div
                    className="w-full bg-gradient-to-t from-amber-500 to-orange-400 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-gray-500 mt-1 group-hover:text-white transition-colors">
                    {hour}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Clics por evento */}
        <div className="bg-gray-900/50 border border-amber-500/10 rounded-2xl mb-12 overflow-hidden">
          <div className="p-6 border-b border-amber-500/10">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              🖱️ Clics por Botón
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Interacciones más frecuentes en tu landing
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-3">
              {Object.entries(clicksByEvent).length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-lg">No hay clics registrados aún</p>
                  <p className="text-sm mt-2">Los clics aparecerán aquí cuando los usuarios interactúen con tus botones</p>
                </div>
              ) : (
                Object.entries(clicksByEvent).map(([event, count]) => (
                  <div
                    key={event}
                    className="flex items-center justify-between p-4 bg-gray-800/50 rounded-xl hover:bg-gray-800 transition-colors border border-gray-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                        <span className="text-white text-sm">🖱️</span>
                      </div>
                      <div>
                        <span className="font-medium text-white block">
                          {event.replace(/_/g, ' ').replace(/-/g, ' ')}
                        </span>
                        <span className="text-sm text-gray-400">
                          {count as unknown as number}
                        </span>
                      </div>
                    </div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      {count as unknown as number}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Últimas visitas */}
        <div className="bg-gray-900/50 border border-amber-500/10 rounded-2xl overflow-hidden mb-12">
          <div className="p-6 border-b border-amber-500/10">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              👥 Últimas Visitas
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Detalle de las últimas {visits.length} visitas registradas
            </p>
          </div>
          <div className="overflow-x-auto">
            {visits.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No hay visitas registradas aún</p>
                <p className="text-sm mt-2">Actualiza tu landing page para registrar la primera visita</p>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-800/80">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-400 text-sm uppercase tracking-wider">Fecha/Hora</th>
                    <th className="text-left p-4 font-medium text-gray-400 text-sm uppercase tracking-wider">Página</th>
                    <th className="text-left p-4 font-medium text-gray-400 text-sm uppercase tracking-wider">IP</th>
                    <th className="text-left p-4 font-medium text-gray-400 text-sm uppercase tracking-wider">Navegador</th>
                  </tr>
                </thead>
                <tbody>
                  {visits.slice(-20).reverse().map((visit: any, index: any) => (
                    <tr
                      key={index}
                      className="border-t border-gray-800 hover:bg-gray-800/50 transition-colors"
                    >
                      <td className="p-4 text-sm font-mono text-amber-400">
                        {format(new Date(visit.timestamp), 'dd/MM HH:mm:ss')}
                      </td>
                      <td className="p-4 text-sm font-medium text-white">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                          {visit.page}
                        </div>
                      </td>
                      <td className="p-4 text-sm">
                        <code className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                          {visit.ip?.slice(0, 15) || 'N/A'}
                        </code>
                      </td>
                      <td className="p-4 text-sm text-gray-300 truncate max-w-xs">
                        {visit.userAgent
                          ? visit.userAgent.split(' ')[0].slice(0, 20)
                          : 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-amber-500/10 text-gray-500">
          <p className="text-sm">
            📊 Dashboard actualizado en tiempo real • Última actualización: {new Date().toLocaleTimeString('es-AR')}
          </p>
          <p className="text-xs mt-2">
            Sistema de Gestión Premium - Tu Marca AR
          </p>
        </div>
      </div>
    </div>
  );
}