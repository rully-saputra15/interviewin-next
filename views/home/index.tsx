"use client";

import React from "react";
import { HomeProvider, useHomeContext } from "./useHomePage";
import InitialPage from "./blocks/InitialPage";
import InterviewPage from "./blocks/InterviewPage";
import ResultPage from "./blocks/ResultPage";

const HomePage = () => {
  const { pageState, shouldRenderInitialPage } = useHomeContext();
  return (
    <main className="text-center">
      {shouldRenderInitialPage && <InitialPage />}
      {!shouldRenderInitialPage && pageState === "INTERVIEWING" && (
        <InterviewPage />
      )}
      {pageState === "RESULT" && <ResultPage />}
    </main>
  );
};

const ClientHomePage = () => {
  return (
    <HomeProvider>
      <HomePage />
    </HomeProvider>
  );
};

export default ClientHomePage;
