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
import { TableCell, TableRow } from "~/components/ui/table";

export async function Component() {
  const playlists = await api.playlist.list.query();
  return (
    <>
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
    </>
  );
}
