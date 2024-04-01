import { type ReactNode } from "react";
import { Paper } from "./Paper";

export const PageWrapper = ({
  children,
  pageTitle,
}: {
  children: ReactNode;
  pageTitle: string;
}) => {
  return (
    <div className="flex w-full flex-col gap-4 p-4 lg:p-10">
      <h1 className="text-2xl font-bold">{pageTitle}</h1>
      <Paper>{children}</Paper>
    </div>
  );
};
