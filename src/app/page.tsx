import { db } from "~/server/db";
import { Upload } from "./_components/Upload";
import { Player } from "./_components/Player";

export default async function Home() {
  const songs = await db.query.songs.findMany();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-between gap-2 p-10">
      <div className="flex flex-col items-center justify-center gap-6">
        <h1 className="text-customGray text-center text-3xl font-bold">
          Josh's Bad Music Service
        </h1>
        <Upload />
      </div>

      <Player listOfSongs={songs} />
    </div>
  );
}
