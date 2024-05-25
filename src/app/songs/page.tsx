import { PageWrapper } from "../_components/PageWrapper";
import { UploadSong } from "../_components/UploadSong";
import { Suspense } from "react";
import { Loading } from "../_components/Loading";
import { Songs } from "./component";

export const metadata = {
  title: "Songs",
  description: "Browse the music library.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Page() {
  return (
    <div className="h-full w-full">
      <PageWrapper pageTitle="Songs" actions={[<UploadSong />]}>
        <Suspense fallback={<Loading />}>
          <Songs />
        </Suspense>
      </PageWrapper>
    </div>
  );
}
