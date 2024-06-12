import { Suspense } from "react";
import { Loading } from "~/app/_components/Loading";
import { Component } from "./component";
import { type Props, generateAppMetadata } from "~/server/metadata/generate";
import { type Metadata } from "next";

export const generateMetadata = async (props: Props): Promise<Metadata> =>
  await generateAppMetadata(props);

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div className="h-full w-full">
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <Loading />
          </div>
        }
      >
        <Component id={Number(params.id)} />
      </Suspense>
    </div>
  );
}
