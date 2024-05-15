import { createTRPCRouter } from "../../trpc";
import {
  list,
  create,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  addSongToPlaylistBulk,
  listSongsToAdd,
} from "./procedures";

export const playlistRouter = createTRPCRouter({
  list,
  create,
  deletePlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  addSongToPlaylistBulk,
  listSongsToAdd,
});
