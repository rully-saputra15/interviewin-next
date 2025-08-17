import React from "react";
import { useHomeContext } from "../useHomePage";
import { CircleFadingArrowUp, Dumbbell, Github, Linkedin } from "lucide-react";
import SectionCard from "./SectionCard";

const ResultPage = () => {
  const { isLoading, interviewResult } = useHomeContext();
  return (
    <section className="p-5 fade_in text-balance w-full">
      {isLoading ? (
        <p>Fetching the final result</p>
      ) : (
        <div className="space-y-3">
          <h1 className="font-bold text-lg sm:text-xl">Final Result</h1>
          <p className="text-md">
            {`If you find that this AI Agent is helping you improve, we'd love for you to share it with others. Together, we can help even more people boost their interview skills!`}{" "}
            🤟
          </p>
          <section className="flex flex-col gap-2 text-left w-full">
            <SectionCard
              content={
                <p className="font-medium text-sm">{interviewResult?.title}</p>
              }
            />

            <SectionCard
              title={
                <div className="flex items-center gap-2">
                  <Dumbbell size={16} />
                  <h3 className="font-bold text-md">Strengths</h3>
                </div>
              }
              content={
                <div>
                  {interviewResult?.strengths.map((el) => (
                    <li key={el} className="text-xs">
                      {el}
                    </li>
                  ))}
                </div>
              }
            />

            <SectionCard
              title={
                <div className="flex items-center gap-2">
                  <CircleFadingArrowUp size={16} />
                  <h3 className="font-bold text-md">Improvements</h3>
                </div>
              }
              content={
                <div>
                  {interviewResult?.improvements.map((el) => (
                    <li key={el} className="text-xs">
                      {el}
                    </li>
                  ))}
                </div>
              }
            />
          </section>
          <p>
            created by <strong>Rully Saputra</strong>
          </p>
          <div className="flex gap-3 justify-center items-center">
            <Linkedin
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/rully-saputra-7554a7138/",
                  "noopener noreferrer"
                )
              }
            />
            <Github
              onClick={() =>
                window.open(
                  "https://github.com/rully-saputra15",
                  "noopener noreferrer"
                )
              }
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ResultPage;
