"use client";

import { PlaySquare } from "lucide-react";
import { Button } from "~/components/ui/button";
import { type songs } from "~/server/db/schema";
import { useSongs } from "../stores/song";
import { TooltipTrigger } from "~/components/ui/tooltip";

export const PlaySong = ({ song }: { song: typeof songs.$inferSelect }) => {
  const setSong = useSongs((s) => s.setSong);
  return (
    <TooltipTrigger asChild>
      <Button onClick={() => setSong(song)} size="icon" variant="ghost">
        <PlaySquare size={18} />
      </Button>
    </TooltipTrigger>
  );
};
