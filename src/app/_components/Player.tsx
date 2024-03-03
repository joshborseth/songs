"use client";

import AudioPlayer from "react-h5-audio-player";
import "./styles.css";

import { type RouterOutputs } from "~/trpc/shared";
import { useCurrentSong } from "../stores/song";
import Image from "next/image";

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
      <div className="flex w-full flex-col items-center bg-white pt-4 xl:flex-row xl:py-0">
        {song.imageUrl && (
          <Image
            alt={song.name}
            src={song.imageUrl}
            className="hidden xl:block"
            width={300}
            height={200}
          />
        )}
        <div className="flex w-full max-w-4xl flex-col gap-2 space-y-2 xl:px-4">
          <span className="mx-auto w-[90%] pl-0 text-center text-lg font-bold xl:mx-0 xl:w-auto xl:px-0 xl:pl-3 xl:text-left xl:text-xl">
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
