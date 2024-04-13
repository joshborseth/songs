"use client";

import AudioPlayer from "react-h5-audio-player";
import "./styles.css";

import { type RouterOutputs } from "~/trpc/shared";
import { useCurrentSong } from "../stores/song";

export const Player = ({
  listOfSongs,
}: {
  listOfSongs: RouterOutputs["song"]["list"];
}) => {
  const lastSong = listOfSongs[listOfSongs.length - 1];
  const firstSong = listOfSongs[0];
  const { song, setSong } = useCurrentSong();

  if (!song || !lastSong || !firstSong) return null;

  const handleNext = () => {
    if (song.id === lastSong.id) {
      return setSong(firstSong);
    }
    setSong(listOfSongs[listOfSongs.indexOf(song) + 1]!);
  };

  const handlePrev = () => {
    if (song.id === firstSong.id) {
      return setSong(lastSong);
    }
    setSong(listOfSongs[listOfSongs.indexOf(song) - 1]!);
  };

  return (
    <div className="flex w-full justify-end">
      <div className="flex h-40 w-full flex-col items-center bg-white py-4">
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
