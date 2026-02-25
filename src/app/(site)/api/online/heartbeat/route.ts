import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const TTL = 30000;

export async function POST(req: Request) {
  try {
    const { visitorId, page } = await req.json();
    if (!visitorId) {
      return NextResponse.json({ error: "visitorId requerido" }, { status: 400 });
    }

    const now = Date.now();
    const hourKey = new Date().toISOString().slice(0, 13);

    // Online global
    await redis.zadd("online:global", {
      score: now,
      member: visitorId,
    });

    // Online por página
    await redis.zadd(`online:page:${page}`, {
      score: now,
      member: visitorId,
    });

    // Views por hora
    await redis.incr(`views:${hourKey}`);

    // Limpiar inactivos
    await redis.zremrangebyscore("online:global", 0, now - TTL);
    await redis.zremrangebyscore(`online:page:${page}`, 0, now - TTL);

    // Actualizar pico
    const current = await redis.zcard("online:global");
    const peak = await redis.get("stats:peak");

    if (!peak || current > Number(peak)) {
      await redis.set("stats:peak", current);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}