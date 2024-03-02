import { db } from "~/server/db";
import { PlayerV2 } from "./_components/PlayerV2";

export default async function Page() {
  const song = await db.query.songs.findFirst();
  if (!song) return <div>No songs found</div>;
  return <PlayerV2 song={song} />;
}
