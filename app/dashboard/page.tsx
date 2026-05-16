export const dynamic = "force-dynamic";
export const revalidate = 0;

export type Tool = "neighborhood" | "offer" | "photo" | "client" | "docs" | "diagnostic";

export default function DashboardPage() {
  return <DashboardLoader />;
}

import DashboardLoader from "@/components/DashboardClient";
