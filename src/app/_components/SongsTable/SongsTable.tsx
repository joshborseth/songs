"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { columns } from "./columns";

import { type FC, Fragment } from "react";
import { type songs } from "~/server/db/schema";
import { type ActionProps } from "./actions";
import { SongName } from "../SongName";

export const SongsTable = ({
  data,
  Actions,
}: {
  data: (typeof songs.$inferSelect)[];
  Actions: FC<ActionProps>;
}) => {
  const table = useReactTable({
    data,
    columns: columns({ Actions }),
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div className="hidden rounded-md lg:block">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns({ Actions }).length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-2 lg:hidden">
        {data.map((s) => {
          return (
            <div className="-pl-2 flex justify-between" key={s.id}>
              <SongName song={s} hideImage />
              <Actions song={s} />
            </div>
          );
        })}
        {!data.length && (
          <div className="flex w-full justify-center p-4">
            <span className="text-xs">No results.</span>
          </div>
        )}
      </div>
    </>
  );
};
