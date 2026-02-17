// app/api/track-engagement/route.ts
import { connectDB } from "@/app/lib/db";
import Engagement from "@/app/lib/models/Engagement";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

/* =========================
   REGISTRAR EVENTO DE ENGAGEMENT
========================= */
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json().catch(() => ({}));
    const {
      sectionId,
      sectionName,
      eventType,
      dwellTime,
      timestamp,
    } = body;

    // Validación mínima
    if (!sectionId || !sectionName || !eventType) {
      return Response.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    const date = todayStr();

    // Guardar evento individual
    await Engagement.create({
      sectionId,
      sectionName,
      eventType, // 'view' | 'read' | 'hover' | 'touch'
      dwellTime: dwellTime || 0,
      date,
      timestamp: timestamp || new Date().toISOString(),
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error en POST /api/track-engagement:", error);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

/* =========================
   OBTENER ESTADÍSTICAS DE ENGAGEMENT
========================= */
export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date') || todayStr();
    const section = searchParams.get('section');

    const match: any = { date };
    if (section) match.sectionName = section;

    // Stats agregados por sección
    const stats = await Engagement.aggregate([
      { $match: match },
      { 
        $group: {
          _id: "$sectionName",
          views: { 
            $sum: { $cond: [{ $eq: ["$eventType", "view"] }, 1, 0] } 
          },
          reads: { 
            $sum: { $cond: [{ $eq: ["$eventType", "read"] }, 1, 0] } 
          },
          hovers: { 
            $sum: { $cond: [{ $eq: ["$eventType", "hover"] }, 1, 0] } 
          },
          touches: { 
            $sum: { $cond: [{ $eq: ["$eventType", "touch"] }, 1, 0] } 
          },
          avgDwellTime: { $avg: "$dwellTime" },
          totalEvents: { $sum: 1 }
        }
      },
      { $sort: { reads: -1 } }
    ]);

    // Totales generales para el día
    const totals = await Engagement.aggregate([
      { $match: { date } },
      {
        $group: {
          _id: null,
          totalViews: { $sum: { $cond: [{ $eq: ["$eventType", "view"] }, 1, 0] } },
          totalReads: { $sum: { $cond: [{ $eq: ["$eventType", "read"] }, 1, 0] } },
          totalInteractions: { 
            $sum: { 
              $cond: [
                { $in: ["$eventType", ["hover", "touch"]] }, 
                1, 
                0
              ] 
            } 
          }
        }
      }
    ]);

    return Response.json({
      stats,
      totals: totals[0] || { totalViews: 0, totalReads: 0, totalInteractions: 0 },
      date
    });
  } catch (error) {
    console.error("Error en GET /api/track-engagement:", error);
    return Response.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}