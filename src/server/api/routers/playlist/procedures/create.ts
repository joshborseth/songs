import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import { playlists } from "~/server/db/schema";

export const create = publicProcedure
  .input(z.object({ name: z.string() }))
  .mutation(async ({ ctx, input }) => {
    return await ctx.db.insert(playlists).values({
      name: input.name,
    });
  });
