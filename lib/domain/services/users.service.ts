import { getUsers as getUsersUseCase } from "../usecases/users/get_users.usecase";
import { getUsersByRole as getUsersByRoleUseCase } from "../usecases/users/get_users_by_role.usecase";
import { deleteUser as deleteUserUseCase } from "../usecases/users/delete_user.usecase";
import { USER_ROLE, UserRole, type DeleteUserInput, type UserResult, type UserSelect } from "@/lib/entities/users.type";

export async function getUsers(): Promise<UserSelect[]> {
  return getUsersUseCase();
}

export async function getDevUsers(): Promise<UserSelect[]> {
  return getUsersByRoleUseCase(USER_ROLE.DEV);
}

export async function deleteUser(input: DeleteUserInput): Promise<UserResult> {
  return deleteUserUseCase(input);
}

