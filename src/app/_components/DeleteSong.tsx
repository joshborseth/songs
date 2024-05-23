"use client";

import { Trash2 } from "lucide-react";
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
import { api } from "~/trpc/react";
import { useAppState } from "../stores/app";
import { TooltipTrigger } from "~/components/ui/tooltip";
import { useRouter } from "next/navigation";

export const DeleteSong = ({ songId }: { songId: number }) => {
  const utils = api.useUtils();
  const { removeSongFromQueue, setColor } = useAppState();
  const router = useRouter();
  const { mutate } = api.song.deleteSong.useMutation({
    async onMutate(deletedSong) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.song.list.cancel();

      // Get the data from the queryCache
      const prevData = utils.song.list.getData();

      utils.song.list.setData(undefined, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old?.filter((song) => song.id !== deletedSong.songId),
        };
      });
      removeSongFromQueue(deletedSong.songId);
      setColor(null);
      setOpen(false);
      // Return the previous data so we can revert if something goes wrong
      return { prevData };
    },
    onError(_err, _newPost, ctx) {
      if (!ctx) return;
      // If the mutation fails, use the context-value from onMutate
      utils.song.list.setData(undefined, ctx.prevData);
    },
    onSettled() {
      // Sync with server once mutation has settled
      void utils.song.list.invalidate();
      router.refresh();
    },
  });

  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <TooltipTrigger asChild>
          <Button onClick={() => setOpen(true)} size="icon" variant="ghost">
            <Trash2 size={18} />
          </Button>
        </TooltipTrigger>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate({ songId });
          }}
          className="flex h-full flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>Delete Song</DialogTitle>
            <DialogDescription>
              This action is irreversible. Are you sure you want to delete this
              song?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" type="submit">
              Delete
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
