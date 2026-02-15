import mongoose, { Schema, models, model } from "mongoose";

const ClickSchema = new Schema({
  eventName: { type: String, required: true },
  section: { type: String, default: "unknown" },
  button: { type: String, default: "unknown" },
  date: { type: String, required: true }, // YYYY-MM-DD
  count: { type: Number, default: 1 },
});

export default models.Click || model("Click", ClickSchema);
