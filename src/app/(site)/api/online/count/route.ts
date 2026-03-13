import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {

  const now = Date.now();

  await redis.zremrangebyscore("online:global", 0, now - 45000);

  const count = await redis.zcard("online:global");

  return NextResponse.json({
    count
  });

}