"use client";

import { Check, Plus } from "lucide-react";
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
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import { api } from "~/trpc/react";
import { Loading } from "./Loading";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const AddSongsToPlaylist = ({ playlistId }: { playlistId: number }) => {
  const [open, setOpen] = useState(false);
  const utils = api.useUtils();
  const { data, isLoading } = api.playlist.listSongsToAdd.useQuery({
    playlistId,
  });

  const { toast } = useToast();

  const [selectedSongs, setSelectedSongs] = useState<number[]>([]);
  const router = useRouter();
  const addSongs = api.playlist.addSongToPlaylistBulk.useMutation({
    onError: (err) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: err.message,
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Your selected songs have been added to the playlist",
      });
      setSelectedSongs([]);
      setOpen(false);
      router.refresh();
      void utils.playlist.listSongsToAdd.invalidate();
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-10">
          <div className="-ml-3 flex items-center gap-2">
            <Plus size={24} />
            <span>Add Songs</span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Songs To Your Playlist</DialogTitle>
          <DialogDescription>
            Add songs to playlists to organize your music. Select a song below
            to add it to your playlist.
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-2" />
        <ScrollArea>
          <div className="flex h-52 w-full flex-col gap-3">
            {isLoading && <Loading />}
            {data &&
              Boolean(data?.length) &&
              data.map((s) => {
                return (
                  <div
                    className="flex items-center justify-between gap-2"
                    key={s.id}
                  >
                    <span className="text-sm font-medium">{s.name}</span>
                    {selectedSongs.includes(s.id) ? (
                      <Button
                        onClick={() => {
                          setSelectedSongs((prev) => {
                            return prev.filter((id) => id !== s.id);
                          });
                        }}
                        variant="secondary"
                        className="bg-green-100 text-green-900 hover:bg-green-100/90"
                        size="icon"
                      >
                        <Check size={16} />
                      </Button>
                    ) : (
                      <Button
                        onClick={() =>
                          setSelectedSongs((prev) => {
                            return [...prev, s.id];
                          })
                        }
                        variant="secondary"
                        size="icon"
                      >
                        <Plus size={16} />
                      </Button>
                    )}
                  </div>
                );
              })}
          </div>
        </ScrollArea>
        <DialogFooter className="items-center gap-3 sm:justify-between">
          <DialogDescription className="text-center sm:text-left">
            {selectedSongs.length} songs selected
          </DialogDescription>
          <Button
            onClick={() => {
              addSongs.mutate({
                playlistId,
                songIds: selectedSongs,
              });
            }}
            disabled={!selectedSongs.length}
          >
            {addSongs.isLoading ? "Loading..." : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
