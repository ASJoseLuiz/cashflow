import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
const userSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    default: uuidv4,
    unique: true,
  },
  value: {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
});

export default mongoose.model("UserModel", userSchema);
