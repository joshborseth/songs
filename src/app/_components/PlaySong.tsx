"use client";

import { PlaySquare } from "lucide-react";
import { Button } from "~/components/ui/button";
import { type songs } from "~/server/db/schema";
import { useAppState } from "../stores/app";
import { TooltipTrigger } from "~/components/ui/tooltip";

export const PlaySong = ({ song }: { song: typeof songs.$inferSelect }) => {
  const setSong = useAppState((s) => s.setSong);
  return (
    <TooltipTrigger asChild>
      <Button onClick={() => setSong(song)} size="icon" variant="ghost">
        <PlaySquare size={18} className="h-4 w-4 lg:h-auto lg:w-auto" />
      </Button>
    </TooltipTrigger>
  );
};
