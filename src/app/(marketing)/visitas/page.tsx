// app/(marketing)/visitas/page.tsx
import { format } from "date-fns";

async function getStats() {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const [visitsRes, clicksRes] = await Promise.all([
    fetch(`${baseUrl}/api/visits`, { cache: "no-store" }),
    fetch(`${baseUrl}/api/track-click`, { cache: "no-store" }),
  ]);

  const visits = await visitsRes.json();
  const clicks = await clicksRes.json();

  return { visits, clicks };
}

export default async function VisitasPage() {
  const { visits, clicks } = await getStats();

  const todayVisits = visits.today || 0;
  const totalVisits = visits.total || 0;

  const todayClicks = clicks.today || 0;
  const totalClicks = clicks.total || 0;

  const conversionRate =
    totalVisits > 0 ? ((totalClicks / totalVisits) * 100).toFixed(2) : "0";

  const breakdown = clicks.breakdown || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white">
      <header className="bg-black/50 backdrop-blur-sm border-b border-amber-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            📊 Dashboard Analytics
          </h1>
          <div className="text-sm text-gray-400">
            {new Date().toLocaleString("es-AR")}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">

          <Card title="VISITAS HOY" icon="📅" value={todayVisits} color="blue" />
          <Card title="VISITAS TOTAL" icon="📊" value={totalVisits} color="green" />
          <Card title="CLICS HOY" icon="🖱️" value={todayClicks} color="purple" />
          <Card title="CLICS TOTAL" icon="🎯" value={totalClicks} color="amber" />
          <Card title="CONVERSIÓN" icon="📈" value={`${conversionRate}%`} color="red" />

        </div>

        {/* TOP EVENTOS */}
        <div className="bg-gray-900/50 border border-amber-500/10 rounded-2xl mb-12 overflow-hidden">
          <div className="p-6 border-b border-amber-500/10">
            <h2 className="text-2xl font-bold text-purple-400">
              🖱️ Clics por Botón
            </h2>
          </div>

          <div className="p-6 space-y-3">
            {breakdown.length === 0 ? (
              <p className="text-gray-500">No hay clics registrados aún</p>
            ) : (
              breakdown.map((item: any) => (
                <div
                  key={item._id}
                  className="flex justify-between items-center bg-gray-800/50 p-4 rounded-xl border border-gray-700/50"
                >
                  <span className="font-medium">
                    {item.eventName} / {item.button}
                  </span>
                  <span className="text-2xl font-bold text-cyan-400">
                    {item.count}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center text-gray-500 text-sm">
          Última actualización: {format(new Date(), "dd/MM/yyyy HH:mm:ss")}
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: any;
  icon: string;
  color: string;
}) {
  return (
    <div className={`bg-gradient-to-br from-${color}-900/40 to-${color}-950/40 border border-${color}-500/20 rounded-2xl p-6`}>
      <div className="flex justify-between mb-4">
        <span className="text-gray-400 text-sm">{title}</span>
        <span>{icon}</span>
      </div>
      <p className={`text-4xl font-bold text-${color}-400`}>
        {value}
      </p>
    </div>
  );
}
