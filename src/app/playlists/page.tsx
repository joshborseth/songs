import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import { PageWrapper } from "../_components/PageWrapper";

import { Suspense } from "react";
import { Loading } from "../_components/Loading";
import { CreatePlaylist } from "../_components/CreatePlaylist";
import { Component } from "./component";

export const metadata = {
  title: "Playlists",
  description: "Organize your music into playlists.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function Page() {
  return (
    <div className="h-full w-full">
      <PageWrapper pageTitle="Playlists" actions={[<CreatePlaylist />]}>
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
          <TableBody className="w-full">
            <Suspense
              fallback={
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    <Loading />
                  </TableCell>
                </TableRow>
              }
            >
              <Component />
            </Suspense>
          </TableBody>
        </Table>
      </PageWrapper>
    </div>
  );
}
