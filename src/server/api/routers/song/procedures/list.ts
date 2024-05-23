import { protectedProcedure } from "../../../trpc";
import { songs } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const list = protectedProcedure.query(async ({ ctx }) => {
  return await ctx.db.query.songs.findMany({
    where: eq(songs.userId, ctx.auth.userId),
  });
});
