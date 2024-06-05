"use client";

import { AudioLines, Music } from "lucide-react";
import { type songs } from "~/server/db/schema";
import { useAppState } from "../stores/app";
import Image from "next/image";
import { cn } from "~/lib/utils";

export const SongName = ({
  song,
  truncateText,
}: {
  song: typeof songs.$inferSelect;
  truncateText?: boolean;
}) => {
  const currentSong = useAppState((s) => s.song);
  const isPlaying = currentSong?.id === song.id;
  return (
    <div className="flex w-full items-center justify-start gap-3">
      {isPlaying ? (
        <AudioLines
          size={18}
          strokeWidth={3}
          className="h-4 w-4 animate-pulse lg:h-auto lg:w-auto"
        />
      ) : (
        <Music size={18} className="h-4 w-4 lg:h-auto lg:w-auto" />
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

      <span
        className={cn(
          isPlaying && "font-bold",
          truncateText && "w-24 truncate",
          "w-36 text-left text-xs lg:text-sm",
        )}
      >
        {song.name}
      </span>
    </div>
  );
};
