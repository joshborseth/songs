import ytdl from "ytdl-core";
import { z } from "zod";
import { publicProcedure } from "~/server/api/trpc";
import { songs } from "~/server/db/schema";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { env } from "~/env";
import { randomUUID } from "crypto";

export const upload = publicProcedure
  .input(z.object({ ytUrl: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const client = new S3Client({
      region: env.S3_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });

    const audioReadableStream = ytdl(input.ytUrl, {
      filter: (format) => format.audioCodec === "mp4a.40.2",
    });

    const songInfo = await ytdl.getInfo(input.ytUrl);

    const songName = `${randomUUID()}-${songInfo.videoDetails.title}.mp4`;

    const putCommand = new PutObjectCommand({
      Bucket: env.S3_BUCKET,
      Key: songName,
      Body: audioReadableStream,
      ContentType: "audio/mp4",
    });

    await client.send(putCommand);

    await ctx.db.insert(songs).values({
      name: songInfo.videoDetails.title,
      s3Url: `https://${env.S3_BUCKET}.s3.${
        env.S3_REGION
      }.amazonaws.com/${encodeURI(songName)}`,
      thumbnailUrl: songInfo.videoDetails.thumbnails[0]?.url ?? "",
    });
  });
