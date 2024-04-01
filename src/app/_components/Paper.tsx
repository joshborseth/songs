import { type ReactNode } from "react";

export const Paper = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full rounded-xl bg-white p-4 shadow-xl">
      {children}
    </section>
  );
};
