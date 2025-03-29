import {
  useContext,
  createContext,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import {
  InterviewHistory,
  LANGUAGE,
  PAGE_STATE,
  SENIORITY_LEVEL,
} from "../types";
import useAnimation from "@/lib/hooks/useAnimation";
import api from "@/lib/api";
import { toast } from "sonner";
import { convertDoubleStarToBold } from "@/lib/utils";
import { initialize, trackCustomEvent } from "@/lib/tracking";

type TContext = ReturnType<typeof useHomePage>;

const returnPromise = new Promise<void>((resolve) => resolve());
const initialState: TContext = {
  pageState: "INITIAL",
  selectedLanguage: "bahasa",
  selectedSeniorityLevel: null,
  shouldRenderInitialPage: false,
  isInitialPageExitAnimating: false,
  isStartInterviewButtonEnabled: false,
  isLoading: false,
  question: "",
  answerLength: 0,
  answer: "",
  isQuestionExitAnimation: false,
  handleStartInterview: () => returnPromise,
  handleChangeAnswer: () => {},
  handleSubmitAnswer: () => returnPromise,
  handleEndInterview: () => returnPromise,
  handleSelectLanguage: () => {},
  handleSelectSeniorityLevel: () => {},
};

const HomeContext = createContext(initialState);

const useHomePage = () => {
  const [pageState, setPageState] = useState<PAGE_STATE>("INITIAL");
  const [selectedLanguage, setSelectedLanguage] = useState<LANGUAGE>("bahasa");
  const [selectedSeniorityLevel, setSelectedSeniorityLevel] =
    useState<SENIORITY_LEVEL | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);

  const chatHistory = useRef<Array<InterviewHistory>>([]);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const {
    shouldRender: shouldRenderInitialPage,
    isAnimating: isInitialPageExitAnimating,
  } = useAnimation({
    isVisible: pageState === "INITIAL",
    cssTransitionDelay: 500,
  });

  const { isAnimating: isQuestionExitAnimation } = useAnimation({
    isVisible: !isSubmittingAnswer,
    cssTransitionDelay: 500,
  });

  useEffect(() => {
    initialize();
  }, []);

  const handleSelectLanguage = (lang: LANGUAGE) => setSelectedLanguage(lang);
  const handleSelectSeniorityLevel = (level: SENIORITY_LEVEL) =>
    setSelectedSeniorityLevel(level);

  const handleStartInterview = async () => {
    try {
      setPageState("INTERVIEWING");
      setIsLoading(true);
      const newMessage = `The user choose using ${selectedLanguage} for this interview and ${selectedSeniorityLevel} level for the level.`;
      const res = await api.startIntreview({
        history: [],
        newMessage,
      });
      const result = await res.json();
      _addNewHistory([
        {
          role: "user",
          parts: [
            {
              text: newMessage,
            },
          ],
        },
      ]);
      setQuestion(convertDoubleStarToBold(result.message));
      trackCustomEvent(`${selectedSeniorityLevel || "entry"}_level`, {
        event_category: "interaction",
        value: 1,
        event_name: "submit_answer",
      });
      trackCustomEvent(`${selectedLanguage}_lang`, {
        event_category: "interaction",
        value: 1,
        event_name: "submit_answer",
      });
    } catch (err) {
      toast.error(`Error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const isStartInterviewButtonEnabled = useMemo(
    () => !!selectedLanguage && !!selectedSeniorityLevel,
    [selectedLanguage, selectedSeniorityLevel]
  );

  const answerLength = useMemo(() => answer.length, [answer]);

  const handleChangeAnswer = (ans: string) => setAnswer(ans);

  const handleSubmitAnswer = async () => {
    try {
      setIsSubmittingAnswer(true);
      setIsLoading(true);
      const res = await api.startIntreview({
        history: chatHistory.current,
        newMessage: answer,
      });
      const result = await res.json();
      const newQuestion = convertDoubleStarToBold(result.message);
      setQuestion(newQuestion);
      _addNewHistory([
        {
          role: "user",
          parts: [
            {
              text: answer,
            },
          ],
        },
        {
          role: "model",
          parts: [
            {
              text: newQuestion,
            },
          ],
        },
      ]);
      trackCustomEvent("submit_answer", {
        event_category: "interaction",
        value: 1,
        event_name: "submit_answer",
      });
      setAnswer("");
    } catch (err) {
      toast.error(`Error: ${err}`);
    } finally {
      setIsSubmittingAnswer(false);
      setIsLoading(false);
    }
  };

  const handleEndInterview = async () => {
    try {
      setIsLoading(true);
      setPageState("RESULT");
      const res = await api.startIntreview({
        history: chatHistory.current,
        newMessage: "AMAN AJA",
      });
      const result = await res.json();
      const newQuestion = convertDoubleStarToBold(result.message);
      setQuestion(newQuestion);
      trackCustomEvent("see_full_result", {
        event_category: "interaction",
        value: 1,
        event_name: "see_final_result",
      });
    } catch (err) {
      toast.error(`Error: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const _addNewHistory = (interviews: Array<InterviewHistory>) => {
    const newHistory: Array<InterviewHistory> = [
      ...chatHistory.current,
      ...interviews,
    ];
    chatHistory.current = newHistory;
  };

  return {
    pageState,
    selectedLanguage,
    selectedSeniorityLevel,
    isInitialPageExitAnimating,
    isLoading,
    question,
    answer,
    answerLength,
    isStartInterviewButtonEnabled,
    isQuestionExitAnimation,
    shouldRenderInitialPage,
    handleSelectLanguage,
    handleEndInterview,
    handleStartInterview,
    handleChangeAnswer,
    handleSubmitAnswer,
    handleSelectSeniorityLevel,
  };
};

export const HomeProvider = ({ children }: React.PropsWithChildren) => {
  const value = useHomePage();
  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export const useHomeContext = () => {
  if (!HomeContext) {
    throw new Error("Home context doesn't existed");
  }
  return useContext(HomeContext);
};
