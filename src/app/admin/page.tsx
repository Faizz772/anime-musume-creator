import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { getGallery } from "@/lib/gallery";
import { AdminDashboard } from "@/components/admin-dashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const items = await getGallery();

  return <AdminDashboard initialItems={items} />;
}
