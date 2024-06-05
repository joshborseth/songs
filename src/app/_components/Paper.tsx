import { type ReactNode } from "react";

export const Paper = ({ children }: { children: ReactNode }) => {
  return (
    <section className="max-h-[50vh] overflow-x-hidden overflow-y-scroll rounded-xl bg-white p-2 shadow-xl lg:max-h-[55vh] lg:p-4">
      {children}
    </section>
  );
};
