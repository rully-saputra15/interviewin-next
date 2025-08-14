export type PAGE_STATE = "INITIAL" | "INTERVIEWING" | "RESULT";
export type LANGUAGE = "english" | "bahasa";
export type SENIORITY_LEVEL = "entry" | "mid-senior" | "senior";

export type InterviewHistory = {
  role: "user" | "model";
  parts: Array<{ text: string }>;
};

export type InterviewApiParams = {
  newMessage: string;
  history: Array<InterviewHistory>;
};

export type GenerateTextFromAudioParams = {
  file: Blob;
};

export type Question = {
  title: string;
  role: string;
  question: string;
  competencies: Array<string>;
}

export type InterviewResult = {
  title: string;
  strengths: Array<string>;
  improvements: Array<string>;
}