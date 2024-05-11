import { db } from "~/server/db";
import { DateTime } from "luxon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Edit } from "lucide-react";

import Link from "next/link";
import { PageWrapper } from "../_components/PageWrapper";
import { Button } from "~/components/ui/button";
import { DeletePlaylist } from "../_components/DeletePlaylist";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Suspense } from "react";
import { Loading } from "../_components/Loading";

export default async function Page() {
  const playlists = await db.query.playlists.findMany({
    with: {
      playlistSongs: true,
    },
  });
  return (
    <div className="h-full w-full">
      <PageWrapper pageTitle="Playlists">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Songs</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <Suspense fallback={<Loading />}>
              {playlists.map((p) => (
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
                            <Button size="icon" variant="ghost">
                              <Link href={`/playlists/${p.id}`}>
                                <Edit size={18} />
                              </Link>
                            </Button>
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
              ))}
            </Suspense>
          </TableBody>
        </Table>
      </PageWrapper>
    </div>
  );
}
