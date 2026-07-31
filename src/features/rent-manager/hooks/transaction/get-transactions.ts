"use client";
import { getTransactionRequest } from "../../api/api-transaction";
import { useQuery } from "@tanstack/react-query";

export const useGetTransactionsQuery = (page: number, limit: number) => {
  const getTransactionsQuery = useQuery({
    queryKey: ["transactions", page, limit],
    queryFn: () => getTransactionRequest(page, limit),
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    gcTime: 10 * 60 * 1000, // Garbage collect after 10 minutes
  });
  return { getTransactionsQuery };
}