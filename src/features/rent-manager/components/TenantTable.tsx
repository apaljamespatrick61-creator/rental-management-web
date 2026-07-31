"use client";
import {
  ColumnDef,
  type PaginationState,
} from "@tanstack/react-table";
import AddNewTenant from "./AddTenant";
import { useCallback, useMemo, useState } from "react";
import { useGetTenantByIdQuery } from "../hooks/tenant/get-tenant-by-id";
import { useGetTenantQuery } from "../hooks/tenant/get-tenant";
import DataTable from "@/src/shared/components/DataTable";

interface Tenant {
  id: string;
  name: string;
  unit: string;
  rent: number;
  status: "Paid" | "Due" | "Overdue" | "Pending";
  dueDate: string;
}

const statusStyles = {
  Paid: "text-green-600 bg-green-50 border-green-200",
  Due: "text-orange-600 bg-orange-50 border-orange-200",
  Overdue: "text-red-600 bg-red-50 border-red-200",
  Pending: "text-gray-600 bg-gray-50 border-gray-200",
} as const;

const createColumns = (
  onEditTenant: (tenantId: string) => void,
): ColumnDef<Tenant>[] => [
  { accessorKey: "name", header: "Tenant" },
  { accessorKey: "unit", header: "Unit" },
  {
    accessorKey: "lease_start_date",
    header: "Start Date",
    cell: ({ getValue }) => {
      const value = getValue<string>();

      return new Date(value).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },
  {
    accessorKey: "monthly_rent",
    header: "Rent",
    cell: ({ getValue }) => `₱${getValue<number>().toLocaleString()}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => {
      const status = getValue<Tenant["status"]>();

      return (
        <span
          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${
            statusStyles[status]
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <button
          className="rounded-md border px-3 py-1.5 text-xs font-medium bg-brand text-white cursor-pointer hover:bg-brand-dark"
          onClick={() => onEditTenant(row.original.id)}
        >
          Edit
        </button>
        {/* <button className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50">
          Delete
        </button> */}
      </div>
    ),
  },
];

const TenantTable = ({}) => {
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false);
  const [selectedTenantId, setSelectedTenantId] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { getTenantQuery } = useGetTenantQuery(
    pagination.pageIndex + 1,
    pagination.pageSize,
  );
  const tenants = getTenantQuery.data?.data.tenants || [];

  const { getTenantByIdQuery } = useGetTenantByIdQuery(selectedTenantId || "");

  const handleEditTenant = useCallback((tenantId: string) => {
    setSelectedTenantId(tenantId);
    setIsAddTenantOpen(true);
  }, []);

  const columns = useMemo(
    () => createColumns(handleEditTenant),
    [handleEditTenant],
  );
  const totalPages = getTenantQuery.data?.data.pagination.totalPages || 0;

  return (
    <div className="w-full min-w-0">
      <DataTable
        data={tenants || []}
        columns={columns}
        pageCount={totalPages}
        pagination={pagination}
        onPaginationChange={setPagination}
        emptyText="No tenants found."
      />

      {isAddTenantOpen && (
        <AddNewTenant
          onClose={() => setIsAddTenantOpen(false)}
          title="Edit Tenant"
          tenant={getTenantByIdQuery.data?.data.tenant}
        />
      )}
    </div>
  );
};

export default TenantTable;
