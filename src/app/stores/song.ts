import { create } from "zustand";
import { type songs } from "~/server/db/schema";

interface SongState {
  song: typeof songs.$inferSelect | null;
  setSong: (song: typeof songs.$inferSelect) => void;
  queue: (typeof songs.$inferSelect)[] | null;
}

export const useSongs = create<SongState>()((set) => ({
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
}));
