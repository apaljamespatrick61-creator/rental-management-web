"use client";

import { useQuery } from "@tanstack/react-query";
import { getTenantByIdRequest } from "../../api/api-tenant";
export const useGetTenantByIdQuery = (tenantId: string) => {
  const getTenantByIdQuery = useQuery({
    queryKey: ["tenant", tenantId],
    queryFn: () => getTenantByIdRequest(tenantId),
    enabled: !!tenantId, // Only run the query if tenantId is provided
  });
  return { getTenantByIdQuery };
};