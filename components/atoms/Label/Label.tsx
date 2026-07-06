import { useLabelStyles } from "./label.hooks";

interface LabelProps {
  children: React.ReactNode;
}

export function Label({ children }: LabelProps) {
  const className = useLabelStyles();

  return <span className={className}>{children}</span>;
}
