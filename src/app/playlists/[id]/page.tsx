import { db } from "~/server/db";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "~/components/ui/table";

import { eq } from "drizzle-orm";
import { playlists } from "~/server/db/schema";
import { PageWrapper } from "~/app/_components/PageWrapper";

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
      <PageWrapper pageTitle={playlistSongsQuery.name}>
        {songs.length ? (
          <Table>
            <TableBody>
              {songs.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-center">No songs in this playlist.</p>
        )}
      </PageWrapper>
    </div>
  );
}
