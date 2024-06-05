import { type ReactNode } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";

export const Paper = ({ children }: { children: ReactNode }) => {
  return (
    <ScrollArea className="max-h-[50vh] rounded-xl bg-white p-2 shadow-xl lg:max-h-[55vh] lg:p-4">
      {children}
    </ScrollArea>
  );
};
