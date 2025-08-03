import React from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Admin</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/admin/products" className="p-2 rounded hover:bg-gray-700">
            Products
          </Link>
          <Link href="/admin/orders" className="p-2 rounded hover:bg-gray-700">
            Orders
          </Link>
        </nav>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b px-4 flex items-center justify-between bg-white">
          <h1 className="text-lg font-semibold">Dashboard</h1>
        </header>
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
