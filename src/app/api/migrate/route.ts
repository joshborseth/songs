import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";
export async function POST() {
  const betterSqlite = new Database(":memory:");
  const db = drizzle(betterSqlite);
  migrate(db, { migrationsFolder: "./migrations" });
  betterSqlite.close();
}
