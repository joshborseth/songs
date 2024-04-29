"use client";

import { PlusSquare } from "lucide-react";
import { Button } from "~/components/ui/button";
import { type songs } from "~/server/db/schema";
import { useSongs } from "../stores/song";

export const AddSongToQueue = ({
  song,
}: {
  song: typeof songs.$inferSelect;
}) => {
  const addSongToQueue = useSongs((s) => s.addSongToQueue);
  return (
    <Button size="icon" onClick={() => addSongToQueue(song)} variant="ghost">
      <PlusSquare size={18} />
    </Button>
  );
};
