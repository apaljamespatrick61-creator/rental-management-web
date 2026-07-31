import { z } from "zod";
export const addTransactionSchema = z.object({
  tenant_id: z.string().min(1, "Tenant Name is required"),
  unit: z.string().min(1, "Unit Number is required"),
  amount: z.string().min(1, "Monthly Rent is required"),
  status: z.string().min(1, "Status is required"),
});

export type AddTransactionFormValues = z.infer<typeof addTransactionSchema>;
