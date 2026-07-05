import { database } from "@/database";
import { UserSelect } from "@/lib/entities/users.type";
import { users } from "@/database/schema";

export class GetUsersUseCase {
  private db = database;
  async execute(): Promise<UserSelect[]> {
    try {
      const result = await this.db.select().from(users);
      return result;
    } catch (error) {
      console.error(error);
      return [];
    }
  }
}
