import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cleanModelResponse = (text: string) =>
  text
    .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
    .replace(/`(.*?)`/g, "<code>$1</code>");

export const convertDoubleStarToBold = (text: string) =>
  text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");

export const convertDoubleBackTicksToBold = (text: string) =>
  text.replace(/`(.*?)`/g, "<code>$1</code>");
