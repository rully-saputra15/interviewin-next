import React from "react";
import { useHomeContext } from "../useHomePage";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Loading from "@/components/custom/Loading";
import { CircleStop, Mic } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    <section className={cn(isQuestionExitAnimation ? "fade_out" : "")}>
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
          <div
            dangerouslySetInnerHTML={{ __html: question }}
            className="text-sm text-left text-balance"
          ></div>
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
