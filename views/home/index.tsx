"use client";

import React from "react";
import { HomeProvider, useHomeContext } from "./useHomePage";
import InitialPage from "./blocks/InitialPage";
import InterviewPage from "./blocks/InterviewPage";
import ResultPage from "./blocks/ResultPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const HomePage = () => {
  const { containerRef, pageState, shouldRenderInitialPage } = useHomeContext();
  return (
    <main ref={containerRef} className="text-center">
      {shouldRenderInitialPage && <InitialPage />}
      {!shouldRenderInitialPage && pageState === "INTERVIEWING" && (
        <InterviewPage />
      )}
      {pageState === "RESULT" && <ResultPage />}
    </main>
  );
};

const ClientHomePage = () => {
  // Create a client
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <HomeProvider>
        <HomePage />
      </HomeProvider>
    </QueryClientProvider>
  );
};

export default ClientHomePage;
