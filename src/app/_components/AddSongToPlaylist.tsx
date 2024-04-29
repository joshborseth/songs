"use client";

import { PlusSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { api } from "~/trpc/react";

export const AddSongToPlaylist = ({ songId }: { songId: number }) => {
  const { data } = api.playlist.list.useQuery();
  const utils = api.useUtils();
  const router = useRouter();
  const addSongMutation = api.playlist.addSongToPlaylist.useMutation({
    async onMutate(songToAdd) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.playlist.list.cancel();

      // Get the data from the queryCache
      const prevData = utils.playlist.list.getData();

      utils.playlist.list.setData(undefined, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.map((p) => {
            return {
              ...p,
              playlistSongs: [
                ...p.playlistSongs,
                {
                  ...songToAdd,
                },
              ],
            };
          }),
        };
      });

      // Return the previous data so we can revert if something goes wrong
      return { prevData };
    },
    onError(_err, _newPost, ctx) {
      if (!ctx) return;
      // If the mutation fails, use the context-value from onMutate
      utils.playlist.list.setData(undefined, ctx.prevData);
    },
    onSettled() {
      // Sync with server once mutation has settled
      void utils.playlist.list.invalidate();
    },
    onSuccess() {
      router.refresh();
    },
  });
  const removeSongMutation = api.playlist.removeSongFromPlaylist.useMutation({
    async onMutate(songToRemove) {
      // Cancel outgoing fetches (so they don't overwrite our optimistic update)
      await utils.playlist.list.cancel();

      // Get the data from the queryCache
      const prevData = utils.playlist.list.getData();

      utils.playlist.list.setData(undefined, (old) => {
        if (!old) return old;
        return {
          ...old,
          data: old.map((p) => {
            return {
              ...p,
              playlistSongs: p.playlistSongs.filter((ps) => {
                return !Boolean(
                  ps.songId === songToRemove.songId &&
                    ps.playlistId === songToRemove.playlistId,
                );
              }),
            };
          }),
        };
      });

      // Return the previous data so we can revert if something goes wrong
      return { prevData };
    },
    onError(_err, _newPost, ctx) {
      if (!ctx) return;
      // If the mutation fails, use the context-value from onMutate
      utils.playlist.list.setData(undefined, ctx.prevData);
    },
    onSettled() {
      // Sync with server once mutation has settled
      void utils.playlist.list.invalidate();
    },
    onSuccess() {
      router.refresh();
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <PlusSquare size={18} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Add to Playlist</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {data?.length &&
          data.map((p) => {
            return (
              <DropdownMenuCheckboxItem
                checked={p.playlistSongs
                  .map((ps) => ps.songId)
                  .includes(songId)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    addSongMutation.mutate({
                      playlistId: p.id,
                      songId,
                    });
                  } else {
                    removeSongMutation.mutate({
                      playlistId: p.id,
                      songId,
                    });
                  }
                }}
                key={p.id}
              >
                {p.name}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
