"use client";

import { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "./styles.css";
import { type songs } from "~/server/db/schema";
import Image from "next/image";

export const Player = ({
  listOfSongs,
}: {
  listOfSongs: (typeof songs.$inferSelect)[];
}) => {
  const lastSong = listOfSongs[listOfSongs.length - 1];
  const firstSong = listOfSongs[0];
  const [song, setSong] = useState(listOfSongs[0]);

  if (!song || !lastSong || !firstSong) return <div>No songs.</div>;

  const handleNext = () => {
    if (song.id === lastSong.id) {
      return setSong(firstSong);
    }
    setSong(listOfSongs[listOfSongs.indexOf(song) + 1]);
  };

  const handlePrev = () => {
    if (song.id === firstSong.id) {
      return setSong(lastSong);
    }
    setSong(listOfSongs[listOfSongs.indexOf(song) - 1]);
  };
  return (
    <div className="flex w-full items-center justify-end">
      <div className="h-full w-full rounded-tl-2xl bg-white">
        <div className="flex items-end">
          <div
            style={{
              height: "150px",
              width: "300px",
              position: "relative",
            }}
          >
            <Image
              alt={song.name}
              objectFit="fill"
              fill
              priority
              src={song?.imageUrl ?? ""}
            />
          </div>
          <div className="w-full space-y-4 px-10 pb-4">
            <span className="pl-3 text-2xl font-light">{song.name}</span>
            <AudioPlayer
              src={song.s3Url}
              autoPlay={false}
              autoPlayAfterSrcChange={true}
              hasDefaultKeyBindings={false}
              onClickNext={handleNext}
              onClickPrevious={handlePrev}
              showSkipControls
              showJumpControls={false}
              showDownloadProgress={true}
              showFilledVolume={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
