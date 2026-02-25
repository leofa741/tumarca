import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const TTL = 30000;

export async function GET() {
  const now = Date.now();

  await redis.zremrangebyscore("online:global", 0, now - TTL);
  const count = await redis.zcard("online:global");

  return NextResponse.json({ count });
}