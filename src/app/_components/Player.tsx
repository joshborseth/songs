"use client";

import AudioPlayer from "react-h5-audio-player";
import "./styles.css";

import Image from "next/image";
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
      <div className="flex w-full flex-col items-end bg-white py-4 md:flex-row">
        {/* <div className="relative h-[125px] w-[250px]">
          <Image
            alt={song.name}
            className="object-fill"
            fill
            priority
            src={song?.imageUrl ?? ""}
          />
        </div> */}
        <div className="flex w-full max-w-4xl flex-col gap-2 space-y-2 pb-4 md:px-10">
          <span className="px-6 pl-0 text-center text-xl font-bold md:px-0 md:pl-3 md:text-left">
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
