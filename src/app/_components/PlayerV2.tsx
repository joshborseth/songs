"use client";

import { useAppState } from "../stores/app";
import { useGlobalAudioPlayer } from "react-use-audio-player";
import { Button } from "~/components/ui/button";

export const PlayerV2 = () => {
  const { load, duration } = useGlobalAudioPlayer();
  const { song, queue } = useAppState();

  if (!song) return null;
  if (!queue?.length) return null;

  const firstSong = queue[0];
  const lastSong = queue[queue.length - 1];

  if (!firstSong || !lastSong) return null;

  return (
    <div>
      <Button
        onClick={() => {
          queue.length && queue.map((s) => load(s.s3Url));
        }}
      >
        load
      </Button>
    </div>
  );
};
