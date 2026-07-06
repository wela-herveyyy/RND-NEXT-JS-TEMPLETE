import React from "react";
import { useButtonStyles } from "./button.hooks";

interface Props {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
  type?: "button" | "submit" | "reset";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  children,
  variant = "primary",
  type = "button",
  className,
  onClick,
  disabled,
}) => {
  const styles = [useButtonStyles(variant), className].filter(Boolean).join(" ");
  return (
    <button type={type} className={styles} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};
