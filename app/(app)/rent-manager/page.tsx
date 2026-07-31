"use client";

import TenantTable from "@/src/features/rent-manager/components/TenantTable";
import AddTenant from "@/src/features/rent-manager/components/AddTenant";
import TransactionTable from "@/src/features/rent-manager/components/TransactionTable";
import { useState } from "react";
import AddTransaction from "@/src/features/rent-manager/components/AddTransaction";

const RentManagerPage = () => {
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false);
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  return (
    <div className="space-y-6 flex flex-col p-10">
      <h1 className="text-3xl font-bold text-black">Rent Manager Ledger</h1>
      <p className="mt-2 text-sm text-gray-600">
        Review and manage all rent transactions, tenant payments, and
        outstanding balances in one place. This page is designed to help you
        keep track of your rental income and ensure timely payments from your
        tenants.
      </p>
      <div className="flex flex-row justify-start">
        {isAddTenantOpen && (
          <AddTenant onClose={() => setIsAddTenantOpen(false)} title="Add New Tenant" />
        )}
        <button
          className="mr-4 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white cursor-pointer hover:bg-brand-dark"
          onClick={() => setIsAddTenantOpen(true)}
        >
          Add New Tenant
        </button>
      </div>
      <TenantTable />
      <div>
      <h1 className="text-3xl font-bold text-black">Financial Transaction</h1>
      <button
        className="mt-4 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
        onClick={() => setIsAddTransactionOpen(true)}
      >
        Add New Transaction
      </button>
      </div>
      {isAddTransactionOpen && (
        <AddTransaction onClose={() => setIsAddTransactionOpen(false)} title="Add New Transaction" />
      )}
      <TransactionTable />
    </div>
  );
};

export default RentManagerPage;
