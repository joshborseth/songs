import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Library, Upload } from "lucide-react";

export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <div className={cn("w-64 bg-white p-4 text-gray-900 shadow-2xl")}></div>
      {children}
    </div>
  );
}
