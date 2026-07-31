import {
  DoorOpen,
  DoorClosedLocked,
  BedDouble,
  Construction,
} from "lucide-react";

interface RoomStatsProps {
  title: string;
  value: string | number;
  icon?: string;
}

const iconMap = {
  door: DoorOpen,
  occupied: DoorClosedLocked,
  available: BedDouble,
  maintenance: Construction,
};

const colorMap = {
  door: "text-brand",
  occupied: "text-yellow-500",
  available: "text-red-500",
  maintenance: "text-green-500",
};

const RoomStats = ({ title, value, icon }: RoomStatsProps) => {
  const LucideIcon = icon ? iconMap[icon as keyof typeof iconMap] : null;

  return (
    <div className="w-full max-w-xs rounded-lg border border-gray-200 bg-white p-4 shadow-sm p-12 flex items-center flex-col">
      <div className="flex flex-row items-center">
        {LucideIcon && (
          <LucideIcon
            className={`h-8 w-8  ${icon ? colorMap[icon as keyof typeof colorMap] : ""}`}
          />
        )}
        <p className="text-2xl font-semibold text-black p-2">{title}</p>
      </div>
      <p className=" text-3xl text-gray-600 font-bold">{value}</p>
    </div>
  );
};
export default RoomStats;
