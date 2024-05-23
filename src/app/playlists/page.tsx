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
import { CreatePlaylist } from "../_components/CreatePlaylist";
import { api } from "~/trpc/server";

export const metadata = {
  title: "Playlists",
  description: "Organize your music into playlists.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Page() {
  const playlists = await api.playlist.list.query();

  return (
    <div className="h-full w-full">
      <PageWrapper pageTitle="Playlists" actions={[<CreatePlaylist />]}>
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
          <TableBody className="w-full">
            <Suspense
              fallback={
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <Loading />
                  </TableCell>
                </TableRow>
              }
            >
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
            </Suspense>
          </TableBody>
        </Table>
      </PageWrapper>
    </div>
  );
}
