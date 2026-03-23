// src/app/(site)/api/admin/analytics/track/route.ts
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { redis } from "@/lib/redis";

const timeZone = "America/Argentina/Buenos_Aires";

function formatHourKey(date: Date) {
  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone,
    year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hour12: false,
  });
  const parts = formatter.formatToParts(date);
  const get = (type: string) => parts.find(p => p.type === type)?.value;
  return `${get("year")}-${get("month")}-${get("day")}T${get("hour")}`;
}

export async function POST(req: Request) {
  try {
    const h = await headers();
    const body = await req.json();

    const page = body.page || "/";
    const visitorId = body.visitorId;
    const referer = h.get("referer") || "";
    const ua = h.get("user-agent") || "";

    // Detección de fuente y dispositivo
    let source = "direct";
    if (referer.includes("instagram")) source = "instagram";
    else if (referer.includes("facebook")) source = "facebook";
    else if (referer.includes("google")) source = "google";
    else if (referer.includes("tiktok")) source = "tiktok";

    let device = "desktop";
    if (ua.includes("Mobile")) device = "mobile";
    if (ua.includes("Tablet")) device = "tablet";

    const now = Date.now();
    const today = new Date().toISOString().slice(0, 10);
    const hourKey = formatHourKey(new Date());

    // 🎯 PIPELINE: Agrupa múltiples comandos en 1 sola request a Upstash
    const pipeline = redis.pipeline();

    // 1. Mantener online (siempre)
    pipeline.zadd("online:global", { score: now, member: visitorId });

    // 2. Contar pageview por hora (siempre)
    pipeline.incr(`views:${hourKey}`);

    // 3. Registrar visitante único y obtener si es nuevo
    pipeline.sadd(`visitors:${today}`, visitorId);

    // Ejecutamos las primeras 3 operaciones para saber si es nuevo visitante
    const [_, __, isNewVisitor] = await pipeline.exec();

    // 4. Si es nuevo, agregamos métricas de tráfico (segundo pipeline opcional)
    if (isNewVisitor === 1) {
      const p2 = redis.pipeline();
      p2.incr(`traffic:device:${device}`);
      p2.incr(`traffic:source:${source}`);
      await p2.exec(); // Esto cuenta como 1 request adicional solo cuando es necesario
    }

    // 5. Actualizar peak cada 10 minutos (no en cada request)
    const lastPeakUpdate = await redis.get<number>("stats:peak:updated");
    const shouldUpdatePeak = !lastPeakUpdate || (now - lastPeakUpdate) > 10 * 60 * 1000;

    if (shouldUpdatePeak) {
      const online = await redis.zcard("online:global");
      const peak = Number(await redis.get("stats:peak") || 0);
      
      if (online > peak) {
        const p3 = redis.pipeline();
        p3.set("stats:peak", online);
        p3.set("stats:peak:updated", now); // Guardar timestamp
        await p3.exec();
      }
    }

    return NextResponse.json({ ok: true });

  } catch (error: any) {
    // 🛡️ Manejo elegante del límite de Upstash
    if (error.message?.includes("max requests limit exceeded")) {
      console.warn("⚠️ Upstash quota exceeded - analytics paused gracefully");
      // Retornamos 200 para no romper la experiencia del usuario
      return NextResponse.json({ ok: true, warning: "analytics_limited" });
    }

    // Loguear otros errores para debugging
    console.error("❌ Analytics tracking error:", {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });

    // En producción, no exponer detalles del error
    return NextResponse.json(
      { error: process.env.NODE_ENV === "development" ? error.message : "Tracking unavailable" },
      { status: 500 }
    );
  }
}