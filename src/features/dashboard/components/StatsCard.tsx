import { Banknote, ClipboardClock, ClockAlert, UsersRound } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon?: string;
}

const iconMap = {
  bank: Banknote,
  pending: ClipboardClock,
  overdue: ClockAlert,
  tenants: UsersRound,
};

const colorMap = {
    bank: "text-brand",
    pending: "text-yellow-500",
    overdue: "text-red-500",
    tenants: "text-green-500",
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => {
  const LucideIcon = icon ? iconMap[icon as keyof typeof iconMap] : null;
  return (
    <div className="w-full max-w-xs rounded-lg border border-gray-200 bg-white p-4 shadow-sm p-10">
      {LucideIcon && <LucideIcon className={`mt-2 h-8 w-8 ${icon ? colorMap[icon as keyof typeof colorMap] : "text-brand"} mb-2`} />}
      <div>
        <p className="text-sm text-gray-500 break-words">{title}</p>
        <p className="mt-2 text-2xl font-semibold text-black">₱ {value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
