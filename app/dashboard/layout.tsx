import Dashboard_Layout from "@/components/layouts/dashboard_layout/Dashboard_Layout";
import DashboardContextProvider from "../contexts/admin/Dashboard_Context";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardContextProvider>
      <Dashboard_Layout>{children}</Dashboard_Layout>
    </DashboardContextProvider>
  );
}
