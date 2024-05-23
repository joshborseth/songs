"use client";

import { PlusSquare } from "lucide-react";
import { Button } from "~/components/ui/button";
import { type songs } from "~/server/db/schema";
import { useAppState } from "../stores/app";
import { TooltipTrigger } from "~/components/ui/tooltip";

export const AddSongToQueue = ({
  song,
}: {
  song: typeof songs.$inferSelect;
}) => {
  const addSongToQueue = useAppState((s) => s.addSongToQueue);
  return (
    <TooltipTrigger asChild>
      <Button size="icon" onClick={() => addSongToQueue(song)} variant="ghost">
        <PlusSquare size={18} />
      </Button>
    </TooltipTrigger>
  );
};
