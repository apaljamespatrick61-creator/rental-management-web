import { useQuery } from '@tanstack/react-query';
import { getAllRoomsRequest } from "../../api/api-room";

export const useGetRoomsQuery = (page: number, limit: number) => {
  const getRoomsQuery = useQuery({
    queryKey: ['rooms', page, limit],
    queryFn: () => getAllRoomsRequest(page, limit),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    gcTime: 10 * 60 * 1000, // Garbage collect after 10 minutes
  });
  return { getRoomsQuery };
};