import type { InputHTMLAttributes } from "react";
import { useInputStyles } from "./input.hooks";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...props }: InputProps) {
  const baseClassName = useInputStyles();

  return <input className={className ? `${baseClassName} ${className}` : baseClassName} {...props} />;
}
