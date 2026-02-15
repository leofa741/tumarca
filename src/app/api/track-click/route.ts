import { connectDB } from "@/app/lib/db";
import Click from "@/app/lib/models/models/Click";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
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

  await Click.updateOne(
    { eventName, section, button, date },
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

  return Response.json({
    total: totals[0]?.total || 0,
    today: todayAgg[0]?.today || 0,
    breakdown, // top botones/eventos del día
  });
}
