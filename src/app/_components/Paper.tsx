import { type ReactNode } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";

export const Paper = ({
  children,
  height = "scroll",
}: {
  children: ReactNode;
  height?: "full" | "scroll";
}) => {
  const classNames =
    "max-h-[40vh] rounded-xl bg-white p-2 shadow-xl lg:max-h-[55vh] lg:p-4";
  return height === "full" ? (
    <section className={cn(classNames, "h-full")}>{children}</section>
  ) : (
    <ScrollArea className={classNames}>{children}</ScrollArea>
  );
};
