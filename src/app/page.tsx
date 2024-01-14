import { db } from "~/server/db";
import { AudioPlayers } from "./_components/AudioPlayers";
import { Upload } from "./_components/Upload";

export default async function Home() {
  const songs = await db.query.songs.findMany();

  return (
    <div className="flex flex-col gap-2 p-20">
      <Upload />
      <AudioPlayers listOfSongs={songs} />
    </div>
  );
}
