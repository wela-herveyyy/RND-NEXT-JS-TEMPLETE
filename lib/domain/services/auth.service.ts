import type {
  ActionLogEntry,
  ActionSession,
  AuthResult,
  AuthSession,
  AuthUser,
  SignInInput,
  SignUpInput,
} from "@/lib/entities/auth.type";
import { getUserRole } from "../usecases/users/get_user_role.usecase";
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

/** Authentication for domain actions — returns session + role, or null if missing/expired. */
export async function auth(): Promise<ActionSession | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const role = await getUserRole(session.user.id);

  if (!role) {
    return null;
  }

  return {
    user: { ...session.user, role },
    expired: false,
  };
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
