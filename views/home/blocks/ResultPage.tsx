import React from "react";
import { useHomeContext } from "../useHomePage";
import { ScrollArea } from "@/components/ui/scroll-area";

const ResultPage = () => {
  const { isLoading, question } = useHomeContext();
  return (
    <section className="p-5 fade_in text-balance">
      {isLoading ? (
        <p>Fetching the final result</p>
      ) : (
        <div className="space-y-3">
          <h1 className="font-bold text-lg sm:text-xl">Final Result</h1>
          <p className="text-md">
            {`If you find that this AI Agent is helping you improve, we'd love for you to share it with others. Together, we can help even more people boost their interview skills!`}{" "}
            🤟
          </p>
          <ScrollArea className="h-56 w-full rounded-md border p-4">
            <div
              dangerouslySetInnerHTML={{ __html: question }}
              className="text-sm text-left text-balance"
            ></div>
          </ScrollArea>
          <p>
            created by <strong>Rully Saputra</strong>
          </p>
          <div className="flex gap-3"></div>
        </div>
      )}
    </section>
  );
};

export default ResultPage;
