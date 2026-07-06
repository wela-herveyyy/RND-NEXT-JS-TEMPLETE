import type {
  AuthResult,
  AuthSession,
  AuthUser,
  SignInInput,
  SignUpInput,
} from "@/lib/entities/auth.type";
import { getSession as getSessionUseCase, getSessionFromHeaders as getSessionFromHeadersUseCase } from "../usecases/auth/get_session.usecase";
import { signIn as signInUseCase } from "../usecases/auth/sign_in.usecase";
import { signOut as signOutUseCase } from "../usecases/auth/sign_out.usecase";
import { signUp as signUpUseCase } from "../usecases/auth/sign_up.usecase";

export async function getSession(): Promise<AuthSession | null> {
  return getSessionUseCase();
}

export async function getSessionFromHeaders(
  requestHeaders: Headers,
): Promise<AuthSession | null> {
  return getSessionFromHeadersUseCase(requestHeaders);
}

export async function signIn(input: SignInInput): Promise<AuthResult<AuthUser>> {
  return signInUseCase(input);
}

export async function signUp(input: SignUpInput): Promise<AuthResult<AuthUser>> {
  return signUpUseCase(input);
}

export async function signOut(): Promise<AuthResult> {
  return signOutUseCase();
}
