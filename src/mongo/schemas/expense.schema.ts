import mongoose, { now } from "mongoose";
import { v4 as uuidv4 } from "uuid";
const expenseSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    default: uuidv4,
    unique: true,
  },
  value: {
    userId: { type: String, required: true },
    valor: { type: Number, required: true },
    date: { type: Date, required: true, default: now() },
    category: { type: String, required: true },
    description: { type: String, required: false },
  },
});

export default mongoose.model("ExpenseModel", expenseSchema);
