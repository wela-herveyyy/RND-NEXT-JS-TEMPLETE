import React from "react";

interface Props {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger" | "success";
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<Props> = ({
  children,
  variant = "primary",
  onClick,
  disabled,
}) => {
  const baseStyle = "px-4 py-2 rounded-md";
  const variantStyle = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
    danger: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
  };
  return (
    <button
      className={`${baseStyle} ${variantStyle[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
