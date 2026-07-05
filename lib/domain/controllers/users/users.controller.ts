
import { UserSelect } from "@/lib/entities/users.type";
import { IUsersController } from "./users.interface";
import { UsersService } from "@/lib/domain/services/users.service";

export class UsersController implements IUsersController {
  constructor(private readonly usersService: UsersService) { }

  async getUsers(): Promise<UserSelect[]> {
    try {
      const result = await this.usersService.getUsers();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
