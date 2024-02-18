"use client";

import { Music2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { type RouterOutputs } from "~/trpc/shared";

export const Songs = ({
  songList,
}: {
  songList: RouterOutputs["song"]["list"];
}) => {
  return (
    <div className="py-4">
      <h2 className="pl-3 text-lg font-bold">Songs</h2>
      <ScrollArea className="py-2">
        <ul>
          {songList.map((song) => (
            <li key={song.id}>
              <Button
                variant="ghost"
                className="flex w-full justify-start gap-3 truncate"
              >
                <Music2 size={18} />
                {song.name}
              </Button>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};
