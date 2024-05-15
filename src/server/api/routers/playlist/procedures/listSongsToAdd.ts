import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import { playlistSongs, songs } from "~/server/db/schema";
import { withCursorPagination } from "drizzle-pagination";
import { eq, notInArray } from "drizzle-orm";

export const listSongsToAdd = publicProcedure
  .input(
    z.object({
      limit: z.number(),
      cursor: z.number().nullish(),
      playlistId: z.number(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const { limit, cursor, playlistId } = input;

    const playlistSongsQuery = await ctx.db.query.playlistSongs.findMany({
      where: eq(playlistSongs.playlistId, playlistId),
    });

    const songsAlreadyAddedIds = playlistSongsQuery.map((ps) => ps.songId);

    const data = await ctx.db.query.songs.findMany(
      withCursorPagination({
        limit,
        cursors: [
          [
            // by which column to sort the posts
            songs.id,
            // in which order we should sort, "asc" or "desc"
            "asc",
            // the cursor from where to start fetching the posts
            cursor ?? undefined,
          ],
        ],
        where: songsAlreadyAddedIds.length
          ? notInArray(songs.id, songsAlreadyAddedIds)
          : undefined,
      }),
    );

    return {
      // return the data
      data,
      // return the next cursor
      nextCursor: data.length ? data[data.length - 1]?.id : null,
    };
  });
