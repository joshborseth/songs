"use client";

import { ScrollArea } from "~/components/ui/scroll-area";
import { SongButton } from "./SongButton";
import { useSongs } from "~/app/stores/song";

export const Queue = () => {
  const { queue } = useSongs();
  if (!queue?.length) return null;
  return (
    <>
      <div className="h-1/3">
        <h2 className="pl-3 text-lg font-bold">Queue</h2>
        <ScrollArea className="h-full py-3">
          <ul>
            {queue.map((song) => (
              <div key={song.id}>
                <SongButton key={song.id} song={song} />
              </div>
            ))}
          </ul>
        </ScrollArea>
      </div>
      <div className="h-20" />
    </>
  );
};
