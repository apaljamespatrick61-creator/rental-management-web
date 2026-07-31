import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRoomRequest } from "../../api/api-room";
import type { AddRoomFormValues } from "../../schema/add-room-schema";
import { toast } from "sonner";
type BackendError = {
  message?: string;
};

export const useAddRoomMutation = () => {
  const queryClient = useQueryClient();

  const addRoomMutation = useMutation({
    mutationFn: (data: AddRoomFormValues) => addRoomRequest(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["rooms"] });
      toast.success(data?.data.message);
    },
    onError: (error: BackendError) => {
      toast.error(error.message || "An error occurred");
    },
  });
  return { addRoomMutation };
};
