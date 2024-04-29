"use client";
import { Plus } from "lucide-react";
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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/trpc/react";

export const CreatePlaylist = () => {
  const [name, setName] = useState("");
  const createPlaylist = api.playlist.create.useMutation();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <div className="-ml-3 flex items-center gap-2">
            <Plus size={24} />
            <span>New Playlist</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createPlaylist.mutate(
              { name },
              {
                onSuccess: () => {
                  setName("");
                  setOpen(false);
                  router.refresh();
                },
              },
            );
          }}
          className="flex h-full flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>Create a Playlist</DialogTitle>
            <DialogDescription>
              Create a new playlist to organize your music. Enter your new
              playlist name below to get started.
            </DialogDescription>
          </DialogHeader>
          <Label className="sr-only" htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
            placeholder="Playlist Name"
          />
          <DialogFooter className="sm:justify-start">
            <Button type="submit">
              {createPlaylist.isLoading ? "Loading..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
