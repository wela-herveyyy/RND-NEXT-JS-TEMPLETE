import { GetUsersUseCase } from "../usecases/users/get_users.usecase";

export class UsersService {
  constructor(private readonly getUsersUseCase: GetUsersUseCase) {}

  async getUsers() {
    return await this.getUsersUseCase.execute();
  }
}
