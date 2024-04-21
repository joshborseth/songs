import { z } from "zod";
import { publicProcedure } from "../../../trpc";
import { songs } from "~/server/db/schema";
import { withCursorPagination } from "drizzle-pagination";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const list = publicProcedure
  .input(
    z.object({
      limit: z.number(),
      cursor: z.number().nullish(),
    }),
  )
  .query(async ({ ctx, input }) => {
    if (!ctx.auth.userId)
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to perform this action",
      });
    const { limit, cursor } = input;

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
        where: eq(songs.userId, ctx.auth.userId),
      }),
    );

    return {
      // return the data
      data,
      // return the next cursor
      nextCursor: data.length ? data[data.length - 1]?.id : null,
    };
  });
