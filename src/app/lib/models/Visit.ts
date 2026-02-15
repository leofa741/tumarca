// models/Visit.ts


import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema({
  date: String,
  page: String,
  count: { type: Number, default: 0 },
});

export default mongoose.models.Visit || mongoose.model("Visit", VisitSchema);

