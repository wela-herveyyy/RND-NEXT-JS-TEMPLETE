import type { UserRole } from "@/lib/entities/users.type";

export type SignInInput = {
  email: string;
  password: string;
  callbackURL?: string;
  rememberMe?: boolean;
};

export type SignUpInput = {
  name: string;
  email: string;
  password: string;
  image?: string;
  callbackURL?: string;
};

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  image?: string | null;
};

export type AuthSession = {
  user: AuthUser;
};

export type AuthResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string };

export type ActionSession = {
  user: AuthUser & { role: UserRole };
  expired: boolean;
};

export type ActionLogEntry = {
  userId: string;
  action: string;
  success: boolean;
  error?: string;
  role?: string;
  metadata?: Record<string, unknown>;
};
