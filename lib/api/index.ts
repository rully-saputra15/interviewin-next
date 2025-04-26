import { GenerateTextFromAudioParams, InterviewApiParams } from "@/views/types";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API;

const api = {
  startIntreview: (payload: InterviewApiParams) => {
    return fetch(`${BASE_URL}/v1/interview`, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        data: payload,
      }),
    });
  },
  generateTextFromAudio: (payload: GenerateTextFromAudioParams) => {
    const formData = new FormData();
    formData.append("audio", payload.file);
    return fetch(`${BASE_URL}/v1/interview/audio`, {
      method: "POST",
      body: formData,
    });
  },
};

export default api;
