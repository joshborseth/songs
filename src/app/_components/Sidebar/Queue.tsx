"use client";

import { ScrollArea } from "~/components/ui/scroll-area";
import { SongButton } from "./SongButton";
import { useSongs } from "~/app/stores/song";
import { Button } from "~/components/ui/button";

export const Queue = () => {
  const { queue, clearQueue } = useSongs();

  return (
    <>
      <div className="h-1/3">
        <div className="flex w-full items-center justify-between">
          <h2 className="pl-3 text-lg font-bold">Queue</h2>
          <Button
            onClick={() => clearQueue()}
            variant="outline"
            className="h-6 px-2 py-1 text-xs"
          >
            Clear Queue
          </Button>
        </div>
        <h3 className="pl-3 text-xs font-normal">
          {queue?.length ?? 0} song{queue?.length === 1 ? "" : "s"} queued.
        </h3>
        <ScrollArea className="h-full py-3">
          <ul>
            {queue?.length
              ? queue.map((song) => (
                  <div key={song.id}>
                    <SongButton key={song.id} song={song} />
                  </div>
                ))
              : null}
          </ul>
        </ScrollArea>
      </div>
    </>
  );
};
