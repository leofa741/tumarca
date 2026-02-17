// app/lib/models/Engagement.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IEngagement extends Document {
  sectionId: string;
  sectionName: string;
  eventType: 'view' | 'read' | 'hover' | 'touch';
  dwellTime: number;
  date: string;
  timestamp: string;
}

const EngagementSchema = new Schema({
  sectionId: { type: String, required: true, index: true },
  sectionName: { type: String, required: true, index: true },
  eventType: { 
    type: String, 
    enum: ['view', 'read', 'hover', 'touch'],
    required: true 
  },
  dwellTime: { type: Number, default: 0 }, // en milisegundos
  date: { type: String, required: true, index: true }, // YYYY-MM-DD
  timestamp: { type: String, required: true },
}, { timestamps: true });

// Evitar duplicados masivos (opcional)
EngagementSchema.index({ sectionId: 1, eventType: 1, timestamp: 1 });

export default mongoose.models.Engagement || 
  mongoose.model<IEngagement>('Engagement', EngagementSchema);