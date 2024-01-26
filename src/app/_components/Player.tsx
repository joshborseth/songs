"use client";

import { useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { type songs } from "~/server/db/schema";

export const Player = ({
  listOfSongs,
}: {
  listOfSongs: (typeof songs.$inferSelect)[];
}) => {
  const lastSong = listOfSongs[listOfSongs.length - 1];
  const firstSong = listOfSongs[0];
  const [song, setSong] = useState(listOfSongs[0]);

  if (!song || !lastSong || !firstSong) return <div>Something went wrong.</div>;

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
    <div className="w-full max-w-xl">
      <AudioPlayer
        src={song.s3Url}
        autoPlay={false}
        preload="auto"
        autoPlayAfterSrcChange={false}
        hasDefaultKeyBindings={false}
        onClickNext={handleNext}
        onClickPrevious={handlePrev}
        showSkipControls
        showJumpControls={false}
        header={
          <div className="text-customGray flex w-full justify-center">
            <span className="text-xl">{song.name}</span>
          </div>
        }
      />
    </div>
  );
};
