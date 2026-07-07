type StatusOrbVariant = "progress" | "complete" | "neutral";

type StatusOrbProps = {
  label: string;
  variant?: StatusOrbVariant;
};

const variantStyles: Record<StatusOrbVariant, string> = {
  progress: "bg-secondary-container text-secondary shadow-[0_0_24px_color-mix(in_srgb,var(--secondary)_25%,transparent)]",
  complete: "bg-tertiary/15 text-tertiary shadow-[0_0_24px_color-mix(in_srgb,var(--tertiary)_20%,transparent)]",
  neutral: "bg-surface-container-high text-on-surface-muted",
};

export function StatusOrb({ label, variant = "neutral" }: StatusOrbProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium tracking-wide uppercase ${variantStyles[variant]}`}
    >
      <span className="size-2 rounded-full bg-current opacity-80" aria-hidden />
      {label}
    </span>
  );
}
