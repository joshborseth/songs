"use client";

import { useSongs } from "~/app/stores/song";
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
  const songState = useSongs();
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Button
          onClick={() => songState.setSong(song)}
          variant="ghost"
          className="flex w-full justify-start gap-3"
        >
          <SongName song={song} truncateText />
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          onClick={() => songState.removeSongFromQueue(song.id)}
          className="flex gap-2"
        >
          <Trash2 size={16} /> <span>Remove from Queue</span>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
