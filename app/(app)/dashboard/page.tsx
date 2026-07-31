"use client";

import MonthlyChart from "@/src/features/dashboard/components/MonthlyChart";
import StatsCard from "@/src/features/dashboard/components/StatsCard";
import RecentActivity from "@/src/features/dashboard/components/RecentActivity";

export default function DashboardPage() {
  return (
    <div className="space-y-6 p-10">
      <div>
        <h1 className="text-3xl font-bold text-black">Monthly Summary</h1>
        <p className="mt-2 text-sm text-gray-600">
          Welcome to your management overview.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 justify-between">
        <StatsCard title="Total Rent Collected" value={"124,500"} icon="bank" />
        <StatsCard title="Pending Payments" value={"12,300"} icon="pending" />
        <StatsCard title="Overdue Amount" value={"4,120"} icon="overdue" />
        <StatsCard title="Total Tenants" value={"30"} icon="tenants" />
      </div>
      <div className="grid gap-4 lg:grid-cols-[8fr_2fr]">
        <MonthlyChart />
        <RecentActivity/>
      </div>
    </div>
  );
}
