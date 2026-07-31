"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTenantRequest } from "../../api/api-tenant";

export const useGetTenantQuery = (page: number, limit: number) => {
  const getTenantQuery = useQuery({
    queryKey: ["tenants", page, limit],  
    queryFn: () => getTenantRequest(page, limit),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    gcTime: 10 * 60 * 1000, // Garbage collect after 10 minutes
  });
  return { getTenantQuery };
};
