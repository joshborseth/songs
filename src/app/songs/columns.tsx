"use client";

import { type ColumnDef } from "@tanstack/react-table";
import { PlaySquare, PlusSquare } from "lucide-react";
import { DateTime } from "luxon";
import { Button } from "~/components/ui/button";
import { type songs } from "~/server/db/schema";

export const columns: ColumnDef<typeof songs.$inferSelect>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
    cell: () => {
      return (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <PlusSquare size={18} />
          </Button>
          <Button variant="ghost" size="icon">
            <PlaySquare size={18} />
          </Button>
        </div>
      );
      [];
    },
  },
];
