"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

import Analytics from "@/app/components/Analytics";

const queryClient = new QueryClient();
const AnalyticsPage = () => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <Analytics />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default AnalyticsPage;
