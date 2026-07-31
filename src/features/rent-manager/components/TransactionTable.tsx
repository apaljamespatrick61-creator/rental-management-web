"use client";

import { type ColumnDef, type PaginationState } from "@tanstack/react-table";
import DataTable from "@/src/shared/components/DataTable";
import { useGetTransactionsQuery } from "../hooks/transaction/get-transactions";
import { useCallback, useMemo, useState } from "react";
import AddTransaction from "./AddTransaction";
import { useGetTransactionByIdQuery } from "../hooks/transaction/get-transaction-by-id";

interface Transaction {
  id: string;
  tenant: string;
  unit: string;
  amount: number;
  date: string;
  status: "Paid" | "Partial Payment" | "Advance Payment";
}

const formatDate = (value: string) =>
  new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const StatusBadge = ({ status }: { status: Transaction["status"] }) => {
  const statusStyles = {
    Paid: "text-green-600 bg-green-50 border-green-200",
    "Partial Payment": "text-yellow-600 bg-yellow-50 border-yellow-200",
    "Advance Payment": "text-blue-600 bg-blue-50 border-blue-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
};

const ActionButtons = ({
  transactionId,
  handleEditTransaction,
}: {
  transactionId: string;
  handleEditTransaction: (transactionId: string) => void;
}) => (
  <div className="flex items-center gap-2">
    <button
      className="cursor-pointer rounded-md border bg-brand px-3 py-1.5 text-xs font-medium text-white hover:bg-brand-dark"
      onClick={() => handleEditTransaction(transactionId)}
    >
      Edit
    </button>
  </div>
);

const createColumns = (
  handleEditTransaction: (transactionId: string) => void,
): ColumnDef<Transaction>[] => [
  { accessorKey: "id", header: "Transaction ID" },
  { accessorKey: "tenant_name", header: "Tenant Name" },
  { accessorKey: "unit", header: "Unit" },
  { accessorKey: "amount", header: "Amount" },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ getValue }) => formatDate(getValue<string>()),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ getValue }) => (
      <StatusBadge status={getValue<Transaction["status"]>()} />
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <ActionButtons
        transactionId={row.original.id}
        handleEditTransaction={handleEditTransaction}
      />
    ),
  },
];

const TransactionTable = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { getTransactionsQuery } = useGetTransactionsQuery(
    pagination.pageIndex + 1,
    pagination.pageSize,
  );
  const transactionsData = getTransactionsQuery.data?.data?.transactions || [];
  const totalPages =
    getTransactionsQuery.data?.data?.pagination.totalPages || 0;

  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);
  const { getTransactionByIdQuery } = useGetTransactionByIdQuery(
    selectedTransactionId || "",
  );
  const handleEditTransaction = useCallback((transactionId: string) => {
    setSelectedTransactionId(transactionId);
    setIsAddTransactionOpen(true);
  }, []);

  const columns = useMemo(
    () => createColumns(handleEditTransaction),
    [handleEditTransaction],
  );
  return (
    <div className="w-full min-w-0">
      <DataTable
        data={transactionsData}
        columns={columns}
        emptyText="No transactions found."
        showPagination={true}
        pageCount={totalPages}
        pagination={pagination}
        onPaginationChange={setPagination}
      />
      {isAddTransactionOpen && (
        <AddTransaction
          onClose={() => setIsAddTransactionOpen(false)}
          title="Edit Transaction"
          transaction={getTransactionByIdQuery.data?.data.transactions[0]}
        />
      )}
    </div>
  );
};

export default TransactionTable;
