import { cn } from "~/lib/utils";
import { Player } from "../Player";
import { CreatePlaylist } from "../CreatePlaylist";
import { type ReactNode } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { List, ListMusic } from "lucide-react";
import { UploadSong } from "../UploadSong";
import { Queue } from "./Queue";
import { UserInfo } from "./UserInfo";

export async function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <div
        className={cn(
          "hidden h-full w-72 flex-col gap-2 bg-white p-4 text-gray-900 shadow-2xl lg:flex",
        )}
      >
        <h1 className="px-3 text-3xl font-bold">Music</h1>
        <nav className="my-4 border-y-[1px]">
          <ul className="py-2">
            <NavLink
              href="/playlists"
              icon={<List size={18} />}
              label="Playlists"
            />

            <NavLink
              href="/songs"
              icon={<ListMusic size={18} />}
              label="Songs"
            />
          </ul>
        </nav>
        <CreatePlaylist />
        <UploadSong />
        <div className="h-4" />
        <Queue />
        <UserInfo />
      </div>
      <div className="flex h-full w-full flex-col items-start justify-end">
        {children}
        <Player />
      </div>
    </div>
  );
}

const NavLink = ({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) => {
  return (
    <li>
      <Link href={href}>
        <Button variant="ghost" className="flex w-full justify-start gap-3">
          {icon}
          {label}
        </Button>
      </Link>
    </li>
  );
};
