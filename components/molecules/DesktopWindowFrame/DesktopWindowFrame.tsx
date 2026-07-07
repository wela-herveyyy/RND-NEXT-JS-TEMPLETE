import type { ReactNode } from "react";

type DesktopWindowFrameProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

export function DesktopWindowFrame({ title, children, className = "" }: DesktopWindowFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-surface-container-lowest shadow-bloom ring-1 ring-primary/10 ${className}`}
    >
      <div className="flex items-center gap-2 bg-surface-container-low px-5 py-3.5">
        <span className="size-3 rounded-full bg-secondary/70" aria-hidden />
        <span className="size-3 rounded-full bg-secondary-container" aria-hidden />
        <span className="size-3 rounded-full bg-primary/25" aria-hidden />
        <span className="ml-3 flex-1 truncate text-center font-mono text-xs text-on-surface-muted">
          {title}
        </span>
      </div>
      <div className="futuristic-card-grid min-h-[280px] p-8 lg:min-h-[320px] lg:p-10">{children}</div>
    </div>
  );
}
