"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { DateTime } from "luxon";
import { type songs } from "~/server/db/schema";
import { SongName } from "../_components/SongName";

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
  // TODO: add in these actions
  // {
  //   accessorKey: "actions",
  //   header: "Actions",
  //   cell: () => {
  //     return (
  //       <div className="flex gap-2">
  //         <Button variant="ghost" size="icon">
  //           <PlusSquare size={18} />
  //         </Button>
  //         <Button variant="ghost" size="icon">
  //           <PlaySquare size={18} />
  //         </Button>
  //       </div>
  //     );
  //   },
  // },
];
