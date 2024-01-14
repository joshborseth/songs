import { publicProcedure } from "../../../trpc";
import { songs } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { randomUUID } from "crypto";

export const update = publicProcedure.mutation(async ({ ctx }) => {
  await ctx.db
    .update(songs)
    .set({
      s3Url: `not implemented yet ${randomUUID()}`,
    })
    .where(eq(songs.id, 1));
});
