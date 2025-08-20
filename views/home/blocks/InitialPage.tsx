import SelectableItem from "@/components/custom/SelectableItem";
import React from "react";
import { useHomeContext } from "../useHomePage";
import { Button } from "@/components/ui/button";
import { cx } from "class-variance-authority";
import { CLASSNAMES } from "../constants";

const InitialPage = () => {
  const {
    selectedLanguage,
    selectedSeniorityLevel,
    isStartInterviewButtonEnabled,
    handleStartInterview,
    handleSelectLanguage,
    handleSelectSeniorityLevel,
  } = useHomeContext();

  return (
    <section
      className={cx(
        "flex flex-col justify-center items-center gap-4",
      )}
    >
      <h1 className={cx("font-extrabold text-3xl", CLASSNAMES.TITLE)}>Interviewin</h1>
      <div className="flex flex-col gap-1 mt-1">
        <p className={cx("font-normal text-sm text-balance", CLASSNAMES.DESCRIPTION)}>
          AI agent that helps you prepare for your user interviews. Currently,
          it only supports for{" "}
          <strong className="font-bold">frontend engineer</strong> position
        </p>
      </div>
      <p className={cx("text-sm font-bold", CLASSNAMES.LANGUAGE)}>Language</p>
      <div className={cx("flex gap-4", CLASSNAMES.LANGUAGE)}>
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
      <p className={cx("text-sm font-bold", CLASSNAMES.SENIORITY)}>Seniority Level</p>
      <div className={cx("flex gap-4", CLASSNAMES.SENIORITY)}>
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
      <div className={`w-full ${CLASSNAMES.SUBMIT_BUTTON}`}>
   <Button
        disabled={!isStartInterviewButtonEnabled}
        className={" max-w-44"}
        onClick={handleStartInterview}
      >{`Let's Go!`}</Button>
      </div>
   
    </section>
  );
};

export default InitialPage;
