import { db } from "~/server/db";
import { DateTime } from "luxon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { PageWrapper } from "../_components/PageWrapper";

export default async function Page({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  const LIMIT = 20;
  const songs = await db.query.songs.findMany({
    limit: LIMIT,
    offset: (Number(searchParams.page) - 1) * LIMIT,
  });

  return (
    <div className="h-full w-full">
      <PageWrapper pageTitle="Songs">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Uploaded At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {songs.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>
                  {s?.createdAt
                    ? DateTime.fromSQL(s.createdAt).toFormat("LLL dd yyyy")
                    : "N/A"}
                </TableCell>
                <TableCell>TO BE IMPLEMENTED</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </PageWrapper>
    </div>
  );
}
