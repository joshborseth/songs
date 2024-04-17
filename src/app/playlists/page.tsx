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
import { EditIcon } from "lucide-react";

import Link from "next/link";
import { PageWrapper } from "../_components/PageWrapper";

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
            {playlists.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.name}</TableCell>
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
                  <Link href={`/playlists/${p.id}`}>
                    <EditIcon size={18} />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageWrapper>
    </div>
  );
}
