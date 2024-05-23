import { TRPCError } from "@trpc/server";
import { protectedProcedure } from "../../../trpc";

export const update = protectedProcedure.mutation(async () => {
  throw new TRPCError({
    code: "NOT_IMPLEMENTED",
    message: "Not implemented",
  });
});
