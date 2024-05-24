"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { useAppState } from "../stores/app";
import { type songs } from "~/server/db/schema";

export const PlayPlaylist = ({
  songsFromPlaylist,
}: {
  songsFromPlaylist: (typeof songs.$inferSelect)[];
}) => {
  const [open, setOpen] = useState(false);
  const { bulkAddSongsToQueue, clearQueue, setSong } = useAppState();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-10">
          <div className="-ml-3 flex items-center gap-2">
            <Play size={20} />
            <span>Play Playlist</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            clearQueue();
            bulkAddSongsToQueue(songsFromPlaylist);
            setSong(songsFromPlaylist[0]!);
            setOpen(false);
          }}
          className="flex h-full flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>Play from Playlist</DialogTitle>
            <DialogDescription>
              This action will remove the songs currently in the queue and
              replace them with all of the songs from this playlist. Are you
              sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="submit">Continue</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
