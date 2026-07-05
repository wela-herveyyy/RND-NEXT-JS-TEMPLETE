import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";

export const database = drizzle({
  connection: { uri: process.env.DATABASE_URL },
});

