import { sql } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const songs = mysqlTable("songs", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
  s3Url: varchar("s3_url", { length: 256 }).notNull(),
});
