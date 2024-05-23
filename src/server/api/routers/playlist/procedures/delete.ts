import { z } from "zod";
import { protectedProcedure } from "../../../trpc";
import { playlists } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const deletePlaylist = protectedProcedure
  .input(z.object({ playlistId: z.number() }))
  .mutation(async ({ ctx, input }) => {
    const findPlaylist = await ctx.db.query.playlists.findFirst({
      where: and(
        eq(playlists.id, input.playlistId),
        eq(playlists.userId, ctx.auth.userId),
      ),
    });

    if (!findPlaylist) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Playlist not found",
      });
    }

    await ctx.db.delete(playlists).where(eq(playlists.id, findPlaylist.id));
  });
