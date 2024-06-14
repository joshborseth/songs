import { Button } from "~/components/ui/button";
import { DeletePlaylist } from "../_components/DeletePlaylist";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { api } from "~/trpc/server";
import { Edit } from "lucide-react";
import Link from "next/link";
import { DateTime } from "luxon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { ScrollArea } from "~/components/ui/scroll-area";

export async function Component() {
  const playlists = await api.playlist.list.query();
  return (
    <>
      <Table className="hidden lg:table">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Songs</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full">
          {playlists.length ? (
            playlists.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.playlistSongs.length}</TableCell>
                <TableCell>
                  {p?.createdAt
                    ? DateTime.fromSQL(p.createdAt).toFormat("LLL dd yyyy")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {p?.updatedAt
                    ? DateTime.fromSQL(p.updatedAt).toFormat("LLL dd yyyy")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={`/playlists/${p.id}`}>
                            <Button size="icon" variant="ghost">
                              <Edit size={18} />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit Playlist</p>
                        </TooltipContent>
                      </Tooltip>
                      <DeletePlaylist playlistId={p.id} />
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <ScrollArea className="block lg:hidden">
        <div className="flex flex-col">
          {playlists.length ? (
            playlists.map((p) => {
              return (
                <div
                  key={p.id}
                  className="flex items-center justify-between px-2 text-xs"
                >
                  <p>{p.name}</p>
                  <div className="flex gap-2">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={`/playlists/${p.id}`}>
                            <Button size="icon" variant="ghost">
                              <Edit
                                size={18}
                                className="h-4 w-4 lg:h-auto lg:w-auto"
                              />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit Playlist</p>
                        </TooltipContent>
                      </Tooltip>
                      <DeletePlaylist playlistId={p.id} />
                    </TooltipProvider>
                  </div>
                </div>
              );
            })
          ) : (
            <span className="text-center text-xs">No results.</span>
          )}
        </div>
      </ScrollArea>
    </>
  );
}
