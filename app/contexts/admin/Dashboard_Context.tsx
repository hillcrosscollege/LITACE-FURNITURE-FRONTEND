"use client";
import api from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, ReactNode } from "react";
import { useContext } from "react";

export interface IDashboardContext {
  admin: any;
}

const DashboardContext = createContext<IDashboardContext | null>(null);

const useGetMe = () => {
  const getMeApi = async (): Promise<any> => {
    const { data } = await api.get(`/admin/auth/me`);
    return data;
  };
  return useQuery({
    queryKey: ["admin", "me"],
    queryFn: getMeApi,
  });
};
const DashboardContextProvider = ({ children }: { children: ReactNode }) => {
  const { data: admin, isLoading, isError } = useGetMe();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading dashboard...</div>;
  }

  if (isError || !admin) {
    // router.replace("/sign-in");

    return null;
  }

  return (
    <DashboardContext.Provider value={{ admin }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);

  if (!context) {
    throw new Error(
      "useDashboardContext must be used within DashboardContextProvider",
    );
  }

  return context;
};
