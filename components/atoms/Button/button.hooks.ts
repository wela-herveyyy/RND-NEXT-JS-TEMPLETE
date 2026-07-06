type ButtonVariant = "primary" | "secondary" | "danger" | "success";

export function useButtonStyles(variant: ButtonVariant = "primary") {
  const baseStyle = "px-4 py-2 rounded-md";
  const variantStyle: Record<ButtonVariant, string> = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
    danger: "bg-red-500 text-white",
    success: "bg-green-500 text-white",
  };

  return `${baseStyle} ${variantStyle[variant]}`;
}

export function useAuthFormSubmitStyles() {
  return "w-full rounded-lg bg-black px-4 py-3 font-medium text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-black";
}
