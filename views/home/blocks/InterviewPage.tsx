import React from "react";
import { useHomeContext } from "../useHomePage";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Loading from "@/components/custom/Loading";

const InterviewPage = () => {
  const {
    isLoading,
    question,
    answerLength,
    answer,
    handleChangeAnswer,
    handleSubmitAnswer,
    handleEndInterview,
    isQuestionExitAnimation,
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
              onChange={(e) => handleChangeAnswer(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmitAnswer();
              }}
            ></Textarea>
            <p className="text-sm text-left text-muted-foreground">
              {answerLength} / 1000
            </p>
            <Button
              className="mt-5"
              disabled={answerLength === 0}
              onClick={handleSubmitAnswer}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default InterviewPage;
