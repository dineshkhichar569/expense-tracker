import mongoose from "mongoose";

const EXPENSE_CATEGORIES = [
  "food",
  "transport",
  "bills",
  "shopping",
  "health",
  "entertainment",
  "other",
];

const INCOME_CATEGORIES = [
  "salary",
  "freelance",
  "investment",
  "gift",
  "other",
];

const ALL_CATEGORIES = [
  ...new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES]),
];

const expenseSchema = mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Type is required."],
      enum: ["expense", "income"],
      default: "expense",
      lowercase: true,
      trim: true,
    },
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
      enum: ALL_CATEGORIES,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (value) {
          const categories =
            this.type === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

          return categories.includes(value);
        },
        message: "Category is not valid for this type.",
      },
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
