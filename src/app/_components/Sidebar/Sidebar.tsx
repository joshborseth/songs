import { cn } from "~/lib/utils";

import { Player } from "../Player";

import { db } from "~/server/db";
import { SongButton } from "./SongButton";
import { Upload } from "../Upload";
import { ScrollArea } from "~/components/ui/scroll-area";
import { CreatePlaylist } from "../CreatePlaylist";
import { PlaylistButton } from "./PlaylistButton";
import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { List, Music, Music2 } from "lucide-react";

export async function Sidebar({ children }: { children: React.ReactNode }) {
  const songs = await db.query.songs.findMany();
  const playlists = await db.query.playlists.findMany();
  return (
    <div className="flex h-full">
      <div
        className={cn(
          "flex h-full w-64 flex-col gap-2 bg-white p-4 text-gray-900 shadow-2xl",
        )}
      >
        <h1 className="pl-3 text-3xl font-bold">Music</h1>
        <nav className="my-4 border-y-2">
          <ul className="py-2">
            <NavLink
              href="/playlists"
              icon={<List size={18} />}
              label="Playlists"
            />
            {/* TODO: update link */}
            <NavLink href="/" icon={<Music2 size={18} />} label="Songs" />
          </ul>
        </nav>
        <div className="h-1/2">
          <ScrollArea className="h-full py-3">
            <ul>
              {songs.map((song) => (
                <SongButton key={song.id} song={song} />
              ))}
            </ul>
          </ScrollArea>
        </div>

        <CreatePlaylist />

        <div className="flex h-full items-end">
          <Upload />
        </div>
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
