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
    <div className="w-full max-w-xl">
      <AudioPlayer
        src={song.s3Url}
        autoPlay={false}
        autoPlayAfterSrcChange={false}
        hasDefaultKeyBindings={false}
        onClickNext={handleNext}
        onClickPrevious={handlePrev}
        showSkipControls
        showJumpControls={false}
        showDownloadProgress={true}
        header={
          <div className="text-customGray flex w-full justify-center text-center">
            <span className="text-xl">{song.name}</span>
          </div>
        }
      />
      <audio controls src={song.s3Url} />
      static
      <audio controls src="song.webm" />
    </div>
  );
};
