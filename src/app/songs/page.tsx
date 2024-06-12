import { PageWrapper } from "../_components/PageWrapper";
import { UploadSong } from "../_components/UploadSong";
import { Suspense } from "react";
import { Loading } from "../_components/Loading";
import { Songs } from "./component";
import { type Props, generateAppMetadata } from "~/server/metadata/generate";
import { type Metadata } from "next";

export const generateMetadata = async (props: Props): Promise<Metadata> =>
  await generateAppMetadata(props);

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
