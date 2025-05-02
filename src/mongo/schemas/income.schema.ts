import mongoose, { now } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const incomeSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    default: uuidv4,
  },

  value: {
    userId: { type: String, required: true },
    valor: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true, default: now() },
    description: { type: String, required: false },
  },
});

export default mongoose.model("IncomeModel", incomeSchema);
