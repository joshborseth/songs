import { api } from "~/trpc/server";
import { PageWrapper } from "../_components/PageWrapper";
import { UploadSong } from "../_components/UploadSong";
import { SongsTable } from "../_components/SongsTable/SongsTable";
import { Suspense } from "react";
import { Loading } from "../_components/Loading";

export const metadata = {
  title: "Songs",
  description: "Browse the music library.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function Page() {
  const songs = await api.song.list.query();
  return (
    <div className="h-full w-full">
      <PageWrapper pageTitle="Songs" actions={[<UploadSong />]}>
        <Suspense fallback={<Loading />}>
          <SongsTable data={songs} />
        </Suspense>
      </PageWrapper>
    </div>
  );
}
