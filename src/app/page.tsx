import { db } from "~/server/db";
import { Upload } from "./_components/Upload";
import { Test } from "./_components/Test";

export default async function Home() {
  const songs = await db.query.songs.findMany();

  return (
    <div className="flex flex-col gap-2 p-20">
      <Upload />
      {songs.map((s) => {
        return <Test song={s} />;
      })}
    </div>
  );
}
