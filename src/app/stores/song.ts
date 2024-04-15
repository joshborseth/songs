import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type songs } from "~/server/db/schema";

interface SongState {
  song: typeof songs.$inferSelect | null;
  setSong: (song: typeof songs.$inferSelect) => void;
  queue: (typeof songs.$inferSelect)[] | null;
  removeSongFromQueue: (song: typeof songs.$inferSelect) => void;
  clearQueue: () => void;
}

export const useSongs = create<SongState>()(
  persist(
    (set) => ({
      song: null,
      setSong: (song) =>
        set((prev) => {
          if (!prev.queue) {
            return { song, queue: [song] };
          }
          if (prev.queue.find((s) => s.id === song.id))
            return { song, queue: prev.queue };
          return {
            queue: [...prev.queue, song],
            song,
          };
        }),
      queue: null,
      removeSongFromQueue: (song) =>
        set((prev) => {
          const newQueue = prev.queue?.filter((s) => s.id !== song.id);
          if (prev.song?.id === song.id)
            return {
              queue: newQueue,
              song: null,
            };
          return { queue: newQueue };
        }),
      clearQueue: () => set({ queue: null }),
    }),
    {
      name: "song-store",
    },
  ),
);
