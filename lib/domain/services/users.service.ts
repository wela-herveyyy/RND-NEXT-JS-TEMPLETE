import { getUsers as getUsersUseCase } from "../usecases/users/get_users.usecase";
import { getUsersByRole } from "../usecases/users/get_users_by_role.usecase";
import { USER_ROLE, type UserSelect } from "@/lib/entities/users.type";

export async function getUsers(): Promise<UserSelect[]> {
  return getUsersUseCase();
}

export async function getTeacherUsers(): Promise<UserSelect[]> {
  return getUsersByRole(USER_ROLE.TEACHER);
}
