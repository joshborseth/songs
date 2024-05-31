import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type songs } from "~/server/db/schema";
import { unique } from "radash";
interface AppState {
  song: typeof songs.$inferSelect | null;
  setSong: (song: typeof songs.$inferSelect | null) => void;
  queue: (typeof songs.$inferSelect)[] | null;
  removeSongFromQueue: (songId: number) => void;
  clearQueue: () => void;
  addSongToQueue: (song: typeof songs.$inferSelect) => void;
  bulkAddSongsToQueue: (songsToAdd: (typeof songs.$inferSelect)[]) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

export const useAppState = create<AppState>()(
  persist(
    (set) => ({
      song: null,
      setSong: (song) =>
        set((prev) => {
          if (!song) return { song };
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
      removeSongFromQueue: (songId) =>
        set((prev) => {
          const newQueue = prev.queue?.filter((s) => s.id !== songId);
          if (prev.song?.id === songId)
            return {
              queue: newQueue,
              song: null,
            };
          return { queue: newQueue };
        }),
      clearQueue: () => set({ queue: null }),
      addSongToQueue: (song) =>
        set((prev) => {
          if (!prev.queue) {
            return { queue: [song] };
          }
          if (prev.queue.find((s) => s.id === song.id))
            return { queue: prev.queue };
          return {
            queue: [...prev.queue, song],
          };
        }),
      bulkAddSongsToQueue: (songsToAdd) =>
        set((prev) => {
          if (!prev.queue) {
            return { queue: songsToAdd };
          }
          return { queue: unique([...prev.queue, ...songsToAdd]) };
        }),
      volume: 0.5,
      setVolume: (volume) => set({ volume }),
    }),
    {
      name: "app-store",
    },
  ),
);
