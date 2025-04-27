import {
  useContext,
  createContext,
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { useMutation } from "@tanstack/react-query";
import {
  GenerateTextFromAudioParams,
  InterviewHistory,
  LANGUAGE,
  PAGE_STATE,
  SENIORITY_LEVEL,
} from "../types";
import useAnimation from "@/lib/hooks/useAnimation";
import api from "@/lib/api";
import { toast } from "sonner";
import { cleanModelResponse, convertDoubleStarToBold } from "@/lib/utils";
import { initialize, trackCustomEvent } from "@/lib/tracking";

type TContext = ReturnType<typeof useHomePage>;

const returnPromise = new Promise<void>((resolve) => resolve());
const initialState: TContext = {
  pageState: "INITIAL",
  isGenerateTextFromAudio: false,
  isStartRecorded: false,
  selectedLanguage: "bahasa",
  selectedSeniorityLevel: null,
  shouldRenderInitialPage: false,
  isInitialPageExitAnimating: false,
  isStartInterviewButtonEnabled: false,
  isLoading: false,
  question: "",
  answerLength: 0,
  answer: "",
  isMicPermissionGranted: false,
  isQuestionExitAnimation: false,
  handleStartInterview: () => returnPromise,
  handleChangeAnswer: () => {},
  handleSubmitAnswer: () => returnPromise,
  handleEndInterview: () => returnPromise,
  handleSelectLanguage: () => {},
  handleSelectSeniorityLevel: () => {},
  handleRecordAudio: () => returnPromise,
  handleStopRecordAudio: () => {},
};

const HomeContext = createContext(initialState);

const useHomePage = () => {
  const [pageState, setPageState] = useState<PAGE_STATE>("INITIAL");
  const [selectedLanguage, setSelectedLanguage] = useState<LANGUAGE>("bahasa");
  const [selectedSeniorityLevel, setSelectedSeniorityLevel] =
    useState<SENIORITY_LEVEL | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState(false);

  const mediaRecorder = useRef<MediaRecorder>(null);
  const audioDataRef = useRef<Array<Blob>>([]);
  const [isStartRecorded, setIsStartRecorded] = useState(false);

  const chatHistory = useRef<Array<InterviewHistory>>([]);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const isMicPermissionGranted = useMemo(() => {
    return !mediaRecorder.current;
  }, [mediaRecorder.current]);

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

  const { mutate: generateTextFromAudio, isPending: isGenerateTextFromAudio } =
    useMutation({
      mutationFn: (payload: GenerateTextFromAudioParams) => {
        return api.generateTextFromAudio(payload);
      },
      onSuccess: async (res) => {
        const data = await res.json();
        setAnswer(data.message);
      },
    });

  useEffect(() => {
    initialize();
    _initiateMediaRecorder();
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
      const newQuestion = cleanModelResponse(result.message);
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
              text: result.message,
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
      const newQuestion = cleanModelResponse(result.message);
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

  const handleRecordAudio = () => {
    audioDataRef.current = [];
    mediaRecorder.current?.start();
    setIsStartRecorded(true);
    trackCustomEvent("record_audio", {
      event_category: "interaction",
      value: 1,
      event_name: "record_audio",
    });
  };

  const handleStopRecordAudio = () => {
    mediaRecorder.current?.stop();
  };

  const _addNewHistory = (interviews: Array<InterviewHistory>) => {
    const newHistory: Array<InterviewHistory> = [
      ...chatHistory.current,
      ...interviews,
    ];
    chatHistory.current = newHistory;
  };

  const _initiateMediaRecorder = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      mediaRecorder.current = new MediaRecorder(stream); // construct media recorder

      mediaRecorder.current.ondataavailable = (e) => {
        // when the recording start and the data is available
        audioDataRef.current.push(e.data);
      };
      mediaRecorder.current.onstop = () => {
        // event after we click stop button
        setIsStartRecorded(false);

        const blob = new Blob(audioDataRef.current, {
          type: "audio/mp3",
        });

        generateTextFromAudio({
          file: blob,
        });
      };
    } catch (err) {
      toast.error(`Error Audio Permission: ${err}`);
    }
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
    isGenerateTextFromAudio,
    isStartRecorded,
    isMicPermissionGranted,
    shouldRenderInitialPage,
    handleSelectLanguage,
    handleEndInterview,
    handleStartInterview,
    handleChangeAnswer,
    handleSubmitAnswer,
    handleSelectSeniorityLevel,
    handleRecordAudio,
    handleStopRecordAudio,
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
