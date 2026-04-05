"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-card border-r h-screen p-4">
          <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
          <nav className="space-y-2">
            <a href="/admin/products" className="block p-2 rounded hover:bg-accent">
              Products
            </a>
            <a href="/admin/orders" className="block p-2 rounded hover:bg-accent">
              Orders
            </a>
            <a href="/admin/users" className="block p-2 rounded hover:bg-accent">
              Users
            </a>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

