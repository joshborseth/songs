import ytdl from "ytdl-core";
import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { songs } from "~/server/db/schema";
import { S3 } from "@aws-sdk/client-s3";
import { env } from "~/env";
import { randomUUID } from "crypto";
import { Upload } from "@aws-sdk/lib-storage";

export const upload = protectedProcedure
  .input(z.object({ ytUrl: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const audioReadableStream = ytdl(input.ytUrl, {
      filter: (format) => format.audioCodec === "mp4a.40.2",
    });

    const songInfo = await ytdl.getInfo(input.ytUrl);

    const songName = `${randomUUID()}-${songInfo.videoDetails.title}.mp4`;

    const upload = new Upload({
      client: new S3({
        region: env.S3_REGION,
        credentials: {
          accessKeyId: env.AWS_ACCESS_KEY_ID,
          secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
        },
      }),
      params: {
        Bucket: env.S3_BUCKET,
        Key: songName,
        Body: audioReadableStream,
        ContentType: "audio/mp4",
      },
    });

    await upload.done();

    await ctx.db.insert(songs).values({
      name: songInfo.videoDetails.title,
      s3Url: `https://${env.S3_BUCKET}.s3.${
        env.S3_REGION
      }.amazonaws.com/${encodeURI(songName)}`,
      thumbnailUrl: songInfo.videoDetails.thumbnails[0]?.url ?? "",
      userId: ctx.auth.userId,
    });
  });
