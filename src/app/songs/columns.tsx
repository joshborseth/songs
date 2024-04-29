"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { type songs } from "~/server/db/schema";
import { SongName } from "../_components/SongName";
import { DeleteSong } from "../_components/DeleteSong";
import { PlaySong } from "../_components/PlaySong";
import { AddSongToPlaylist } from "../_components/AddSongToPlaylist";

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
          <PlaySong song={row.original} />
          <DeleteSong songId={row.original.id} />
          <AddSongToPlaylist songId={row.original.id} />
        </div>
      );
    },
  },
];
