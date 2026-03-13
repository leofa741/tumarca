import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function POST(req: Request) {

  const { visitorId } = await req.json();

  const now = Date.now();

  await redis.zadd("online:global", {
    score: now,
    member: visitorId
  });

  return NextResponse.json({ ok: true });

}