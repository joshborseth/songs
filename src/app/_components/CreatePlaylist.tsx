"use client";
import { Plus } from "lucide-react";
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
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export const CreatePlaylist = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <div className="-ml-3 flex items-center gap-2">
            <Plus size={24} />
            <span>New Playlist</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
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
        <Input id="name" />
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Submit</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
