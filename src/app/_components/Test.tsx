"use client";
import { PauseIcon, PlayIcon, Volume2, Volume2Icon } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { Slider } from "~/components/ui/slider";
import { type songs } from "~/server/db/schema";
import { AudioProgressBar } from "./AudioProgressBar";

export const Test = ({ song }: { song: typeof songs.$inferSelect }) => {
  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const MAX = 100;
  const DEFAULT_VOLUME = 100;

  function toggleAudio(): void {
    if (play) {
      audioRef.current?.pause();
      setPlay(false);
    } else {
      void audioRef.current?.play();
      setPlay(true);
    }
  }

  const handleBufferProgress: React.ReactEventHandler<HTMLAudioElement> = (
    e,
  ) => {
    const audio = e.currentTarget;
    const dur = audio.duration;
    if (dur > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        if (
          audio.buffered.start(audio.buffered.length - 1 - i) <
          audio.currentTime
        ) {
          const bufferedLength = audio.buffered.end(
            audio.buffered.length - 1 - i,
          );
          setBuffered(bufferedLength);
          break;
        }
      }
    }
  };

  return (
    <div className="relative flex max-w-md flex-col items-center justify-center gap-4 py-10">
      <Slider />
      <p className="font-bold">{song.name}</p>
      <div className="flex w-full items-center gap-4">
        <Button onClick={toggleAudio}>
          {!play ? <PlayIcon size={25} /> : <PauseIcon size={25} />}
        </Button>
        <Slider
          onValueChange={(value) => {
            if (!audioRef.current) return;
            audioRef.current.volume = value[0]! / MAX;
          }}
          max={MAX}
          defaultValue={[DEFAULT_VOLUME]}
          step={1}
        />
        <Volume2 size={30} />
      </div>

      <audio
        onTimeUpdate={(e) => {
          setCurrentProgress(e.currentTarget.currentTime);
          handleBufferProgress(e);
        }}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
        onProgress={handleBufferProgress}
        ref={audioRef}
        src={song.s3Url}
      />
    </div>
  );
};
