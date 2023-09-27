import mongoose, { Schema } from "mongoose";

export interface User {
  email: string;
  name: string;
  password: string;
}

const Expense = {
  id: { type: String, required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: String,
  description: String,
  date: Date,
};

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  expenses: [Expense],
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
