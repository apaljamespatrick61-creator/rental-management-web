import api from "@/src/shared/lib/axios";
import { type AddRoomFormValues } from "../schema/add-room-schema";

export const addRoomRequest = (data: AddRoomFormValues) => {
  return api.post("/rooms/create", data);
};

export const getAllRoomsRequest = (page: number, limit: number) => {
  return api.get(`/rooms/all?page=${page}&limit=${limit}`);
};