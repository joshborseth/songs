import "server-only";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { songs } from "../db/schema";
import { type Metadata } from "next";

export type Props = {
  params: { id: string };
  searchParams: Record<"currentSong", string> | undefined;
};
export const generateAppMetadata = async (props: Props): Promise<Metadata> => {
  const currentSong = Number(props?.searchParams?.currentSong);
  if (!currentSong)
    return {
      title: "Music App",
      description: "An app for listening to music",
      icons: [{ rel: "icon", url: "/favicon.ico" }],
    };

  const findSong = await db.query.songs.findFirst({
    where: eq(songs.id, currentSong),
  });

  const title = findSong?.name ? `Music App - ${findSong.name}` : "Music App";

  return {
    title,
    description: "An app for listening to music",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
  };
};
