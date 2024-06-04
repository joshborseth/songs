"use client";
import { type songs } from "~/server/db/schema";
import { DeleteSong } from "../DeleteSong";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "~/components/ui/tooltip";
import { PlaySong } from "../PlaySong";
import { AddSongToQueue } from "../AddSongToQueue";
import { type ReactNode } from "react";
import { RemoveSongFromPlaylist } from "../RemoveSongFromPlaylist";

export type ActionProps = {
  song: typeof songs.$inferSelect;
};

const BaseActions = ({
  song,
  moreActions,
}: ActionProps & {
  moreActions?: { tooltipContent: string; action: ReactNode }[];
}) => {
  return (
    <div className="flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <PlaySong song={song} />
          <TooltipContent>
            <p>Play Song</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <AddSongToQueue song={song} />
          <TooltipContent>
            <p>Add Song To Queue</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <DeleteSong songId={song.id} />
          <TooltipContent>
            <p>Delete Song</p>
          </TooltipContent>
        </Tooltip>
        {!!moreActions?.length &&
          moreActions.map((a) => {
            return (
              <Tooltip>
                {a.action}
                <TooltipContent>{a.tooltipContent}</TooltipContent>
              </Tooltip>
            );
          })}
      </TooltipProvider>
    </div>
  );
};

export const PlaylistActions = ({ song }: ActionProps) => {
  return (
    <BaseActions
      moreActions={[
        {
          action: <RemoveSongFromPlaylist songId={song.id} />,
          tooltipContent: "Remove Song From Playlist",
        },
      ]}
      song={song}
    />
  );
};

export const SongActions = ({ song }: ActionProps) => {
  return <BaseActions song={song} />;
};
