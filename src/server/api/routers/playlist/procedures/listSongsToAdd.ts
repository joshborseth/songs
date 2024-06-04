import { z } from "zod";
import { protectedProcedure } from "../../../trpc";
import { playlistSongs, songs } from "~/server/db/schema";
import { and, eq, notInArray } from "drizzle-orm";

export const listSongsToAdd = protectedProcedure
  .input(
    z.object({
      playlistId: z.number(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const { playlistId } = input;

    const playlistSongsQuery = await ctx.db.query.playlistSongs.findMany({
      where: eq(playlistSongs.playlistId, playlistId),
    });

    const songsAlreadyAddedIds = playlistSongsQuery.map((ps) => ps.songId);

    return await ctx.db.query.songs.findMany({
      where: songsAlreadyAddedIds.length
        ? and(
            notInArray(songs.id, songsAlreadyAddedIds),
            eq(songs.userId, ctx.auth.userId),
          )
        : eq(songs.userId, ctx.auth.userId),
    });
  });
