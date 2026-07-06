import { getUsers as getUsersUseCase } from "../usecases/users/get_users.usecase";
import { getUsersByRole } from "../usecases/users/get_users_by_role.usecase";
import { deleteUser as deleteUserUseCase } from "../usecases/users/delete_user.usecase";
import { USER_ROLE, type DeleteUserInput, type UserResult, type UserSelect } from "@/lib/entities/users.type";

export async function getUsers(): Promise<UserSelect[]> {
  return getUsersUseCase();
}

export async function getTeacherUsers(): Promise<UserSelect[]> {
  return getUsersByRole(USER_ROLE.TEACHER);
}

export async function deleteUser(input: DeleteUserInput): Promise<UserResult> {
  return deleteUserUseCase(input);
}
