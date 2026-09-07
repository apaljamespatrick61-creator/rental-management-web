"use client";
import {
  addTenantSchema,
  type AddTenantFormValues,
} from "../schema/add-tenant.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddTenantMutation } from "../hooks/tenant/use-add-tenant-mutation";
import { useUpdateTenantByIdMutation } from "../hooks/tenant/use-update-tenant-by-id";
import { useEffect } from "react";
interface AddTenantProps {
  onClose: () => void;
  title?: string;
  tenant?: {
    id: string;
    name: string;
    email: string;
    unit: string;
    monthly_rent: number;
    phone_number: string;
    lease_start_date: string;
  };
}

const AddTenant = ({ onClose, title, tenant }: AddTenantProps) => {
  console.log("tenant", tenant);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTenantFormValues>({
    resolver: zodResolver(addTenantSchema),
    defaultValues: tenant
      ? {
          name: tenant.name,
          email: tenant.email,
          unit: tenant.unit,
          monthly_rent: String(tenant.monthly_rent),
          phone_number: tenant.phone_number,
          lease_start_date: tenant.lease_start_date,
        }
      : undefined,
  });

  const { addTenantMutation } = useAddTenantMutation();
  const { updateTenantByIdMutation } = useUpdateTenantByIdMutation(
    tenant?.id || "",
  );

  const onSubmit = (data: AddTenantFormValues) => {
    if (tenant) {
      updateTenantByIdMutation.mutate(data, {
        onSuccess: () => {
          onClose();
        },
      });
    } else {
      addTenantMutation.mutate(data, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };
  const formattedDate = tenant?.lease_start_date
    ? new Date(tenant.lease_start_date).toISOString().split("T")[0]
    : "";

  const getButtonText = () => {
    if (addTenantMutation.isPending || updateTenantByIdMutation.isPending)
      return "Saving...";
    return tenant ? "Save Changes" : "Add Tenant";
  };

  useEffect(() => {
    if (tenant) {
      reset({
        name: tenant.name,
        email: tenant.email,
        unit: tenant.unit,
        monthly_rent: String(tenant.monthly_rent),
        phone_number: tenant.phone_number,
        lease_start_date: tenant.lease_start_date
          ? new Date(tenant.lease_start_date).toISOString().split("T")[0]
          : "",
      });
    }
  }, [tenant, reset]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 bg-opacity-50">
        <div className="relative z-[100000] w-full sm:max-w-lg lg:max-w-xl rounded-xl bg-white p-6 shadow-lg ">
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          <div className="mt-6 space-y-4 p-4">
            <div>
              <label htmlFor="name" className="font-semibold">
                Tenant Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Tenant Name"
                className="w-full p-2 border border-gray-300 rounded"
                {...register("name")}
                defaultValue={tenant?.name}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="font-semibold">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                className="w-full p-2 border border-gray-300 rounded"
                {...register("email")}
                defaultValue={tenant?.email}
                disabled={!!tenant?.email}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="unit" className="font-semibold">
                Unit Number
              </label>
              <input
                id="unit"
                type="text"
                placeholder="Unit Number"
                className="w-full p-2 border border-gray-300 rounded"
                {...register("unit")}
                defaultValue={tenant?.unit}
              />
              {errors.unit && (
                <p className="text-red-500 text-sm">{errors.unit.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="monthly_rent" className="font-semibold">
                Monthly Rent
              </label>
              <input
                id="monthly_rent"
                type="number"
                placeholder="Monthly Rent"
                className="w-full p-2 border border-gray-300 rounded"
                {...register("monthly_rent")}
                defaultValue={tenant?.monthly_rent}
              />
              {errors.monthly_rent && (
                <p className="text-red-500 text-sm">
                  {errors.monthly_rent.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="phone_number" className="font-semibold">
                Contact Information
              </label>
              <input
                id="phone_number"
                type="number"
                placeholder="Contact Information"
                className="w-full p-2 border border-gray-300 rounded"
                {...register("phone_number")}
                defaultValue={tenant?.phone_number}
              />
              {errors.phone_number && (
                <p className="text-red-500 text-sm">
                  {errors.phone_number.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="lease_start_date" className="font-semibold">
                Lease Start Date
              </label>
              <input
                id="lease_start_date"
                type="date"
                placeholder="Lease Start Date"
                className="w-full p-2 border border-gray-300 rounded"
                {...register("lease_start_date")}
                defaultValue={formattedDate}
              />
              {errors.lease_start_date && (
                <p className="text-red-500 text-sm">
                  {errors.lease_start_date.message}
                </p>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
              disabled={addTenantMutation.isPending}
              onClick={handleSubmit(onSubmit)}
            >
              {getButtonText()}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddTenant;
