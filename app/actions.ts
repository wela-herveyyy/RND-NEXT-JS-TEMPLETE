"use server";

import { UsersController } from "@/lib/domain/controllers/users/users.controller";
import { GetUsersUseCase } from "@/lib/domain/usecases/users/get_users.usecase";
import { UsersService } from "@/lib/domain/services/users.service";

export async function createUsersController(): Promise<UsersController> {

  return new UsersController(new UsersService(
    new GetUsersUseCase())

  );
}
