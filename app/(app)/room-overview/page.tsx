"use client";
import RoomList from "@/src/features/room-overview/components/RoomList";
import AddRoom from "@/src/features/room-overview/components/AddRoom";
import { useState } from "react";



const RoomOverviewPage = () => {

  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  return (
    <div className="space-y-6 flex flex-col p-10">
      <h1 className="text-3xl font-bold text-black">Room Overview</h1>
      <p className="mt-2 text-sm text-gray-600">
        This page provides a comprehensive overview of all the rooms in your
        boarding house. You can view the current occupancy status, tenant
        information, and any maintenance issues that may need attention. Use
        this page to quickly assess the status of each room and manage your
        property effectively.
      </p>
      <div className="flex flex-row justify-start">
        <button
          className="mr-4 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white cursor-pointer hover:bg-brand-dark"
          onClick={() => setIsAddRoomOpen(true)}
        >
          Add New Room
        </button>
        {isAddRoomOpen && (
          <AddRoom onClose={() => setIsAddRoomOpen(false)} title="Add New Room" />
        )}
      </div>
      <div>
        <RoomList />
      </div>
    </div>
  );
};
export default RoomOverviewPage;
