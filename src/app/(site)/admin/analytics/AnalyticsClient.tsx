"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

interface Data {
  online: number;
  peak: number;
  visitors: number;
  hourly: { hour: string; views: number }[];
  sources?: {
    instagram: number;
    facebook: number;
    google: number;
    direct: number;
  };
  devices?: {
    mobile: number;
    desktop: number;
  };
}

export default function AnalyticsClient() {

  const [data, setData] = useState<Data>({
    online: 0,
    peak: 0,
    visitors: 0,
    hourly: [],
  });

  useEffect(() => {

    const fetchData = async () => {
      try {

        const res = await fetch("/api/admin/analytics", { cache: "no-store" });

        const json = await res.json();

        setData(json);

      } catch (err) {
        console.error("analytics error", err);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 20000);

    return () => clearInterval(interval);

  }, []);

  const logout = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-3xl font-bold mb-10">📊 Realtime Analytics</h1>

      <button onClick={logout} className="mb-10 px-4 py-2 bg-red-600 rounded">
        Cerrar sesión
      </button>

      <div className="flex gap-6 mb-10">

        <a href="/admin/chat">Chat en Vivo</a>

        <a href="/admin/visitas">Visitas</a>

      </div>

      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-gray-900 p-6 rounded">
          <p>ONLINE</p>
          <p className="text-3xl">{data.online}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded">
          <p>PICO</p>
          <p className="text-3xl">{data.peak}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded">
          <p>VISITANTES HOY</p>
          <p className="text-3xl">{data.visitors}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded">
          <p>ÚLTIMA HORA</p>
          <p className="text-3xl">
            {data.hourly?.length
              ? data.hourly[data.hourly.length - 1].views
              : 0}
          </p>
        </div>

      </div>

      <div className="bg-gray-900 p-6 rounded mb-10">

        <h2 className="mb-4">Visitas por hora</h2>

        {data.hourly?.map((h, i) => (
          <div key={i} className="flex justify-between">
            <span>{h.hour}</span>
            <span>{h.views}</span>
          </div>
        ))}

      </div>

      <div className="grid grid-cols-2 gap-6">

        <div className="bg-gray-900 p-6 rounded">

          <h2 className="mb-4">Origen tráfico</h2>

          <div className="flex justify-between">
            <span>Instagram</span>
            <span>{data.sources?.instagram ?? 0}</span>
          </div>

          <div className="flex justify-between">
            <span>Facebook</span>
            <span>{data.sources?.facebook ?? 0}</span>
          </div>

          <div className="flex justify-between">
            <span>Google</span>
            <span>{data.sources?.google ?? 0}</span>
          </div>

          <div className="flex justify-between">
            <span>Directo</span>
            <span>{data.sources?.direct ?? 0}</span>
          </div>

        </div>

        <div className="bg-gray-900 p-6 rounded">

          <h2 className="mb-4">Dispositivos</h2>

          <div className="flex justify-between">
            <span>Mobile</span>
            <span>{data.devices?.mobile ?? 0}</span>
          </div>

          <div className="flex justify-between">
            <span>Desktop</span>
            <span>{data.devices?.desktop ?? 0}</span>
          </div>

        </div>

      </div>

    </div>

  );
}