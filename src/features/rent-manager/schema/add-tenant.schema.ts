import { z } from "zod";
export const addTenantSchema = z.object({
  name: z.string().min(1, "Tenant Name is required"),
  email: z.string().email("Invalid email address").min(1, "Email Address is required"),
  unit: z.string().min(1, "Unit Number is required"),
  monthly_rent: z.string().min(1, "Monthly Rent is required"),
  phone_number: z.string().min(1, "Contact Information is required"),
  lease_start_date: z.string().min(1, "Lease Start Date is required"),
});

export type AddTenantFormValues = z.infer<typeof addTenantSchema>;
