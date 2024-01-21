"use client";

import {
  PauseIcon,
  PlaySquareIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { type songs } from "~/server/db/schema";

export const AudioPlayer = ({ song }: { song: typeof songs.$inferSelect }) => {
  const audio = new Audio(song.s3Url);
  const [playing, setPlaying] = useState(false);

  audio.addEventListener("play", () => setPlaying(true));
  audio.addEventListener("pause", () => setPlaying(false));
  return (
    <div className="h-full w-full">
      <Button
        onClick={async () => {
          if (playing) return audio.pause();
          await audio.play();
        }}
        className="h-20 w-20 rounded-full"
      >
        {playing ? <PauseIcon size={40} /> : <PlaySquareIcon size={40} />}
      </Button>
    </div>
  );
};
