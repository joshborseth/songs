import { PageWrapper } from "../_components/PageWrapper";

import { CreatePlaylist } from "../_components/CreatePlaylist";
import { Component } from "./component";
import { Suspense } from "react";
import { Loading } from "../_components/Loading";

export const metadata = {
  title: "Playlists",
  description: "Organize your music into playlists.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Page() {
  return (
    <div className="h-full w-full">
      <PageWrapper pageTitle="Playlists" actions={[<CreatePlaylist />]}>
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center">
              <Loading />
            </div>
          }
        >
          <Component />
        </Suspense>
      </PageWrapper>
    </div>
  );
}
