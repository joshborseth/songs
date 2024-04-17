"use client";

import { ScrollArea } from "~/components/ui/scroll-area";
import { SongButton } from "./SongButton";
import { useSongs } from "~/app/stores/song";
import { Button } from "~/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";

export const Queue = () => {
  const { queue, clearQueue } = useSongs();

  return (
    <>
      <div className="h-1/3">
        <div className="flex w-full items-center justify-between">
          <h2 className="pl-3 text-lg font-bold">Queue</h2>

          <AlertDialog>
            <AlertDialogTrigger disabled={!queue?.length}>
              <Button
                disabled={!queue?.length}
                variant="outline"
                className="h-6 px-2 py-1 text-xs"
              >
                Clear Queue
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will clear the queue. The songs listed in the queue will
                  no longer be queued to play.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => clearQueue()}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <h3 className="pl-3 text-xs font-normal">
          {queue?.length ?? 0} song{queue?.length === 1 ? "" : "s"} queued.
        </h3>
        <ScrollArea className="h-full py-3">
          <ul>
            {queue?.length
              ? queue.map((song) => (
                  <div key={song.id}>
                    <SongButton key={song.id} song={song} />
                  </div>
                ))
              : null}
          </ul>
        </ScrollArea>
      </div>
    </>
  );
};
