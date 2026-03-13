"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";

interface Data {
  online: number;
  peak: number;
  visitors: number;

  hourly: { hour: string; views: number }[];

  sources: {
    instagram: number;
    facebook: number;
    google: number;
    direct: number;
  };

  devices: {
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
    sources: {
      instagram: 0,
      facebook: 0,
      google: 0,
      direct: 0
    },
    devices: {
      mobile: 0,
      desktop: 0
    }
  });

  useEffect(() => {

    const fetchData = async () => {
      const res = await fetch("/api/admin/analytics", { cache: "no-store" });
      const json = await res.json();
      setData(json);
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

      <div className="flex gap-6 mb-10">

        <a href="/admin/chat">Chat en Vivo</a>

        <a href="/admin/visitas">📊 Visitas</a>

        <button
          onClick={logout}
          className="px-4 py-2 bg-red-600 rounded-lg"
        >
          Cerrar Sesión
        </button>

      </div>

      {/* STATS PRINCIPALES */}

      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-gray-900 p-6 rounded-xl">
          <p className="text-gray-400 text-xs">ONLINE</p>
          <p className="text-4xl font-bold text-green-400">{data.online}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <p className="text-gray-400 text-xs">PICO</p>
          <p className="text-4xl font-bold text-yellow-400">{data.peak}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <p className="text-gray-400 text-xs">VISITANTES HOY</p>
          <p className="text-4xl font-bold text-blue-400">{data.visitors}</p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <p className="text-gray-400 text-xs">ÚLTIMA HORA</p>
          <p className="text-4xl font-bold text-purple-400">
            {data.hourly.at(-1)?.views ?? 0}
          </p>
        </div>

      </div>

      {/* VISITAS POR HORA */}

      <div className="bg-gray-900 p-6 rounded-xl mb-10">

        <h2 className="mb-4 font-semibold">Visitas por hora</h2>

        <div className="space-y-2">

          {data.hourly.map((h, i) => (

            <div key={i} className="flex justify-between text-sm">

              <span>{h.hour}</span>

              <span>{h.views}</span>

            </div>

          ))}

        </div>

      </div>

      {/* TRAFICO */}

      <div className="grid grid-cols-2 gap-6 mb-10">

        <div className="bg-gray-900 p-6 rounded-xl">

          <h2 className="mb-4 font-semibold">Origen del tráfico</h2>

          <div className="space-y-2 text-sm">

            <div className="flex justify-between">
              <span>Instagram</span>
              <span>{data.sources.instagram}</span>
            </div>

            <div className="flex justify-between">
              <span>Facebook</span>
              <span>{data.sources.facebook}</span>
            </div>

            <div className="flex justify-between">
              <span>Google</span>
              <span>{data.sources.google}</span>
            </div>

            <div className="flex justify-between">
              <span>Directo</span>
              <span>{data.sources.direct}</span>
            </div>

          </div>

        </div>

        {/* DISPOSITIVOS */}

        <div className="bg-gray-900 p-6 rounded-xl">

          <h2 className="mb-4 font-semibold">Dispositivos</h2>

          <div className="space-y-2 text-sm">

            <div className="flex justify-between">
              <span>Mobile</span>
              <span>{data.devices.mobile}</span>
            </div>

            <div className="flex justify-between">
              <span>Desktop</span>
              <span>{data.devices.desktop}</span>
            </div>

          </div>

        </div>

      </div>

    </div>

  );
}