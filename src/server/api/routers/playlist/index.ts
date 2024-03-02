import { createTRPCRouter } from "../../trpc";
import { list, create } from "./procedures";

export const playlistRouter = createTRPCRouter({
  list,
  create,
});
