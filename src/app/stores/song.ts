import { create } from "zustand";
import { type songs } from "~/server/db/schema";

interface SongState {
  song: typeof songs.$inferSelect | null;
  setSong: (song: typeof songs.$inferSelect) => void;
}

export const useCurrentSong = create<SongState>()((set) => ({
  song: null,
  setSong: (song) => set(() => ({ song })),
}));
