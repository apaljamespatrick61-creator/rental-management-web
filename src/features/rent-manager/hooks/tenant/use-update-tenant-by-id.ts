"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTenantRequest } from "../../api/api-tenant";
import type { AddTenantFormValues } from "../../schema/add-tenant.schema";
import { toast } from "sonner";
type BackendError = {
  message?: string;
};

export const useUpdateTenantByIdMutation = (tenantId: string) => {
  const queryClient = useQueryClient();
    const updateTenantByIdMutation = useMutation({
    mutationFn: (data: AddTenantFormValues) => updateTenantRequest(tenantId, data),
    onSuccess: (data) => {
      toast.success(data?.data.message);
        queryClient.invalidateQueries({ queryKey: ["tenants"] });
    },
    onError: (error: BackendError) => {
      toast.error(error.message || "An error occurred");
    },
  });   

  return { updateTenantByIdMutation };
}