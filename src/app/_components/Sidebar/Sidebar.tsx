import { cn } from "~/lib/utils";

import { Player } from "../Player";
import { db } from "~/server/db";
import { SongButton } from "./SongButton";
import { ScrollArea } from "~/components/ui/scroll-area";
import { CreatePlaylist } from "../CreatePlaylist";
import { type ReactNode } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { List, Music2 } from "lucide-react";
import { UploadSong } from "../UploadSong";

export async function Sidebar({ children }: { children: React.ReactNode }) {
  const songs = await db.query.songs.findMany({
    limit: 20,
  });
  return (
    <div className="flex h-full">
      <div
        className={cn(
          "hidden h-full w-72 flex-col gap-2 bg-white p-4 text-gray-900 shadow-2xl lg:flex",
        )}
      >
        <h1 className="pl-3 text-3xl font-bold">Music</h1>
        <nav className="my-4 border-y-[1px]">
          <ul className="py-2">
            <NavLink
              href="/playlists"
              icon={<List size={18} />}
              label="Playlists"
            />

            <NavLink href="/songs" icon={<Music2 size={18} />} label="Songs" />
          </ul>
        </nav>
        <div className="h-1/3">
          <ScrollArea className="h-full py-3">
            <ul>
              {songs.map((song) => (
                <div key={song.id}>
                  <SongButton key={song.id} song={song} />
                </div>
              ))}
            </ul>
          </ScrollArea>
        </div>

        <CreatePlaylist />
        <UploadSong />
      </div>
      <div className="flex h-full w-full flex-col items-start justify-end">
        {children}
        <Player listOfSongs={songs} />
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
