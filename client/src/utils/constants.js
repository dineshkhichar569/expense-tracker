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

export const EXPENSE_CATEGORIES = [
  {
    name: "food",
    icon: Utensils,
    bgColor: "bg-yellow-100",
    color: "text-yellow-600",
    barColor: "bg-yellow-600",
    chartColor: "#EAB308",
  },
  {
    name: "transport",
    icon: Car,
    bgColor: "bg-blue-100",
    color: "text-blue-600",
    barColor: "bg-blue-600",
    chartColor: "#2653EB",
  },
  {
    name: "bills",
    icon: Receipt,
    bgColor: "bg-purple-100",
    color: "text-purple-500",
    barColor: "bg-purple-500",
    chartColor: "#9333EA",
  },
  {
    name: "shopping",
    icon: ShoppingBag,
    bgColor: "bg-orange-100",
    color: "text-orange-600",
    barColor: "bg-orange-600",
    chartColor: "#EA580C",
  },
  {
    name: "health",
    icon: HeartPlus,
    bgColor: "bg-teal-100",
    color: "text-teal-600",
    barColor: "bg-teal-600",
    chartColor: "#0D9488",
  },
  {
    name: "entertainment",
    icon: Gamepad2,
    bgColor: "bg-pink-100",
    color: "text-pink-600",
    barColor: "bg-pink-600",
    chartColor: "#DB2777",
  },
  {
    name: "other",
    icon: CircleHelp,
    bgColor: "bg-gray-100",
    color: "text-gray-600",
    barColor: "bg-gray-600",
    chartColor: "#4B5563",
  },
];

export const INCOME_CATEGORIES = [
  {
    name: "salary",
    icon: Briefcase,
    bgColor: "bg-green-100",
    color: "text-green-600",
    barColor: "bg-green-600",
    chartColor: "#16A34A",
  },
  {
    name: "freelance",
    icon: Laptop,
    bgColor: "bg-indigo-100",
    color: "text-indigo-600",
    barColor: "bg-indigo-600",
    chartColor: "#4546E5",
  },
  {
    name: "investment",
    icon: TrendingUp,
    bgColor: "bg-emerald-100",
    color: "text-emerald-600",
    barColor: "bg-emerald-600",
    chartColor: "#059669",
  },
  {
    name: "gift",
    icon: Gift,
    bgColor: "bg-rose-100",
    color: "text-rose-600",
    barColor: "bg-rose-600",
    chartColor: "#E11D48",
  },
  {
    name: "other",
    icon: CircleHelp,
    bgColor: "bg-gray-100",
    color: "text-gray-600",
    barColor: "bg-gray-600",
    chartColor: "#4B5563",
  },
];

export const formatDate = (date) => {
  return new Date(date).toDateString("en-In", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
