import { eq } from "drizzle-orm";
import { AddSongsToPlaylist } from "~/app/_components/AddSongsToPlaylist";
import { PageWrapper } from "~/app/_components/PageWrapper";
import { PlayPlaylist } from "~/app/_components/PlayPlaylist";
import { SongsTable } from "~/app/_components/SongsTable/SongsTable";
import { PlaylistActions } from "~/app/_components/SongsTable/actions";
import { db } from "~/server/db";
import { playlists } from "~/server/db/schema";

export async function Component({ id }: { id: number }) {
  const playlistSongsQuery = await db.query.playlists.findFirst({
    where: eq(playlists.id, id),
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
    <PageWrapper
      pageTitle={playlistSongsQuery.name}
      backButton={{
        href: "/playlists",
      }}
      actions={[
        <PlayPlaylist songsFromPlaylist={songs} />,
        <AddSongsToPlaylist playlistId={id} />,
      ]}
    >
      <SongsTable Actions={PlaylistActions} data={songs} />
    </PageWrapper>
  );
}
