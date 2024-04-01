import { db } from "~/server/db";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "~/components/ui/table";

import { Paper } from "~/app/_components/Paper";
import { eq } from "drizzle-orm";
import { playlists } from "~/server/db/schema";

export default async function Page({ params }: { params: { id: string } }) {
  const playlistSongsQuery = await db.query.playlists.findFirst({
    where: eq(playlists.id, Number(params.id)),
    with: {
      playlistSongs: {
        with: {
          song: true,
        },
      },
    },
  });

  if (!playlistSongsQuery) throw new Error("Playlist not found");

  const songs = playlistSongsQuery.playlistSongs.map((ps) => ps.song);

  return (
    <div className="h-full w-full">
      <Paper>
        <Table>
          <TableHead>{playlistSongsQuery.name}</TableHead>
          <TableBody>
            {songs.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
