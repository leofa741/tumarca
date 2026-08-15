// src/app/api/track-click/route.ts
import { connectDB } from "@/app/lib/db";
import Click from "@/app/lib/models/models/Click";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

// 🌍 Función para obtener geolocalización
function getGeoLocation(request: Request) {
  // Si estás en Vercel, ¡aprovecha sus headers gratis!
  // Son más precisos que cualquier librería
  if (request.headers.get('x-vercel-ip-city')) {
    return {
      country: request.headers.get('x-vercel-ip-country') || '??',
      region: request.headers.get('x-vercel-ip-country-region') || 'Desconocida',
      city: decodeURIComponent(request.headers.get('x-vercel-ip-city') || 'Desconocida'),
    };
  }

  // Fallback para otros proveedores o localhost
  // Necesitas: npm install geoip-lite
  try {
    // @ts-ignore
    const geoip = require('geoip-lite');
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    const geo = geoip.lookup(ip);
    return {
      country: geo?.country || '??',
      region: geo?.region || 'Desconocida',
      city: geo?.city || 'Desconocida',
    };
  } catch {
    return { country: '??', region: 'Desconocida', city: 'Desconocida' };
  }
}

/* =========================
   REGISTRAR CLICK
========================= */
export async function POST(request: Request) {
  await connectDB();

  const body = await request.json().catch(() => ({}));
  const {
    eventName = "unknown_click",
    section = "unknown",
    button = "unknown",
  } = body;

  const date = todayStr();
  const geo = getGeoLocation(request); // 🆕 Obtener ubicación

  // 🆕 Agregamos country, region, city al filtro para que cada ubicación sea única
  await Click.updateOne(
    {
      eventName,
      section,
      button,
      date,
      country: geo.country,
      region: geo.region,
      city: geo.city,
    },
    { $inc: { count: 1 } },
    { upsert: true }
  );

  const totals = await Click.aggregate([
    { $group: { _id: null, total: { $sum: "$count" } } },
  ]);

  const todayAgg = await Click.aggregate([
    { $match: { date } },
    { $group: { _id: null, today: { $sum: "$count" } } },
  ]);

  return Response.json({
    success: true,
    total: totals[0]?.total || 0,
    today: todayAgg[0]?.today || 0,
  });
}

/* =========================
   STATS CLICKS
========================= */
export async function GET() {
  await connectDB();
  const date = todayStr();

  const totals = await Click.aggregate([
    { $group: { _id: null, total: { $sum: "$count" } } },
  ]);

  const todayAgg = await Click.aggregate([
    { $match: { date } },
    { $group: { _id: null, today: { $sum: "$count" } } },
  ]);

  const breakdown = await Click.find({ date }).sort({ count: -1 });

  // 🆕 Agregación por ubicación geográfica (top 20)
  const geoStats = await Click.aggregate([
    { $match: { city: { $exists: true, $ne: "Desconocida" } } },
    {
      $group: {
        _id: {
          country: "$country",
          region: "$region",
          city: "$city",
        },
        count: { $sum: "$count" },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 20 },
  ]);

  return Response.json({
    total: totals[0]?.total || 0,
    today: todayAgg[0]?.today || 0,
    breakdown,
    geoStats, // 🆕 Nuevo campo con stats por ciudad
  });
}