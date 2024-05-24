import { db } from "~/server/db";
import { eq } from "drizzle-orm";
import { playlists } from "~/server/db/schema";
import { PageWrapper } from "~/app/_components/PageWrapper";
import { AddSongsToPlaylist } from "~/app/_components/AddSongsToPlaylist";
import { Suspense } from "react";
import { Loading } from "~/app/_components/Loading";
import { SongsTable } from "~/app/_components/SongsTable/SongsTable";
import { PlayPlaylist } from "~/app/_components/PlayPlaylist";

//TODO: catch errors and show error page
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
      <PageWrapper
        pageTitle={playlistSongsQuery.name}
        backButton={{
          href: "/playlists",
        }}
        actions={[
          <PlayPlaylist songsFromPlaylist={songs} />,
          <AddSongsToPlaylist playlistId={Number(params.id)} />,
        ]}
      >
        <Suspense fallback={<Loading />}>
          <SongsTable data={songs} />
        </Suspense>
      </PageWrapper>
    </div>
  );
}
