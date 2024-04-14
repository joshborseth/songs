import { type ReactNode } from "react";

export const Paper = ({ children }: { children: ReactNode }) => {
  return (
    <section className="h-full max-h-[30rem] w-full overflow-y-scroll rounded-xl bg-white p-4 shadow-xl">
      {children}
    </section>
  );
};
