import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { GetListByKeyword } from "youtube-search-api";
export const exploreRouter = createTRPCRouter({
  searchByKeyword: protectedProcedure
    .input(z.object({ keyword: z.string() }))
    .mutation(async ({ input }) => {
      return await GetListByKeyword(input.keyword);
    }),
});
