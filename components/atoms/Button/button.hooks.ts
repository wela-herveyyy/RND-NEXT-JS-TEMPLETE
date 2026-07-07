type ButtonVariant = "primary" | "secondary" | "danger" | "success";

export function useButtonStyles(variant: ButtonVariant = "primary") {
  const baseStyle =
    "inline-flex items-center justify-center px-6 py-3 rounded-2xl text-sm font-medium transition-transform active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";

  const variantStyle: Record<ButtonVariant, string> = {
    primary: "btn-primary-gradient text-on-primary shadow-bloom",
    secondary: "bg-surface-container-highest text-primary",
    danger: "bg-secondary text-on-secondary",
    success: "bg-tertiary text-on-primary",
  };

  return `${baseStyle} ${variantStyle[variant]}`;
}

export function useAuthFormSubmitStyles() {
  return `${useButtonStyles("primary")} w-full`;
}
