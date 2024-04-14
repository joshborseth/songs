import { db } from "~/server/db";
import { PageWrapper } from "../_components/PageWrapper";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import { count } from "drizzle-orm";
import { songs } from "~/server/db/schema";
import { LIMIT } from "./constants";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  if (!searchParams.page) {
    redirect("/songs?page=1");
  }

  const songsQuery = await db.query.songs.findMany({
    limit: LIMIT,
    offset: (Number(searchParams.page) - 1) * LIMIT,
  });

  const countQuery = await db.select({ count: count() }).from(songs);

  const totalNumberOfSongs = countQuery[0]?.count ?? 0;

  return (
    <div className="h-full w-full">
      <PageWrapper pageTitle="Songs">
        <DataTable
          columns={columns}
          data={songsQuery}
          totalRows={totalNumberOfSongs}
          pageNumber={Number(searchParams.page)}
        />
      </PageWrapper>
    </div>
  );
}
