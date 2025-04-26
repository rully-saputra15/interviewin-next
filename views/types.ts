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
