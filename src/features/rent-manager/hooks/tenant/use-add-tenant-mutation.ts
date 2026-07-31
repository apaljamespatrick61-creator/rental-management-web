"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTenantRequest } from "../../api/api-tenant";
import type { AddTenantFormValues } from "../../schema/add-tenant.schema";
import { toast } from "sonner";

type BackendError = {
  message?: string;
};

export const useAddTenantMutation = () => {
  const queryClient = useQueryClient();

  const addTenantMutation = useMutation({
    mutationFn: (data: AddTenantFormValues) => addTenantRequest(data),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ["tenants"] });
      toast.success(data?.data.message);
    },
    onError: (error: BackendError) => {
      toast.error(error.message || "An error occurred");
    },
  });
  return { addTenantMutation };
};