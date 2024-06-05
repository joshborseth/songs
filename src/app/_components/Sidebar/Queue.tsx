"use client";

import { ScrollArea } from "~/components/ui/scroll-area";
import { SongButton } from "./SongButton";
import { useAppState } from "~/app/stores/app";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export const Queue = () => {
  const { queue, clearQueue } = useAppState();

  return (
    <>
      <div className="h-1/3">
        <div className="flex w-full items-center justify-between px-3">
          <h2 className="text-lg font-bold">Queue</h2>
          <Dialog>
            <DialogTrigger asChild disabled={!queue?.length}>
              <Button
                disabled={!queue?.length}
                variant="outline"
                className="h-6 px-2 py-1 text-xs"
              >
                Clear Queue
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  This will clear the queue. The songs listed in the queue will
                  no longer be queued to play.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button onClick={() => clearQueue()}>Clear Queue</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <h3 className="px-3 text-xs font-normal">
          {queue?.length ?? 0} song{queue?.length === 1 ? "" : "s"} queued.
        </h3>
        <ScrollArea className="h-full py-3">
          {queue?.length
            ? queue.map((song) => (
                <div key={song.id}>
                  <SongButton key={song.id} song={song} />
                </div>
              ))
            : null}
        </ScrollArea>
      </div>
    </>
  );
};
