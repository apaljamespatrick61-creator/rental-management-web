"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {addTransactionRequest} from "../../api/api-transaction";
import type {AddTransactionFormValues} from "../../schema/add-transaction.schema";
import { toast } from "sonner";

type BackendError = {
  message?: string;
};

export const useAddTransactionMutation = () => {
  const queryClient = useQueryClient();

  const addTransactionMutation = useMutation({
    mutationFn: (data: AddTransactionFormValues) => addTransactionRequest(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["transactions"] });
      toast.success(data?.data.message);
    },
    onError: (error: BackendError) => {
      toast.error(error.message || "An error occurred");
    },
  });
  return { addTransactionMutation };
};