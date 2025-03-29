import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const convertDoubleStarToBold = (text: string) =>
  text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
