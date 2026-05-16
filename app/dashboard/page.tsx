"use client";
import dynamic from "next/dynamic";

const DashboardClient = dynamic(() => import("@/components/DashboardClient"), {
  ssr: false,
  loading: () => (
    <div style={{
      display: "flex",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
      background: "#0f1422",
      color: "#4f8ef7",
      fontFamily: "sans-serif",
      fontSize: "0.9rem"
    }}>
      Loading AgentIQ…
    </div>
  ),
});

export { type Tool } from "@/types/tools";

export default function DashboardPage() {
  return <DashboardClient />;
}
