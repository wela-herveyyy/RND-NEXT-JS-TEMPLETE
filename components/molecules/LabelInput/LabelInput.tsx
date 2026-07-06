import { Label } from "@/components/atoms/Label/Label";
import { Input } from "@/components/atoms/Input/Input";
import { useLabelInputStyles, type LabelInputField } from "./labelInput.hooks";

type LabelInputProps = LabelInputField;

export function LabelInput({
  label,
  name,
  type = "text",
  placeholder,
  autoComplete,
  required,
  minLength,
}: LabelInputProps) {
  const className = useLabelInputStyles();

  return (
    <label className={className} htmlFor={name}>
      <Label>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
      />
    </label>
  );
}
