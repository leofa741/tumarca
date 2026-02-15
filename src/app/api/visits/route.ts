import { connectDB } from "@/app/lib/db";
import Visit from "@/app/lib/models/Visit";

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export async function POST(req: Request) {
  await connectDB();

  const { pageName } = await req.json(); // 👈 leer lo que manda el cliente
  const date = todayStr();

  await Visit.updateOne(
    { date, page: pageName }, // 👈 ahora separa por página
    { $inc: { count: 1 } },
    { upsert: true }
  );

  const totals = await Visit.aggregate([
    { $group: { _id: null, total: { $sum: "$count" } } }
  ]);

  const today = await Visit.aggregate([
    { $match: { date } },
    { $group: { _id: null, total: { $sum: "$count" } } }
  ]);

  return Response.json({
    total: totals[0]?.total || 0,
    today: today[0]?.total || 0,
  });
}


/* =========================
   OBTENER STATS
========================= */
export async function GET() {
  await connectDB();

  const date = todayStr();

  const totals = await Visit.aggregate([
    { $group: { _id: null, total: { $sum: "$count" } } }
  ]);

  const today = await Visit.findOne({ date });

  return Response.json({
    total: totals[0]?.total || 0,
    today: today?.count || 0,
  });
}
