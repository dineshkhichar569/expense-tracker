import mongoose from "mongoose";

const categories = [
  "food",
  "transport",
  "bills",
  "shopping",
  "health",
  "entertainment",
  "other",
];

const expenseSchema = mongoose.Schema(
  {
    amount: {
      type: Number,
      required: [true, "Amount is required."],
      min: [0.01, "Amount should be greater than 0."],
      validate: {
        validator: Number.isFinite,
        message: "Amount must be a valid number",
      },
    },
    category: {
      type: String,
      required: [true, "Category is required."],
      enum: categories,
      trim: true,
      lowercase: true,
    },
    date: {
      type: Date,
      required: [true, "Date is required."],
      default: Date.now,
      validate: {
        validator: (value) => value <= new Date(),
        message: "Date cannot be in the future.",
      },
    },
    note: {
      type: String,
      trim: true,
      maxlength: 200,
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "upi", "card"],
      default: "cash",
    },
  },
  { timestamps: true },
);

const Expense = mongoose.model("expense", expenseSchema);

export default Expense;
