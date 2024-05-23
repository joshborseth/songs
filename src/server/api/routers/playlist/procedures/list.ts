import { eq } from "drizzle-orm";
import { protectedProcedure } from "../../../trpc";
import { playlists } from "~/server/db/schema";

export const list = protectedProcedure.query(async ({ ctx }) => {
  return await ctx.db.query.playlists.findMany({
    with: {
      playlistSongs: true,
    },
    where: eq(playlists.userId, ctx.auth.userId),
  });
});
