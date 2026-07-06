"use server";

/**
 * AAA action template — copy this pattern into every protected action.
 *
 * try {
 *   const userSession = await auth();                         // Authentication
 *   if (!userSession || userSession.expired) { log + error }
 *
 *   if (!hasPermission(userSession.user.role, PERMISSION)) {  // Authorization
 *     log + error
 *   }
 *
 *   const data = await someService();
 *
 *   await logAction({ ... });                                 // Accounting
 *   return { ok: true, data };
 * } catch (error) {
 *   await logAction({ ... });
 *   return { ok: false, error: message };
 * }
 */

import { redirect } from "next/navigation";
import { auth } from "@/lib/domain/services/auth.service";
import { deleteUser, getDevUsers, getUsers } from "@/lib/domain/services/users.service";
import { logAction } from "@/lib/domain/usecases/auth/log_action.usecase";
import {
  hasPermission,
  USER_PERMISSION,
  type UserResult,
  type UserSelect,
} from "@/lib/entities/users.type";

function readField(formData: FormData, name: string): string {
  return String(formData.get(name) ?? "").trim();
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Unexpected error.";
}

/** Reference example — list all users (read permission). */
export async function getUsersAction(): Promise<UserResult<UserSelect[]>> {
  const action = "users:list";
  const permission = USER_PERMISSION.USERS_READ;

  try {
    // 1. Authentication
    const userSession = await auth();
    if (!userSession || userSession.expired) {
      await logAction({
        userId: "anonymous",
        action,
        success: false,
        error: "Authentication required.",
      });
      return { ok: false, error: "Authentication required." };
    }

    // 2. Authorization
    if (!hasPermission(userSession.user.role, permission)) {
      await logAction({
        userId: userSession.user.id,
        action,
        success: false,
        error: "Not authorized.",
        role: userSession.user.role,
      });
      return { ok: false, error: "You are not authorized for this action." };
    }

    const users = await getUsers();

    // 3. Accounting
    await logAction({
      userId: userSession.user.id,
      action,
      success: true,
      role: userSession.user.role,
    });

    return { ok: true, data: users };
  } catch (error) {
    const message = getErrorMessage(error);
    await logAction({ userId: "unknown", action, success: false, error: message });
    return { ok: false, error: message };
  }
}

/** Same AAA template — list dev role users only. */
export async function getDevUsersAction(): Promise<UserResult<UserSelect[]>> {
  const action = "users:list-dev";
  const permission = USER_PERMISSION.USERS_READ;

  try {
    const userSession = await auth();
    if (!userSession || userSession.expired) {
      await logAction({
        userId: "anonymous",
        action,
        success: false,
        error: "Authentication required.",
      });
      return { ok: false, error: "Authentication required." };
    }

    if (!hasPermission(userSession.user.role, permission)) {
      await logAction({
        userId: userSession.user.id,
        action,
        success: false,
        error: "Not authorized.",
        role: userSession.user.role,
      });
      return { ok: false, error: "You are not authorized for this action." };
    }

    const devs = await getDevUsers();

    await logAction({
      userId: userSession.user.id,
      action,
      success: true,
      role: userSession.user.role,
    });

    return { ok: true, data: devs };
  } catch (error) {
    const message = getErrorMessage(error);
    await logAction({ userId: "unknown", action, success: false, error: message });
    return { ok: false, error: message };
  }
}

/** Same AAA template — mutation uses redirect instead of return. */
export async function deleteUserAction(formData: FormData) {
  const action = "users:delete";
  const permission = USER_PERMISSION.USERS_DELETE;
  const id = readField(formData, "id");
  const redirectTo = readField(formData, "redirectTo") || "/users";

  if (!id) {
    redirect(`${redirectTo}?error=${encodeURIComponent("User id is required")}`);
  }

  try {
    const userSession = await auth();
    if (!userSession || userSession.expired) {
      await logAction({
        userId: "anonymous",
        action,
        success: false,
        error: "Authentication required.",
        metadata: { targetUserId: id },
      });
      redirect(`${redirectTo}?error=${encodeURIComponent("Authentication required.")}`);
    }

    if (!hasPermission(userSession.user.role, permission)) {
      await logAction({
        userId: userSession.user.id,
        action,
        success: false,
        error: "Not authorized.",
        role: userSession.user.role,
        metadata: { targetUserId: id },
      });
      redirect(`${redirectTo}?error=${encodeURIComponent("You are not authorized for this action.")}`);
    }

    const result = await deleteUser({ id });

    await logAction({
      userId: userSession.user.id,
      action,
      success: result.ok,
      role: userSession.user.role,
      error: result.ok ? undefined : result.error,
      metadata: { targetUserId: id },
    });

    if (!result.ok) {
      redirect(`${redirectTo}?error=${encodeURIComponent(result.error)}`);
    }

    redirect(redirectTo);
  } catch (error) {
    const message = getErrorMessage(error);
    await logAction({
      userId: "unknown",
      action,
      success: false,
      error: message,
      metadata: { targetUserId: id },
    });
    redirect(`${redirectTo}?error=${encodeURIComponent(message)}`);
  }
}
