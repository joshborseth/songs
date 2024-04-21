import { createTRPCRouter } from "../../trpc";
import { list, create, deletePlaylist } from "./procedures";

export const playlistRouter = createTRPCRouter({
  list,
  create,
  deletePlaylist,
});
