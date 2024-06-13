import { type ReactNode } from "react";
import { Paper } from "./Paper";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowLeft, CircleEllipsis } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

export const PageWrapper = ({
  children,
  pageTitle,
  backButton,
  actions,
  height = "scroll",
}: {
  children: ReactNode;
  pageTitle: string;
  backButton?: {
    href: string;
  };
  actions?: ReactNode[];
  height?: "scroll" | "full";
}) => {
  return (
    <>
      <div className="flex h-full w-full flex-col gap-4 p-2 lg:p-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {backButton && (
              <Link href={backButton.href}>
                <Button variant="link">
                  <ArrowLeft />
                </Button>
              </Link>
            )}
            <h1 className="pl-1 text-xl font-bold lg:text-2xl">{pageTitle}</h1>
          </div>
          {actions?.length && (
            <div className="hidden gap-2 lg:flex">
              {actions?.map((a) => <div className="w-32 lg:w-48">{a}</div>)}
            </div>
          )}

          {actions?.length && (
            <div className="block lg:hidden">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <CircleEllipsis />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex w-56 flex-col gap-2 p-2">
                  {actions?.map((a) => <div className="w-full">{a}</div>)}
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
        <Paper height={height}>{children}</Paper>
      </div>
    </>
  );
};
