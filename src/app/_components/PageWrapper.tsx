import { type ReactNode } from "react";
import { Paper } from "./Paper";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { ArrowLeft } from "lucide-react";

export const PageWrapper = ({
  children,
  pageTitle,
  backButton,
  actions,
}: {
  children: ReactNode;
  pageTitle: string;
  backButton?: {
    href: string;
  };
  actions?: ReactNode[];
}) => {
  return (
    <div className="flex h-full w-full flex-col gap-4 p-4 lg:p-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {backButton && (
            <Button variant="link">
              <Link href={backButton.href}>
                <ArrowLeft />
              </Link>
            </Button>
          )}
          <h1 className="text-2xl font-bold">{pageTitle}</h1>
        </div>
        <div className="flex gap-2">{actions}</div>
      </div>
      <Paper>{children}</Paper>
    </div>
  );
};
