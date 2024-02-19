import { createTRPCRouter } from "../../trpc";
import { list } from "./procedures";

export const playlistRouter = createTRPCRouter({
  list,
});
