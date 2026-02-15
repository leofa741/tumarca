// models/Visit.ts
import mongoose, { Schema, models, model } from 'mongoose';

const VisitSchema = new Schema({
  date: { type: String, required: true, unique: true }, // YYYY-MM-DD
  count: { type: Number, default: 0 },
}, { timestamps: true });

export default models.Visit || model('Visit', VisitSchema);
