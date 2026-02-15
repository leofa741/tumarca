import { format } from "date-fns";

async function getStats() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  
  console.log('Base URL:', baseUrl);
  console.log('Fetching visits from:', `${baseUrl}/api/visits`);
  console.log('Fetching clicks from:', `${baseUrl}/api/track-click`);

  const resVisits = await fetch(`${baseUrl}/api/visits`, {
    cache: "no-store",
  });

  const resClicks = await fetch(`${baseUrl}/api/track-click`, {
    cache: "no-store",
  });

  console.log('Visits status:', resVisits.status);
  console.log('Clicks status:', resClicks.status);

  if (!resVisits.ok || !resClicks.ok) {
    console.error('Error fetching stats');
    return {
      visits: { today: 0, total: 0, breakdown: [] },
      clicks: { today: 0, total: 0, breakdown: [] },
    };
  }

  const visits = await resVisits.json();
  const clicks = await resClicks.json();

  console.log('Visits data:', visits);
  console.log('Clicks data:', clicks);

  return { visits, clicks };
}

export default async function VisitasPage() {
  const { visits, clicks } = await getStats();

  const todayVisits = visits.today || 0;
  const totalVisits = visits.total || 0;
  const todayClicks = clicks.today || 0;
  const totalClicks = clicks.total || 0;
  const visitBreakdown = visits.breakdown || [];
  const clickBreakdown = clicks.breakdown || [];

  const conversionRate =
    totalVisits > 0 ? ((totalClicks / totalVisits) * 100).toFixed(2) : "0";

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl font-bold mb-10">📊 Dashboard Analytics</h1>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
        <Stat title="VISITAS HOY" value={todayVisits} />
        <Stat title="VISITAS TOTAL" value={totalVisits} />
        <Stat title="CLICS HOY" value={todayClicks} />
        <Stat title="CLICS TOTAL" value={totalClicks} />
        <Stat title="CONVERSIÓN" value={`${conversionRate}%`} />
      </div>

      {/* ✅ NUEVO: Desglose de visitas por página */}
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
        Actualizado: {format(new Date(), "dd/MM/yyyy HH:mm:ss")}
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