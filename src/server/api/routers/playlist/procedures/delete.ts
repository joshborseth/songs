import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import { playlists } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const deletePlaylist = publicProcedure
  .input(z.object({ playlistId: z.number() }))
  .mutation(async ({ ctx, input }) => {
    await ctx.db.delete(playlists).where(eq(playlists.id, input.playlistId));
  });
