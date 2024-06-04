import { api } from "~/trpc/server";
import { SongsTable } from "../_components/SongsTable/SongsTable";
import { SongActions } from "../_components/SongsTable/actions";

export async function Songs() {
  const songs = await api.song.list.query();
  return <SongsTable Actions={SongActions} data={songs} />;
}
