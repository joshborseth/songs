"use client";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuTrigger,
} from "~/components/ui/context-menu";

import { Activity, AudioLines, Music, Trash2 } from "lucide-react";
import { useCurrentSong } from "~/app/stores/song";
import { Button } from "~/components/ui/button";
import { type songs } from "~/server/db/schema";
import { api } from "~/trpc/react";
import { useToast } from "~/components/ui/use-toast";
import { useRouter } from "next/navigation";

export const SongButton = ({ song }: { song: typeof songs.$inferSelect }) => {
  const songState = useCurrentSong();
  const { toast } = useToast();
  const router = useRouter();
  const deleteSong = api.song.deleteSong.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Song has been deleted",
      });
      router.refresh();
    },
    onError: (err) => {
      toast({
        title: "Error",
        description: err.message,
        variant: "destructive",
      });
    },
  });
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Button
          onClick={() => songState.setSong(song)}
          variant="ghost"
          className="flex w-full justify-start gap-3"
        >
          {songState.song?.id === song.id ? (
            <AudioLines size={18} className="animate-pulse" />
          ) : (
            <Music size={18} />
          )}

          {song.name.length > 20 ? `${song.name.slice(0, 18)}...` : song.name}
        </Button>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <Button
          onClick={() => deleteSong.mutate({ songId: song.id })}
          variant="destructive"
          className="flex w-full justify-center gap-3"
        >
          <Trash2 size={18} />
          {deleteSong.isLoading ? "Loading..." : "Delete"}
        </Button>
      </ContextMenuContent>
    </ContextMenu>
  );
};
