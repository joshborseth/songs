"use client";

import { useAppState } from "~/app/stores/app";
import { PlayerV2 } from "../PlayerV2";

export const AudioManager = () => {
  const { song, queue } = useAppState();
  if (!song) return null;
  if (!queue?.length) return null;

  return <PlayerV2 />;
};
