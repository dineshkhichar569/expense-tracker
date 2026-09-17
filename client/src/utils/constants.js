import {
  Briefcase,
  Car,
  CircleHelp,
  Gamepad2,
  Gift,
  HeartPlus,
  Laptop,
  Receipt,
  ShoppingBag,
  TrendingUp,
  Utensils,
} from "lucide-react";

export const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Education",
  "Other",
];

export const EXPENSE_CATEGORIES = [
  {
    name: "food",
    icon: Utensils,
    bgColor: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    name: "transport",
    icon: Car,
    bgColor: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    name: "bills",
    icon: Receipt,
    bgColor: "bg-purple-100",
    color: "text-purple-500",
  },
  {
    name: "shopping",
    icon: ShoppingBag,
    bgColor: "bg-orange-100",
    color: "text-orange-600",
  },
  {
    name: "health",
    icon: HeartPlus,
    bgColor: "bg-teal-100",
    color: "text-teal-600",
  },
  {
    name: "entertainment",
    icon: Gamepad2,
    bgColor: "bg-pink-100",
    color: "text-pink-600",
  },
  {
    name: "other",
    icon: CircleHelp,
    bgColor: "bg-gray-100",
    color: "text-gray-600",
  },
];

export const INCOME_CATEGORIES = [
  {
    name: "salary",
    icon: Briefcase,
    bgColor: "bg-green-100",
    color: "text-green-600",
  },
  {
    name: "freelance",
    icon: Laptop,
    bgColor: "bg-indigo-100",
    color: "text-indigo-600",
  },
  {
    name: "investment",
    icon: TrendingUp,
    bgColor: "bg-emerald-100",
    color: "text-emerald-600",
  },
  { name: "gift", icon: Gift, bgColor: "bg-rose-100", color: "text-rose-600" },
  {
    name: "other",
    icon: CircleHelp,
    bgColor: "bg-gray-100",
    color: "text-gray-600",
  },
];
