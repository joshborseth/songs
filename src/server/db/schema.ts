import { relations, sql } from "drizzle-orm";
import { int, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const songs = mysqlTable("songs", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
  s3Url: varchar("s3Url", { length: 256 }).notNull(),
  imageUrl: varchar("imageUrl", { length: 256 }),
});

export const playlists = mysqlTable("playlists", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const playlistSongs = mysqlTable("playlistSongs", {
  id: int("id").primaryKey().autoincrement(),
  playlistId: int("playlistId").notNull(),
  songId: int("songId").notNull(),
  createdAt: timestamp("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt").onUpdateNow(),
});

export const playlistRelations = relations(playlists, ({ many }) => ({
  playlistSongs: many(playlistSongs),
}));

export const songRelations = relations(songs, ({ many }) => ({
  playlistSongs: many(playlistSongs),
}));

export const playlistSongRelations = relations(playlistSongs, ({ one }) => ({
  song: one(songs, {
    fields: [playlistSongs.songId],
    references: [songs.id],
  }),
  playlist: one(playlists, {
    fields: [playlistSongs.playlistId],
    references: [playlists.id],
  }),
}));
