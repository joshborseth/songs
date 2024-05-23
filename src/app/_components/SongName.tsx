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
        <AudioLines size={18} strokeWidth={3} className="animate-pulse" />
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

      <span
        className={cn(
          truncateText ? "w-32 truncate text-left" : "max-w-[15rem]",
          isPlaying && "font-bold",
        )}
      >
        {song.name}
      </span>
    </div>
  );
};
