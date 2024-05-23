import { z } from "zod";
import { protectedProcedure } from "../../../trpc";
import { playlistSongs, songs } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const deleteSong = protectedProcedure
  .input(
    z.object({
      songId: z.number(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    const findSong = await ctx.db.query.songs.findFirst({
      where: and(eq(songs.id, input.songId), eq(songs.userId, ctx.auth.userId)),
    });

    if (!findSong) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Song not found",
      });
    }

    await ctx.db.delete(songs).where(eq(songs.id, findSong.id));
    await ctx.db
      .delete(playlistSongs)
      .where(eq(playlistSongs.songId, findSong.id));
  });
