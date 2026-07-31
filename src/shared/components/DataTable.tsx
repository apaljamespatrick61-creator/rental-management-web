"use client";
/* eslint-disable react-hooks/incompatible-library */

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  type PaginationState,
  useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData> {
  readonly data: TData[];
  readonly columns: ColumnDef<TData>[];
  readonly pageCount?: number;
  readonly pagination?: PaginationState;
  readonly onPaginationChange?: React.Dispatch<React.SetStateAction<PaginationState>>;
  readonly emptyText?: string;
  readonly showPagination?: boolean;
}

export default function DataTable<TData>({
  data,
  columns,
  pageCount,
  pagination,
  onPaginationChange,
  emptyText = "No records found.",
  showPagination = true,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: Boolean(pagination),
    pageCount,
    state: pagination ? { pagination } : undefined,
    onPaginationChange,
  });

  return (
    <div className="w-full min-w-0">
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left text-sm font-medium text-gray-600"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-gray-200">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-4 py-3 text-sm text-gray-700"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-sm text-gray-500"
                >
                  {emptyText}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showPagination && pagination ? (
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm disabled:opacity-50"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </button>
            <button
              type="button"
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm disabled:opacity-50"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <select
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm"
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[10, 20].map((size) => (
                <option key={size} value={size}>
                  Show {size}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : null}
    </div>
  );
}
