import api from "@/src/shared/lib/axios";
import { type AddTransactionFormValues } from "../schema/add-transaction.schema";

export const addTransactionRequest = (data: AddTransactionFormValues) => {
  return api.post("/transactions/create", data);
};

export const getTransactionRequest = (page:number, limit:number) => {
  return api.get(`/transactions/all?page=${page}&limit=${limit}`);
}

export const getTransactionByIdRequest = (id: string) => {
  return api.get(`/transactions/tenant/${id}`);
}

export const updateTransactionRequest = (id: string, data: AddTransactionFormValues) => {
  return api.put(`/transactions/${id}`, data);
}