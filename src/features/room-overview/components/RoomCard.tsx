import Image from "next/image";

interface RoomCardProps {
  title: string;
  status: "Occupied" | "Available" | "Maintenance";
  capacity: number;
  imageUrl?: string;
  imageWidth?: number;
  imageHeight?: number;
}

const statusColorMap = {
  Occupied: "bg-red-500 text-white",
  Available: "bg-green-500 text-white",
  Maintenance: "bg-yellow-500 text-black",
};

const RoomCard: React.FC<RoomCardProps> = ({
  title,
  status,
  capacity,
  imageUrl,
  imageWidth = 300,
  imageHeight = 300,
}) => {
  return (
    <div className="w-full max-w-xs rounded-lg border border-gray-200 bg-white p-4 shadow-sm p-12">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="text-lg font-semibold text-gray-800">{title}</h1>
        <p className={`${statusColorMap[status]} px-2 py-1 rounded`}>
          {status}
        </p>
      </div>

      {imageUrl && (
        <Image
          src={imageUrl}
          alt={title}
          width={imageWidth}
          height={imageHeight}
          className="rounded-lg object-cover"
        />
      )}
      <p className="text-sm text-gray-500 p-5 font-bold">Capacity: {capacity}</p>
      <div>
        <button className="w-full rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
          Manage Unit
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
