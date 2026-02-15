// models/Visit.ts
import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema({
  date: { type: String, required: true },
  page: { type: String, required: true },
  count: { type: Number, default: 0 },
});

// ✅ Índice compuesto único
VisitSchema.index({ date: 1, page: 1 }, { unique: true });

export default mongoose.models.Visit || mongoose.model("Visit", VisitSchema);