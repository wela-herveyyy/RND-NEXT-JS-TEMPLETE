import type { LabelInputField } from "@/components/molecules/LabelInput/labelInput.hooks";

type SignInFormParams = {
  error?: string;
  callbackURL?: string;
};

const signInFields: LabelInputField[] = [
  {
    label: "Email",
    name: "email",
    type: "email",
    autoComplete: "email",
    required: true,
    placeholder: "you@example.com",
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    autoComplete: "current-password",
    required: true,
    minLength: 8,
    placeholder: "••••••••",
  },
];

export function getSignInFormState(params: SignInFormParams) {
  return {
    callbackURL: params.callbackURL || "/",
    error: params.error,
    fields: signInFields,
  };
}
