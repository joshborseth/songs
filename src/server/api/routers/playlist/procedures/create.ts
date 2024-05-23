import { z } from "zod";
import { protectedProcedure } from "../../../trpc";
import { playlists } from "~/server/db/schema";

export const create = protectedProcedure
  .input(z.object({ name: z.string() }))
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.insert(playlists).values({
      name: input.name,
      userId: ctx.auth.userId,
    });
  });
