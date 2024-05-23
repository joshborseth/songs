import { z } from "zod";
import { protectedProcedure } from "../../../trpc";
import { playlistSongs } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";

export const removeSongFromPlaylist = protectedProcedure
  .input(z.object({ playlistId: z.number(), songId: z.number() }))
  .mutation(async ({ ctx, input }) => {
    await ctx.db
      .delete(playlistSongs)
      .where(
        and(
          eq(playlistSongs.playlistId, input.playlistId),
          eq(playlistSongs.songId, input.songId),
        ),
      );
  });
