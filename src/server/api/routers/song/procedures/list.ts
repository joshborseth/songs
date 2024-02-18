import { publicProcedure } from "../../../trpc";

export const list = publicProcedure.query(async ({ ctx }) => {
  return await ctx.db.query.songs.findMany();
});
