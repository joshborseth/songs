"use client";

import AudioPlayer from "react-h5-audio-player";
import "./styles.css";

import { useAppState } from "../stores/app";
import Image from "next/image";
import { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import type H5AudioPlayer from "react-h5-audio-player";

export const Player = () => {
  const { song, setSong, queue, volume, setVolume } = useAppState();
  const router = useRouter();
  const pathname = usePathname();
  const audioPlayerRef = useRef<H5AudioPlayer>(null);

  const prevVolume = useRef<number | null>(null);

  if (!song || !queue) return null;

  const firstSong = queue[0];
  const lastSong = queue[queue.length - 1];

  if (!firstSong || !lastSong) return null;

  const handleNext = () => {
    if (song.id === lastSong.id) {
      setSong(firstSong);
      router.refresh();
      return;
    }
    setSong(queue[queue.indexOf(song) + 1]!);
    router.refresh();
  };

  const handlePrev = () => {
    if (song.id === firstSong.id) {
      setSong(lastSong);
      router.refresh();
      return;
    }
    setSong(queue[queue.indexOf(song) - 1]!);
    router.refresh();
  };

  const round = (num: number) => Math.round(num * 10) / 10;

  if ("mediaSession" in navigator) {
    navigator.mediaSession.setActionHandler("nexttrack", handleNext);
    navigator.mediaSession.setActionHandler("previoustrack", handlePrev);
  }

  return (
    <div className="flex w-full justify-end">
      <div className="flex w-full flex-col items-center bg-white py-4">
        <div className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-2 space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Image
              src={song.thumbnailUrl}
              width={40}
              priority
              height={40}
              alt={song.name}
              className="h-16 w-16 rounded-xl object-cover p-2 lg:h-20 lg:w-20"
            />
            <span className="mx-auto max-w-[12rem] truncate text-left text-base font-bold lg:max-w-none lg:text-center lg:text-lg">
              {/* maybe add some sort of auto scroll title here animation style, check aceternity to see if they have something */}
              {song.name}
            </span>
          </div>
          <AudioPlayer
            autoPlay={false}
            src={song.s3Url}
            autoPlayAfterSrcChange={true}
            onVolumeChange={() => {
              const changedVolume = round(
                // eslint-disable-next-line
                audioPlayerRef?.current?.audio?.current?.volume ?? 0.5,
              );
              if (prevVolume.current === changedVolume) return;
              prevVolume.current = changedVolume;
              setVolume(changedVolume);
            }}
            volume={volume}
            onPlay={() => router.replace(`${pathname}?currentSong=${song.id}`)}
            onClickNext={handleNext}
            onClickPrevious={handlePrev}
            showSkipControls={true}
            showJumpControls={false}
            onEnded={handleNext}
            ref={audioPlayerRef}
            showDownloadProgress={true}
            showFilledVolume={true}
            showFilledProgress={true}
          />
        </div>
      </div>
    </div>
  );
};
