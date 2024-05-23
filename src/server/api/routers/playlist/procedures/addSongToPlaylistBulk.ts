import { z } from "zod";
import { protectedProcedure } from "../../../trpc";
import { playlistSongs } from "~/server/db/schema";

export const addSongToPlaylistBulk = protectedProcedure
  .input(z.object({ playlistId: z.number(), songIds: z.array(z.number()) }))
  .mutation(async ({ ctx, input }) => {
    await ctx.db.insert(playlistSongs).values(
      input.songIds.map(
        (songId) =>
          ({
            playlistId: input.playlistId,
            songId,
          }) satisfies typeof playlistSongs.$inferInsert,
      ),
    );
  });
