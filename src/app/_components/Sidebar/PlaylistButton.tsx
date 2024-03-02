"use client";

import { List } from "lucide-react";

import { Button } from "~/components/ui/button";
import { type playlists } from "~/server/db/schema";

export const PlaylistButton = ({
  playlist,
}: {
  playlist: typeof playlists.$inferSelect;
}) => {
  return (
    <Button variant="ghost" className="flex w-full justify-start gap-3">
      <List size={18} />
      {playlist.name.length > 20
        ? `${playlist.name.slice(0, 18)}...`
        : playlist.name}
    </Button>
  );
};
