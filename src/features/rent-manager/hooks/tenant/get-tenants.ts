"use client";
import {getTenants} from "../../api/api-tenant";
import {useQuery} from "@tanstack/react-query";

export const useGetTenantsQuery = () => {
  const getTenantsQuery = useQuery({
    queryKey: ["tenantsName"],
    queryFn: () => getTenants(),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    gcTime: 10 * 60 * 1000, // Garbage collect after 10 minutes
  });
  return { getTenantsQuery };
}