import { db } from "~/server/db";
import { Player } from "./_components/Player";
import { Upload } from "./_components/Upload";

export default async function Home() {
  const songs = await db.query.songs.findMany();

  return (
    <div className="flex h-full w-full flex-col items-start justify-end">
      {/* <div className="max-w-md p-10">
        <Upload />
      </div> */}

      <Player listOfSongs={songs} />
    </div>
  );
}
