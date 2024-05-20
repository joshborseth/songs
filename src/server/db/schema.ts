import { relations, sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const songs = sqliteTable("songs", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 256 }).notNull(),
  createdAt: text("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updatedAt").default(sql`CURRENT_TIMESTAMP`),
  thumbnailUrl: text("thumbnailUrl", { length: 256 }).notNull(),
  s3Url: text("s3Url", { length: 256 }).notNull(),
});

export const playlists = sqliteTable("playlists", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name", { length: 256 }).notNull(),
  createdAt: text("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updatedAt").default(sql`CURRENT_TIMESTAMP`),
});

export const playlistSongs = sqliteTable("playlistSongs", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  playlistId: integer("playlistId").notNull(),
  songId: integer("songId").notNull(),
  createdAt: text("createdAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updatedAt").default(sql`CURRENT_TIMESTAMP`),
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
