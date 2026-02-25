'use client';

import { signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';


interface Data {
    online: number;
    peak: number;
    hourly: { hour: string; views: number }[];
}



export default function AnalyticsClient() {
    const [data, setData] = useState<Data>({
        online: 0,
        peak: 0,
        hourly: [],
    });


    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/admin/analytics', { cache: 'no-store' });
            const json = await res.json();
            setData(json);
        };

        fetchData();
        const interval = setInterval(fetchData, 20000);
        return () => clearInterval(interval);
    }, []);

    const logout = () => {
        signOut({ callbackUrl: '/admin/login' });
    };

    return (
        <>
            <div className="min-h-screen bg-black text-white p-10">
                <br /><br /><br />
                <h1 className="text-3xl font-bold mb-8">📊 Realtime Analytics</h1>

                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <a href="/admin/chat" className="flex-shrink-0">
                        Chat en Vivo
                    </a>

                    <a href="/admin/visitas" className="flex-shrink-0">
                        📊  Visitas
                    </a>

                    <button
                        onClick={logout}
                        className="group relative px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 
             text-white font-medium hover:shadow-lg hover:shadow-red-500/20 
             transition-all duration-300 hover:-translate-y-0.5"
                      >
                        <span className="relative">Cerrar Sesión</span>
                      </button>



                </div>
                <br />

                <div className="grid grid-cols-3 gap-6 mb-10">
                    <div className="bg-gray-900 p-6 rounded-xl">
                        <p className="text-gray-400 text-xs">ONLINE AHORA</p>
                        <p className="text-4xl font-bold text-green-400">{data.online}</p>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                        <p className="text-gray-400 text-xs">PICO MÁXIMO</p>
                        <p className="text-4xl font-bold text-amber-400">{data.peak}</p>
                    </div>

                    <div className="bg-gray-900 p-6 rounded-xl">
                        <p className="text-gray-400 text-xs">ÚLTIMA HORA</p>
                        <p className="text-4xl font-bold text-blue-400">
                            {data.hourly.at(-1)?.views ?? 0}
                        </p>
                    </div>
                </div>

                <div className="bg-gray-900 p-6 rounded-xl">
                    <h2 className="mb-4 font-semibold">Visitas por hora</h2>
                    <div className="space-y-2">
                        {data.hourly.map((h, i) => (
                            <div key={i} className="flex justify-between text-sm">
                                <span>{h.hour}:00</span>
                                <span>{h.views}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}