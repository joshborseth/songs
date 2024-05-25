import { api } from "~/trpc/server";
import { SongsTable } from "../_components/SongsTable/SongsTable";

export async function Songs() {
  const songs = await api.song.list.query();
  return <SongsTable data={songs} />;
}
