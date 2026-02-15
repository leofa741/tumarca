import { connectDB } from "@/app/lib/db";
import Visit from "@/app/lib/models/Visit";

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json().catch(() => ({}));
    const pageName = body.pageName || "unknown";
    const date = todayStr();

    await Visit.updateOne(
      { date, page: pageName },
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

    return new Response(
      JSON.stringify({
        total: totals[0]?.total || 0,
        today: today[0]?.total || 0,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error en POST /api/visits:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const date = todayStr();

    const totals = await Visit.aggregate([
      { $group: { _id: null, total: { $sum: "$count" } } }
    ]);

    const today = await Visit.findOne({ date });

    return new Response(
      JSON.stringify({
        total: totals[0]?.total || 0,
        today: today?.count || 0,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error en GET /api/visits:", err);
    return new Response(
      JSON.stringify({ error: "Error interno del servidor" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
