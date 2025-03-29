import SelectableItem from "@/components/custom/SelectableItem";
import React from "react";
import { useHomeContext } from "../useHomePage";
import { Button } from "@/components/ui/button";
import { cx } from "class-variance-authority";

const InitialPage = () => {
  const {
    selectedLanguage,
    selectedSeniorityLevel,
    isStartInterviewButtonEnabled,
    isInitialPageExitAnimating,
    handleStartInterview,
    handleSelectLanguage,
    handleSelectSeniorityLevel,
  } = useHomeContext();

  return (
    <section
      className={cx(
        "flex flex-col justify-center items-center gap-4 fade_in",
        isInitialPageExitAnimating ? "fade_out" : ""
      )}
    >
      <h1 className="font-extrabold text-3xl">Interviewin</h1>
      <div className="flex flex-col gap-1 mt-1">
        <p className="font-normal text-sm text-balance">
          AI agent that helps you prepare for your user interviews. Currently,
          it only supports for{" "}
          <strong className="font-bold">frontend engineer</strong> position
        </p>
      </div>
      <p className="text-sm">Language</p>
      <div className="flex gap-4">
        <SelectableItem
          text="Bahasa"
          isSelected={selectedLanguage === "bahasa"}
          onClick={() => handleSelectLanguage("bahasa")}
        />
        <SelectableItem
          text="English"
          isSelected={selectedLanguage === "english"}
          onClick={() => handleSelectLanguage("english")}
        />
      </div>
      <p className="text-sm">Seniority Level</p>
      <div className="flex gap-4">
        <SelectableItem
          text="Entry"
          isSelected={selectedSeniorityLevel === "entry"}
          onClick={() => handleSelectSeniorityLevel("entry")}
        />
        <SelectableItem
          text="Mid-senior"
          isSelected={selectedSeniorityLevel === "mid-senior"}
          onClick={() => handleSelectSeniorityLevel("mid-senior")}
        />
        <SelectableItem
          text="Senior"
          isSelected={selectedSeniorityLevel === "senior"}
          onClick={() => handleSelectSeniorityLevel("senior")}
        />
      </div>
      <Button
        disabled={!isStartInterviewButtonEnabled}
        className="w-full max-w-44"
        onClick={handleStartInterview}
      >{`Let's Go!`}</Button>
    </section>
  );
};

export default InitialPage;
