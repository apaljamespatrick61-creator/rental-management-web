import api from "@/src/shared/lib/axios";
import type { LoginFormValues } from "@/app/(auth)/login/schema/login.schema";

export const loginRequest = (data: LoginFormValues) => {
  return api.post("/auth/admin/login", data);
};