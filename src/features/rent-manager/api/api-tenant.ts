import api from "@/src/shared/lib/axios";
import { type AddTenantFormValues } from "../schema/add-tenant.schema";

export const addTenantRequest = (data: AddTenantFormValues) => {
  return api.post("/tenants/create", data);
};

export const getTenantRequest = (page:number, limit:number) => {
  return api.get(`/tenants/all?page=${page}&limit=${limit}`);
};

export const getTenantByIdRequest = (tenantId: string) => {
  return api.get(`/tenants/${tenantId}`);
}

export const updateTenantRequest = (tenantId: string, data: AddTenantFormValues) => {
  return api.put(`/tenants/update/${tenantId}`, data);
}

export const getTenants =() =>{
  return api.get("/tenants/");
}
