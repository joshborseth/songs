import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type songs } from "~/server/db/schema";

interface SongState {
  song: typeof songs.$inferSelect | null;
  setSong: (song: typeof songs.$inferSelect) => void;
  queue: (typeof songs.$inferSelect)[] | null;
  removeSongFromQueue: (songId: number) => void;
  clearQueue: () => void;
  addSongToQueue: (song: typeof songs.$inferSelect) => void;
  color: number[] | null;
  setColor: (color: number[]) => void;
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
      color: null,
      setColor: (color) => set({ color }),
    }),
    {
      name: "song-store",
    },
  ),
);
