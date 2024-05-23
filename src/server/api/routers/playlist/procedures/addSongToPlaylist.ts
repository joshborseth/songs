import { z } from "zod";
import { protectedProcedure } from "../../../trpc";
import { playlistSongs } from "~/server/db/schema";

export const addSongToPlaylist = protectedProcedure
  .input(z.object({ playlistId: z.number(), songId: z.number() }))
  .mutation(async ({ ctx, input }) => {
    // Add song to playlist
    await ctx.db.insert(playlistSongs).values({
      playlistId: input.playlistId,
      songId: input.songId,
    });
  });
