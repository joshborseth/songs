"use client";

import { Check, Plus } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useIntersectionObserver } from "usehooks-ts";
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
  const {
    data: songsRaw,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = api.song.list.useInfiniteQuery(
    {
      limit: 25,
    },
    {
      // the cursor from where to start fetching the posts
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  // a ref to the viewport
  const viewportRef = useRef<HTMLDivElement>(null);
  // a ref to the last post element
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 1,
    root: viewportRef.current,
  });

  useEffect(() => {
    // if the user reaches the bottom of the page, and there are more songs to fetch, fetch them
    if (
      isIntersecting &&
      songsRaw?.pages.length &&
      songsRaw?.pages[songsRaw.pages.length - 1]?.nextCursor
    )
      void fetchNextPage();
  }, [isIntersecting]);

  // memoize the songs, so that they don't get re-rendered on every re-render
  const songs = useMemo(
    () => songsRaw?.pages.flatMap((page) => page.data) ?? [],
    [songsRaw],
  );
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
            {isLoading ? <Loading /> : null}
            {songs.map((s, i) => {
              return (
                <div
                  className="flex items-center justify-between gap-2"
                  key={s.id}
                  ref={i === songs.length - 1 ? ref : undefined}
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
            {isFetchingNextPage && <Loading />}
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
