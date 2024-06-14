import { Loader2 } from "lucide-react";
import { cn } from "~/lib/utils";

export const Loading = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex w-full justify-center", className)}>
      <Loader2 size={32} className="h-6 w-6 animate-spin lg:h-auto lg:w-auto" />
    </div>
  );
};
