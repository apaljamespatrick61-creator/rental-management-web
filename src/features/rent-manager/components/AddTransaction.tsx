"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addTransactionSchema,
  type AddTransactionFormValues,
} from "../schema/add-transaction.schema";
import { useAddTransactionMutation } from "../hooks/transaction/use-add-transaction-mutation";
import { useGetTenantsQuery } from "../hooks/tenant/get-tenants";
import { useUpdateTransactionByIdMutation } from "../hooks/transaction/use-update-transaction-by-id";
import { useEffect } from "react";
interface AddTransactionProps {
  onClose: () => void;
  transaction?: {
    id?: string;
    tenant_id?: string;
    unit?: string;
    amount?: string;
    status?: string;
  };
  title?: string;
}

const transactionStatusOptions = [
  "Paid",
  "Partial Payment",
  "Advance Payment",
] as const;

type TenantOption = {
  id: string;
  name: string;
};

const AddTransaction = ({ onClose, transaction, title }: AddTransactionProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTransactionFormValues>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: transaction
      ? {
          tenant_id: transaction.tenant_id,
          unit: transaction.unit,
          amount: String(transaction.amount),
          status: transaction.status,
        }
      : undefined,
  });
  const { addTransactionMutation } = useAddTransactionMutation();
  const { updateTransactionByIdMutation } = useUpdateTransactionByIdMutation(
    transaction?.id || "",
  );
  const { getTenantsQuery } = useGetTenantsQuery();
  const tenants: TenantOption[] = getTenantsQuery.data?.data.tenants || [];

  const onSubmit = (data: AddTransactionFormValues) => {
    if (transaction) {
      updateTransactionByIdMutation.mutate(data, {
        onSuccess: () => {
          onClose();
        },
      });
    } else {
      addTransactionMutation.mutate(data, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  useEffect(() => {
    if (transaction) {
      reset({
        tenant_id: transaction.tenant_id,
        unit: transaction.unit,
        amount: transaction.amount ? String(transaction.amount) : "",
        status: transaction.status,
      });
    }
  }, [reset, transaction]);

  const getButtonText = () => {
    if (addTransactionMutation.isPending || updateTransactionByIdMutation.isPending) {
      return "Saving...";
    }

    return transaction ? "Save Changes" : "Add Transaction";
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 bg-opacity-50">
        <div className="relative z-[100000] w-full sm:max-w-lg lg:max-w-xl rounded-xl bg-white p-6 shadow-lg ">
          <h2 className="text-lg font-bold mb-4">{title}</h2>
          <div className="mt-6 space-y-4 p-4">
            <label htmlFor="Tenant Name" className="font-semibold">
              Tenant Name
            </label>

            <select
              className="w-full p-2 border border-gray-300 rounded"
              {...register("tenant_id")}
            >
              <option value="">Select tenant</option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
            {errors.tenant_id && (
              <p className="text-red-500 text-sm">{errors.tenant_id.message}</p>
            )}
            <label htmlFor="Unit Number" className="font-semibold">
              Unit Number
            </label>
            <input
              type="text"
              placeholder="Unit Number"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("unit")}
            />
            {errors.unit && (
              <p className="text-red-500 text-sm">{errors.unit.message}</p>
            )}
            <label htmlFor="Amount" className="font-semibold">
              Amount
            </label>
            <input
              type="text"
              placeholder="Amount"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("amount")}
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">
                {errors.amount.message}
              </p>
            )}
            <label htmlFor="Status" className="font-semibold">
              Status
            </label>

            <select
              className="w-full p-2 border border-gray-300 rounded"
              {...register("status")}
            >
              <option value="">Select status</option>
              {transactionStatusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">{errors.status.message}</p>
            )}
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
              disabled={addTransactionMutation.isPending || updateTransactionByIdMutation.isPending}
            >
              {getButtonText()}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default AddTransaction;
