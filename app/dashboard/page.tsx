export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export type Tool = "neighborhood" | "offer" | "photo" | "client" | "docs" | "diagnostic";

export default function DashboardPage() {
  return (
    <div id="dashboard-root" suppressHydrationWarning>
      <DashboardLoader />
    </div>
  );
}

import DashboardLoader from "@/components/DashboardClient";
