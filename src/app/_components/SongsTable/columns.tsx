"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { type songs } from "~/server/db/schema";
import { SongName } from "../SongName";
import { type FC } from "react";
import { type ActionProps } from "./actions";

export const columns: ({
  Actions,
}: {
  Actions: FC<ActionProps>;
}) => ColumnDef<typeof songs.$inferSelect>[] = ({ Actions }) => [
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
      return <Actions song={row.original} />;
    },
  },
];
