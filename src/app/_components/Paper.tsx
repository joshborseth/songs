import { type ReactNode } from "react";

export const Paper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full p-4 lg:p-10">
      <section className="w-full rounded-xl bg-white p-4 shadow-xl">
        {children}
      </section>
    </div>
  );
};
