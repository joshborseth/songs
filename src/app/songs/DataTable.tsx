"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useIntersectionObserver } from "usehooks-ts";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { columns } from "./columns";

import { api } from "~/trpc/react";
import React, { useEffect, useMemo, useRef } from "react";
import { Loader2 } from "lucide-react";
// TODO: probs shouldnt render a table at all with no data
//maybe just the spinner
export function DataTable() {
  const {
    data: songsRaw,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
  } = api.song.list.useInfiniteQuery(
    {
      limit: 25,
    },
    {
      // the cursor from where to start fetching the posts
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  // a ref to the viewport
  const viewportRef = useRef<HTMLDivElement>(null);
  // a ref to the last post element
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 1,
    root: viewportRef.current,
  });

  useEffect(() => {
    // if the user reaches the bottom of the page, and there are more songs to fetch, fetch them
    if (
      isIntersecting &&
      songsRaw?.pages.length &&
      songsRaw?.pages[songsRaw.pages.length - 1]?.nextCursor
    )
      void fetchNextPage();
  }, [isIntersecting]);

  // memoize the songs, so that they don't get re-rendered on every re-render
  const songs = useMemo(
    () => songsRaw?.pages.flatMap((page) => page.data) ?? [],
    [songsRaw],
  );

  const table = useReactTable({
    data: songs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md">
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
            table.getRowModel().rows.map((row, i) => (
              <React.Fragment key={row.id}>
                {i === table.getRowModel().rows.length - 1 ? (
                  <TableRow
                    ref={ref}
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
                ) : (
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
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {isLoading ? (
                  <div className="flex w-full justify-center">
                    <Loader2 size={42} className="animate-spin" />
                  </div>
                ) : (
                  "No results."
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isFetchingNextPage && (
        <div className="flex w-full justify-center">
          <Loader2 size={32} className="animate-spin" />
        </div>
      )}
    </div>
  );
}
