"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLogoutMutation } from "../hooks/useLogoutMutation";
const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/rent-manager", label: "Rent Manager" },
    { href: "/room-overview", label: "Room Overview" },
  // { href: "/login", label: "Logout" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const logoutMutation = useLogoutMutation();

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-white p-4 hidden md:flex md:flex-col">
      <div className="mb-8">
        <h1 className="text-lg font-bold text-brand">Management Console</h1>
        <p className="text-sm text-gray-500">Boarding House Rental System</p>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-brand text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
         <button
          type="button"
          onClick={() => logoutMutation.mutate()}
          disabled={logoutMutation.isPending}
          className="rounded-md px-3 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100 disabled:opacity-60"
        >
          {logoutMutation.isPending ? "Logging out..." : "Logout"}
        </button>
      </nav>
    </aside>
  );
}