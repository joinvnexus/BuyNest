import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getUserOrders } from "@/lib/db";
import { AccountForm } from "./account-form";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect("/login");
  }

  const orders = await getUserOrders(session.user.id);
  const user = session.user;

  return (
    <div className="container max-w-4xl py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      <AccountForm user={user} orders={orders} />
    </div>
  );
}