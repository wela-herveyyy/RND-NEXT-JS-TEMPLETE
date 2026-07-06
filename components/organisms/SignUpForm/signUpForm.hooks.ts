import type { LabelInputField } from "@/components/molecules/LabelInput/labelInput.hooks";

type SignUpFormParams = {
  error?: string;
  callbackURL?: string;
};

const signUpFields: LabelInputField[] = [
  {
    label: "Name",
    name: "name",
    type: "text",
    autoComplete: "name",
    required: true,
    placeholder: "John Doe",
  },
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
    autoComplete: "new-password",
    required: true,
    minLength: 8,
    placeholder: "At least 8 characters",
  },
];

export function getSignUpFormState(params: SignUpFormParams) {
  return {
    callbackURL: params.callbackURL || "/",
    error: params.error,
    fields: signUpFields,
  };
}
