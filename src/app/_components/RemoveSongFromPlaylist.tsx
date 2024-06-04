"use client";

import { ListMinus } from "lucide-react";
import { Button } from "~/components/ui/button";

import { TooltipTrigger } from "~/components/ui/tooltip";
import { api } from "~/trpc/react";
import { usePathname, useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";

export const RemoveSongFromPlaylist = ({ songId }: { songId: number }) => {
  const router = useRouter();
  const utils = api.useUtils();
  const removeSongMutation = api.playlist.removeSongFromPlaylist.useMutation({
    onSuccess: () => {
      void router.refresh();
      void utils.playlist.listSongsToAdd.invalidate();
    },
  });
  const pathname = usePathname();
  const splitPathname = pathname.split("/");
  const playlistId = Number(splitPathname[splitPathname.length - 1]);

  return (
    <TooltipTrigger asChild>
      <Button
        onClick={() => removeSongMutation.mutate({ playlistId, songId })}
        size="icon"
        variant="ghost"
      >
        {removeSongMutation.isLoading ? (
          <Loader2 size={18} />
        ) : (
          <ListMinus size={18} />
        )}
      </Button>
    </TooltipTrigger>
  );
};
