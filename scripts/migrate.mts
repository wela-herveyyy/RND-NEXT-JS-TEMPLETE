import "dotenv/config";
import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { migrate } from "drizzle-orm/mysql2/migrator";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const connection = await mysql.createConnection(url);
const db = drizzle(connection);

try {
  console.log("Running migrations against:", url);
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("Migrations applied successfully");
} catch (error) {
  console.error("Migration failed:");
  console.error(error);
  process.exit(1);
} finally {
  await connection.end();
}
