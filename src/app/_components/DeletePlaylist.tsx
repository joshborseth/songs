"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { useToast } from "~/components/ui/use-toast";

import { api } from "~/trpc/react";

export const DeletePlaylist = ({ playlistId }: { playlistId: number }) => {
  const { toast } = useToast();
  const router = useRouter();
  const { mutate, isLoading } = api.playlist.deletePlaylist.useMutation({
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,
      });
    },
    onSuccess: () => {
      setOpen(false);
      router.refresh();
    },
  });

  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} size="icon" variant="ghost">
          <Trash2 size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate({ playlistId });
          }}
          className="flex h-full flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>Delete Playlist</DialogTitle>
            <DialogDescription>
              This action is irreversible. Are you sure you want to delete this
              playlist?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" type="submit">
              {isLoading ? "Loading..." : "Delete"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
