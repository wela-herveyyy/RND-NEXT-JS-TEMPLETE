import {
  getTeacherUsers as getTeacherUsersService,
  getUsers as getUsersService,
} from "@/lib/domain/services/users.service";
import type { UserSelect } from "@/lib/entities/users.type";

export async function getUsers(): Promise<UserSelect[]> {
  try {
    return await getUsersService();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getTeacherUsers(): Promise<UserSelect[]> {
  try {
    return await getTeacherUsersService();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
