"use client";

import { PlaySquare } from "lucide-react";
import { Button } from "~/components/ui/button";
import { type songs } from "~/server/db/schema";
import { useSongs } from "../stores/song";

export const PlaySong = ({ song }: { song: typeof songs.$inferSelect }) => {
  const setSong = useSongs((s) => s.setSong);
  return (
    <Button onClick={() => setSong(song)} size="icon" variant="ghost">
      <PlaySquare size={18} />
    </Button>
  );
};
