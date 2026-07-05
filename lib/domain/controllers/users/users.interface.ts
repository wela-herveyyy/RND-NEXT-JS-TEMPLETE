import { UserSelect } from "@/lib/entities/users.type";

export interface IUsersController {
  getUsers(): Promise<UserSelect[]>;
}
