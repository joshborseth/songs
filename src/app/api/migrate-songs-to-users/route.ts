import { db } from "~/server/db";
import { map } from "radash";
import { songs } from "~/server/db/schema";
import { eq } from "drizzle-orm";
export async function POST() {
  const songsQuery = await db.query.songs.findMany();

  await map(songsQuery, async (s) => {
    await db
      .update(songs)
      .set({
        userId: "user_2fIitDhvWByQ2tp0qDPpravyUrU",
      })
      .where(eq(songs.id, s.id));
  });
}
