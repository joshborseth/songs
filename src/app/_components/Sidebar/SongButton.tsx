"use client";

import { useSongs } from "~/app/stores/song";
import { Button } from "~/components/ui/button";
import { type songs } from "~/server/db/schema";
import { SongName } from "../SongName";

export const SongButton = ({ song }: { song: typeof songs.$inferSelect }) => {
  const songState = useSongs();

  return (
    <Button
      onClick={() => songState.setSong(song)}
      variant="ghost"
      className="flex w-full justify-start gap-3"
    >
      <SongName song={song} />
    </Button>
  );
};
