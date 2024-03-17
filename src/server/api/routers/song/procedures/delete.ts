import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import { songs } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const deleteSong = publicProcedure
  .input(
    z.object({
      songId: z.number(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.delete(songs).where(eq(songs.id, input.songId));
  });
