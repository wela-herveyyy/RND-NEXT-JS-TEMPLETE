import type { InputHTMLAttributes } from "react";

export type LabelInputField = {
  label: string;
  name: string;
  type?: InputHTMLAttributes<HTMLInputElement>["type"];
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
};

export function useLabelInputStyles() {
  return "block space-y-2";
}
