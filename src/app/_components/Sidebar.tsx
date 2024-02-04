import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import { Library, Upload } from "lucide-react";
//idk if we will actually use this
export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <div
        className={cn("w-full max-w-xs bg-white p-4 text-gray-900 shadow-2xl")}
      >
        <div className="p-2 text-5xl font-extrabold">
          <p>Josh's Bad Music Service</p>
        </div>

        <div className="py-4" />
        <nav className="flex w-full flex-col items-start gap-3">
          <Button
            variant="ghost"
            className="flex w-full justify-start gap-3 py-6"
          >
            <Library size={24} />
            <p className="text-2xl">Library</p>
          </Button>
          <Button
            variant="ghost"
            className="flex w-full items-center justify-start gap-3 py-6"
          >
            <Upload size={24} />
            <p className="text-2xl">Upload</p>
          </Button>
        </nav>
      </div>
      {children}
    </div>
  );
}
