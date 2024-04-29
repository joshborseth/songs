import { createTRPCRouter } from "../../trpc";
import {
  list,
  create,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
} from "./procedures";

export const playlistRouter = createTRPCRouter({
  list,
  create,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
});
