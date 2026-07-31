"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTransactionRequest } from "../../api/api-transaction";
import type { AddTransactionFormValues } from "../../schema/add-transaction.schema";
import { toast } from "sonner";

type BackendError = {
  message?: string;
};

export const useUpdateTransactionByIdMutation = (transactionId: string) => {
  const queryClient = useQueryClient();

  const updateTransactionByIdMutation = useMutation({
    mutationFn: (data: AddTransactionFormValues) =>
      updateTransactionRequest(transactionId, data),
    onSuccess: (data) => {
      toast.success(data?.data.message);
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: (error: BackendError) => {
      toast.error(error.message || "An error occurred");
    },
  });

  return { updateTransactionByIdMutation };
};
