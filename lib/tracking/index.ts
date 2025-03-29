/* eslint-disable @typescript-eslint/ban-ts-comment */

import { LANGUAGE, SENIORITY_LEVEL } from "@/views/types";

export type EVENT_CATEGORY = "interaction";

export type EVENT_NAME =
  | "see_full_result"
  | "submit_answer"
  | `${SENIORITY_LEVEL}_level`
  | `${LANGUAGE}_lang`;

export const initialize = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    // @ts-ignore
    // eslint-disable-next-line prefer-rest-params
    dataLayer.push(arguments);
  }
  window.gtag = gtag;
  // @ts-expect-error
  gtag("js", new Date());
  // @ts-expect-error
  gtag("config", "G-YEZ93G10JR");
};

export const trackCustomEvent = (
  eventName: EVENT_NAME,
  eventParams: Record<string, unknown> = {}
) => {
  if (typeof window.gtag === "undefined") {
    console.warn("GA isn't initalized yet");
  }
  window.gtag("event", eventName, eventParams);
};
