import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  const now = Date.now();

  await redis.zremrangebyscore("online:global", 0, now - 30000);
  const online = await redis.zcard("online:global");
  const peak = await redis.get("stats:peak");

  // últimas 12 horas
  const hours = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(Date.now() - i * 3600000);
    const key = d.toISOString().slice(0, 13);
    const views = await redis.get(`views:${key}`);
    hours.push({
      hour: key.slice(11),
      views: Number(views || 0),
    });
  }

  return NextResponse.json({
    online,
    peak: Number(peak || 0),
    hourly: hours,
  });
}