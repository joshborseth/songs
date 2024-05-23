"use client";

import { useAppState } from "../stores/app";
export const Color = () => {
  const colors = useAppState((s) => s.colors);
  if (!colors) return null;
  return (
    <div
      className="h-32 w-full"
      style={{
        background: `linear-gradient(to top, rgba(${colors[2].join(
          ",",
        )},.3), rgba(0,0,0,0) 100%)`,
      }}
    />
  );
};
