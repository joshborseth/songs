import { playlistRouter } from "./routers/playlist";
import { songRouter } from "./routers/song";
import { createTRPCRouter } from "~/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  song: songRouter,
  playlist: playlistRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
