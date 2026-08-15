'use client';

import { useEffect, useState } from 'react';

interface GeoStat {
  _id: { country: string; region: string; city: string };
  count: number;
}

// Convierte código de país ("AR") en bandera 🇦🇷
function flagEmoji(code: string): string {
  if (!code || code.length !== 2 || code === '??') return '🌐';
  return code
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}

export default function GeoClicksClient() {
  const [locations, setLocations] = useState<GeoStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/track-click', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setLocations(data.geoStats || []);
        }
      } catch (e) {
        console.error('Error cargando geo-stats:', e);
      } finally {
        setLoading(false);
      }
    }
    load();
    const interval = setInterval(load, 30000); // Actualiza cada 30s
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 animate-pulse">
        <div className="h-6 bg-gray-800 rounded mb-4 w-1/2"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-800 rounded"></div>
          <div className="h-4 bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  const max = Math.max(1, ...locations.map((l) => l.count));

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">🌍 ¿Desde dónde hacen clic?</h2>
        <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
          {locations.length} ubicaciones
        </span>
      </div>

      {locations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm mb-2">📭 Aún no hay datos geográficos</p>
          <p className="text-gray-500 text-xs">
            Los datos aparecerán cuando los usuarios hagan clic
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {locations.map((loc, i) => (
            <div key={i}>
              <div className="flex justify-between items-center text-sm mb-1">
                <span className="text-gray-300 truncate flex items-center gap-2 min-w-0">
                  <span className="text-lg flex-shrink-0">{flagEmoji(loc._id.country)}</span>
                  <span className="truncate">
                    <span className="font-medium text-white">{loc._id.city}</span>
                    <span className="text-gray-500"> · {loc._id.region}</span>
                  </span>
                </span>
                <span className="font-bold text-amber-400 flex-shrink-0 ml-2">
                  {loc.count}
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-amber-400 to-orange-500 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${(loc.count / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}