import { InterviewApiParams } from "@/views/types";

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
};

export default api;
