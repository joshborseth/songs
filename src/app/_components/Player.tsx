"use client";

import AudioPlayer from "react-h5-audio-player";
import "./styles.css";

import { useSongs } from "../stores/song";

export const Player = () => {
  const { song, setSong, queue } = useSongs();

  if (!song || !queue) return null;

  const firstSong = queue[0];
  const lastSong = queue[queue.length - 1];

  if (!firstSong || !lastSong) return null;

  const handleNext = () => {
    if (song.id === lastSong.id) {
      return setSong(firstSong);
    }

    setSong(queue[queue.indexOf(song) + 1]!);
  };

  const handlePrev = () => {
    if (song.id === firstSong.id) {
      return setSong(lastSong);
    }
    setSong(queue[queue.indexOf(song) - 1]!);
  };

  return (
    <div className="flex w-full justify-end">
      <div className="flex w-full flex-col items-center bg-white py-4">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-2 space-y-2">
          <span className="mx-auto w-[90%] text-center text-lg font-bold">
            {song.name}
          </span>
          <AudioPlayer
            src={song.s3Url}
            autoPlay={true}
            autoPlayAfterSrcChange={true}
            hasDefaultKeyBindings={true}
            onClickNext={handleNext}
            onClickPrevious={handlePrev}
            showSkipControls={true}
            showJumpControls={false}
            onEnded={handleNext}
            showDownloadProgress={true}
            showFilledVolume={true}
            showFilledProgress={true}
          />
        </div>
      </div>
    </div>
  );
};
