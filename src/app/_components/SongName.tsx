"use client";

import { AudioLines, Music } from "lucide-react";
import { type songs } from "~/server/db/schema";
import { useSongs } from "../stores/song";
import Image from "next/image";
import { cn } from "~/lib/utils";

export const SongName = ({
  song,
  truncateText,
}: {
  song: typeof songs.$inferSelect;
  truncateText?: boolean;
}) => {
  const songState = useSongs();
  return (
    <div className="flex w-full items-center justify-start gap-3">
      {songState.song?.id === song.id ? (
        <AudioLines size={18} className="animate-pulse" />
      ) : (
        <Music size={18} />
      )}
      {!truncateText && (
        <Image
          src={song.thumbnailUrl}
          width={40}
          height={40}
          alt={song.name}
          className="h-12 w-12 rounded-xl object-cover p-2"
        />
      )}

      <span className={cn(truncateText && "w-32 truncate")}>{song.name}</span>
    </div>
  );
};
