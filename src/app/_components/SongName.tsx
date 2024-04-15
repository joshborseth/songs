"use client";

import { AudioLines, Music } from "lucide-react";
import { type songs } from "~/server/db/schema";
import { useSongs } from "../stores/song";

export const SongName = ({
  song,
  truncateText,
}: {
  song: typeof songs.$inferSelect;
  truncateText?: boolean;
}) => {
  const songState = useSongs();
  return (
    <div className="flex w-full justify-start gap-3">
      {songState.song?.id === song.id ? (
        <AudioLines size={18} className="animate-pulse" />
      ) : (
        <Music size={18} />
      )}
      {truncateText && song.name.length > 20
        ? `${song.name.slice(0, 18)}...`
        : song.name}
    </div>
  );
};
