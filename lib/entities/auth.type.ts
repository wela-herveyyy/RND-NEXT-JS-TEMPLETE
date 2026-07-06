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
