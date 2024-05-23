"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { type songs } from "~/server/db/schema";
import { SongName } from "../SongName";
import { DeleteSong } from "../DeleteSong";
import { PlaySong } from "../PlaySong";
import { AddSongToQueue } from "../AddSongToQueue";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "~/components/ui/tooltip";

export const columns: ColumnDef<typeof songs.$inferSelect>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ cell }) => {
      return <SongName song={cell.getContext().row?.original} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Uploaded At",
    accessorFn: (row) =>
      row?.createdAt
        ? DateTime.fromSQL(row.createdAt).toFormat("LLL dd yyyy")
        : "N/A",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <PlaySong song={row.original} />
              <TooltipContent>
                <p>Play Song</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <AddSongToQueue song={row.original} />
              <TooltipContent>
                <p>Add Song To Queue</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <DeleteSong songId={row.original.id} />
              <TooltipContent>
                <p>Delete Song</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
];
