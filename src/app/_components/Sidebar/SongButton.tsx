"use client";

import { AudioLines, Music } from "lucide-react";
import { useCurrentSong } from "~/app/stores/song";
import { Button } from "~/components/ui/button";
import { type songs } from "~/server/db/schema";

export const SongButton = ({ song }: { song: typeof songs.$inferSelect }) => {
  const songState = useCurrentSong();

  return (
    <Button
      onClick={() => songState.setSong(song)}
      variant="ghost"
      className="flex w-full justify-start gap-3"
    >
      {songState.song?.id === song.id ? (
        <AudioLines size={18} className="animate-pulse" />
      ) : (
        <Music size={18} />
      )}

      {song.name.length > 20 ? `${song.name.slice(0, 18)}...` : song.name}
    </Button>
  );
};
