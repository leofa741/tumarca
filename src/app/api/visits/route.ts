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

    // ✅ Optimización: una sola agregación para ambos valores
    const [totals, today] = await Promise.all([
      Visit.aggregate([
        { $group: { _id: null, total: { $sum: "$count" } } }
      ]),
      Visit.aggregate([
        { $match: { date } },
        { $group: { _id: null, total: { $sum: "$count" } } }
      ])
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

    // ✅ Obtiene totales + desglose por página
    const [totals, todayTotal, breakdown] = await Promise.all([
      Visit.aggregate([
        { $group: { _id: null, total: { $sum: "$count" } } }
      ]),
      Visit.aggregate([
        { $match: { date } },
        { $group: { _id: null, total: { $sum: "$count" } } }
      ]),
      Visit.aggregate([
        { $match: { date } },
        { $sort: { count: -1 } },
        { 
          $project: { 
            _id: 0, 
            page: 1, 
            count: 1 
          } 
        }
      ])
    ]);

    return new Response(
      JSON.stringify({
        total: totals[0]?.total || 0,
        today: todayTotal[0]?.total || 0,
        breakdown: breakdown // ✅ Nuevo: desglose por página
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