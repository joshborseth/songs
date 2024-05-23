"use client";

import { useAppState } from "../stores/app";
//TODO: add the other two colors to this gradient
export const Color = () => {
  const color = useAppState((s) => s.color);
  if (!color) return null;
  return (
    <div
      className="h-32 w-full"
      style={{
        background: `linear-gradient(to top, rgba(${color.join(
          ",",
        )},.3), rgba(0,0,0,0) 100%)`,
      }}
    />
  );
};
