import RoomStats from "./RoomStats";
import RoomCard from "./RoomCard";

const RoomList = () => {
  return (
    <div className="flex space-x-4 min-w-full flex-col ">
      <div className="flex gap-10 ">
        <RoomStats title="Total " value="101" icon="door" />
        <RoomStats title="Occupied " value="102" icon="occupied" />
        <RoomStats title="Available " value="103" icon="available" />
        <RoomStats title="Maintenance " value="5" icon="maintenance" />
      </div>
      <div className="flex gap-10 mt-4">
        <RoomCard title="Room 101" status="Occupied" capacity={2} imageUrl="https://images.unsplash.com/photo-1502672023488-70e25813eb80" />
        <RoomCard title="Room 102" status="Available" capacity={3} imageUrl="https://images.unsplash.com/photo-1484154218962-a197022b5858" />
        <RoomCard title="Room 103" status="Maintenance" capacity={1} imageUrl="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85" />
        <RoomCard title="Room 104" status="Occupied" capacity={2} imageUrl="https://images.unsplash.com/photo-1506744038136-46273834b3fb" />
      </div>
    </div>
  );
};
export default RoomList;
