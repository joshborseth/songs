"use client";

import { useAppState } from "~/app/stores/app";
import { Button } from "~/components/ui/button";
import { type songs } from "~/server/db/schema";
import { SongName } from "../SongName";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";
import { Trash2 } from "lucide-react";

export const SongButton = ({ song }: { song: typeof songs.$inferSelect }) => {
  const { setSong, removeSongFromQueue } = useAppState();
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Button onClick={() => setSong(song)} variant="ghost">
          <SongName song={song} hideImage />
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => removeSongFromQueue(song.id)}
          className="flex gap-2"
        >
          <Trash2 size={16} /> <span>Remove from Queue</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
