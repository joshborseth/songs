import { db } from "~/server/db";
import { Player } from "./_components/Player";
import { Upload } from "./_components/Upload";

export default async function Home() {
  const songs = await db.query.songs.findMany();

  return (
    <div className="flex h-full w-full items-end">
      <Player listOfSongs={songs} />
    </div>
  );
}
