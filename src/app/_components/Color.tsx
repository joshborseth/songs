"use client";

import { useSongs } from "../stores/song";

export const Color = () => {
  const color = useSongs((s) => s.color);
  if (!color) return null;
  return (
    <div
      className="h-full w-full saturate-100"
      style={{
        background: `linear-gradient(to top, rgba(${color.join(
          ",",
        )},.3), rgba(0,0,0,0) 100%)`,
      }}
    />
  );
};
