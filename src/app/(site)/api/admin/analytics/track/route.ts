import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { redis } from "@/lib/redis";

const timeZone = "America/Argentina/Buenos_Aires";

function formatHourKey(date: Date) {

  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);

  const year = parts.find(p => p.type === "year")?.value;
  const month = parts.find(p => p.type === "month")?.value;
  const day = parts.find(p => p.type === "day")?.value;
  const hour = parts.find(p => p.type === "hour")?.value;

  return `${year}-${month}-${day}T${hour}`;
}

export async function POST(req: Request) {

  const h = await headers();
  const body = await req.json();

  const page = body.page || "/";
  const visitorId = body.visitorId;

  const referer = h.get("referer") || "direct";
  const ua = h.get("user-agent") || "";

  let source = "direct";

  if (referer.includes("instagram")) source = "instagram";
  if (referer.includes("facebook")) source = "facebook";
  if (referer.includes("google")) source = "google";
  if (referer.includes("tiktok")) source = "tiktok";

  const now = Date.now();
  const hourKey = formatHourKey(new Date());

  // usuarios online
  await redis.zadd("online:global", {
    score: now,
    member: visitorId
  });

  // visitas por hora
  await redis.incr(`views:${hourKey}`);

  // origen
  await redis.incr(`traffic:source:${source}`);

  // páginas
  await redis.incr(`traffic:page:${page}`);

  // dispositivo
  let device = "desktop";

  if (ua.includes("Mobile")) device = "mobile";
  if (ua.includes("Tablet")) device = "tablet";

  await redis.incr(`traffic:device:${device}`);

  // usuarios únicos
  const today = new Date().toISOString().slice(0, 10);

  await redis.sadd(`visitors:${today}`, visitorId);

  // pico máximo
  const online = await redis.zcard("online:global");
  const peak = Number(await redis.get("stats:peak") || 0);

  if (online > peak) {
    await redis.set("stats:peak", online);
  }

  return NextResponse.json({ ok: true });
}