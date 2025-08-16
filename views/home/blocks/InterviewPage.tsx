import React from "react";
import { useHomeContext } from "../useHomePage";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Loading from "@/components/custom/Loading";
import {
  BookOpenText,
  CircleQuestionMark,
  CircleStop,
  Mic,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import SectionCard from "./SectionCard";

const InterviewPage = () => {
  const {
    isLoading,
    isStartRecorded,
    isGenerateTextFromAudio,
    question,
    answerLength,
    answer,
    isMicPermissionGranted,
    isQuestionExitAnimation,
    handleChangeAnswer,
    handleSubmitAnswer,
    handleEndInterview,
    handleRecordAudio,
    handleStopRecordAudio,
  } = useHomeContext();
  return (
    <section className={cn(isQuestionExitAnimation ? "fade_out" : "w-full")}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="p-5 space-y-5 h-dvh fade_in relative">
          <Button
            variant="destructive"
            className="absolute top-3 right-3"
            onClick={handleEndInterview}
          >
            End
          </Button>
          <h1 className="font-bold text-lg sm:text-xl">User Interview</h1>
          <div className="flex flex-col gap-2 text-left w-full">
            <SectionCard
              title={<Badge variant={"secondary"}>User&apos;s Role</Badge>}
              content={<p className="font-medium text-sm">{question?.role}</p>}
            />

            <SectionCard
              title={
                <div className="flex items-center gap-2">
                  <CircleQuestionMark size={16} />
                  <h3 className="font-bold text-md">Question</h3>
                </div>
              }
              content={
                <p className="font-medium text-xs">{question?.question}</p>
              }
            />

            <SectionCard
              title={
                <div className="flex items-center gap-2">
                  <BookOpenText size={16} />
                  <h3 className="font-bold text-md">Competencies</h3>
                </div>
              }
              content={
                <div>
                  {question?.competencies.map((el) => (
                    <li key={el} className="text-xs">
                      {el}
                    </li>
                  ))}
                </div>
              }
            />
          </div>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="answer">Your Answer</Label>
            <Textarea
              id="answer"
              rows={5}
              maxLength={1000}
              value={answer}
              disabled={isGenerateTextFromAudio}
              onChange={(e) => handleChangeAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmitAnswer();
              }}
            ></Textarea>
            <p className="text-sm text-left text-muted-foreground">
              {answerLength} / 1000
            </p>
            <section className="flex flex-col gap-3 mt-2">
              {isGenerateTextFromAudio ? (
                <Button variant="outline">Loading</Button>
              ) : (
                <Button
                  onClick={
                    isStartRecorded ? handleStopRecordAudio : handleRecordAudio
                  }
                  disabled={isGenerateTextFromAudio || isMicPermissionGranted}
                  variant="secondary"
                >
                  {isStartRecorded ? (
                    <CircleStop />
                  ) : (
                    <>
                      <Mic />
                      Record
                      <Badge variant="destructive">New!</Badge>
                    </>
                  )}
                </Button>
              )}
              <Button
                disabled={answerLength === 0}
                onClick={handleSubmitAnswer}
              >
                Submit
              </Button>
            </section>
          </div>
        </div>
      )}
    </section>
  );
};


export default InterviewPage;
