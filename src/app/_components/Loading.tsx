import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex w-full justify-center">
      <Loader2 size={32} className="h-6 w-6 animate-spin lg:h-auto lg:w-auto" />
    </div>
  );
};
