"use client";

import { useGlobalAudioPlayer } from "react-use-audio-player";
import { Button } from "~/components/ui/button";
import { type songs } from "~/server/db/schema";
import { Paper } from "./Paper";
import { useState } from "react";

export const PlayerV2 = ({ song }: { song: typeof songs.$inferSelect }) => {
  const { load, play, duration, togglePlayPause, getPosition, volume } =
    useGlobalAudioPlayer();
  const [position, setPosition] = useState(0);
  return (
    <Paper>
      <Button
        onClick={() => {
          load(song.s3Url, {
            autoplay: true,
            html5: true,
            format: "mp3",
          });
          play();
        }}
      >
        Play
      </Button>
      <div>duration - {duration}</div>
      <Button onClick={() => setPosition(getPosition())}>{position}</Button>
      <Button onClick={togglePlayPause}>Toggle Play/Pause</Button>
      <div>{volume}</div>
    </Paper>
  );
};
