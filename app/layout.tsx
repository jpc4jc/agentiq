import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AgentIQ — AI Tools for Realtors",
  description: "Six AI-powered tools that make realtors smarter at every stage of the deal.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
