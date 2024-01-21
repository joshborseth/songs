"use client";
import { type songs } from "~/server/db/schema";

export const AudioPlayers = ({
  listOfSongs,
}: {
  listOfSongs: (typeof songs.$inferSelect)[];
}) => {
  return (
    <div>
      {listOfSongs.map((song) => (
        <button
          key={song.id}
          className="bg-blue-500 px-4 py-2 text-white"
          onClick={async () => {
            const songToPlay = new Audio(song.s3Url);
            await songToPlay.play();
          }}
        >
          Play {song.name}
        </button>
      ))}
    </div>
  );
};
