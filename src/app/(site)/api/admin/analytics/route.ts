import { NextResponse } from "next/server";
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

  return {
    key: `${year}-${month}-${day}T${hour}`,
    hour,
  };
}

export async function GET() {
  const now = Date.now();

  await redis.zremrangebyscore("online:global", 0, now - 30000);
  const online = await redis.zcard("online:global");
  const peak = await redis.get("stats:peak");

  const hours = [];

  for (let i = 11; i >= 0; i--) {
    const date = new Date(Date.now() - i * 3600000);

    const { key, hour } = formatHourKey(date);

    const views = await redis.get(`views:${key}`);

    hours.push({
      hour: `${hour}:00`,
      views: Number(views || 0),
    });
  }

  return NextResponse.json({
    online,
    peak: Number(peak || 0),
    hourly: hours,
  });
}