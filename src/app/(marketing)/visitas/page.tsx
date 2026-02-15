// app/(marketing)/visitas/page.tsx
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
      visits: { today: 0, total: 0 },
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

  const conversionRate =
    totalVisits > 0 ? ((totalClicks / totalVisits) * 100).toFixed(2) : "0";

  const breakdown = clicks.breakdown || [];

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

      <div className="bg-gray-900 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Top eventos</h2>

        {breakdown.length === 0 ? (
          <p className="text-gray-400">Sin clics registrados</p>
        ) : (
          breakdown.map((item: any) => (
            <div
              key={item._id}
              className="flex justify-between border-b border-gray-800 py-3"
            >
              <span>{item.eventName} / {item.button}</span>
              <span className="font-bold">{item.count}</span>
            </div>
          ))
        )}
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
