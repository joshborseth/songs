import { cn } from "~/lib/utils";
import { Player } from "../Player";
import { Queue } from "./Queue";
import { UserInfo } from "./UserInfo";
import { Separator } from "~/components/ui/separator";
import { NavLinks } from "./navigation";
import { MobileNav } from "./MobileNav";

export async function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <div
        className={cn(
          "hidden h-full w-60 flex-col gap-2 bg-white p-4 text-gray-900 shadow-2xl lg:flex",
        )}
      >
        <h1 className="px-3 text-3xl font-bold">Music</h1>
        <Separator className="mt-4" />
        <NavLinks />
        <Separator className="mb-4" />
        <Queue />
        <UserInfo />
      </div>
      <div className="flex h-full w-full flex-col items-start justify-end">
        <MobileNav />
        <div className="block h-4 lg:hidden" />
        {children}
        <Player />
      </div>
    </div>
  );
}
