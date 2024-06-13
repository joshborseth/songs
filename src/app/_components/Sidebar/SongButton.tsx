"use client";

import { useAppState } from "~/app/stores/app";
import { Button } from "~/components/ui/button";
import { type songs } from "~/server/db/schema";
import { SongName } from "../SongName";
import { ListMinus } from "lucide-react";

export const SongButton = ({ song }: { song: typeof songs.$inferSelect }) => {
  const { setSong, removeSongFromQueue } = useAppState();
  return (
    <div className="flex min-w-0 max-w-full justify-between pr-2">
      <Button
        className="w-full min-w-0"
        onClick={() => setSong(song)}
        variant="ghost"
      >
        <SongName song={song} hideImage />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeSongFromQueue(song.id)}
        className="h-auto w-max p-3"
      >
        <ListMinus size={16} className="h-4 w-4 lg:h-auto lg:w-auto" />
      </Button>
    </div>
  );
};
