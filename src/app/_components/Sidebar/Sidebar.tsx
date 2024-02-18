import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import Link from "next/link";

import { type ReactNode } from "react";

import { Player } from "../Player";

import { db } from "~/server/db";
import { SongButton } from "./SongButton";
import { Upload } from "../Upload";

export async function Sidebar({ children }: { children: React.ReactNode }) {
  const songs = await db.query.songs.findMany();
  return (
    <div className="flex h-full">
      <div className={cn("w-64 bg-white p-4 text-gray-900 shadow-2xl")}>
        <nav>
          <h1 className="pb-1 pl-3 text-3xl font-bold">Music</h1>
          <ul className="py-3">
            {/* <NavLink href="/" label="Library" icon={<Library size={18} />} />
            <NavLink
              href="/upload"
              label="Upload"
              icon={<Upload size={18} />}
            /> */}
          </ul>
        </nav>
        <div className="py-4">
          <h2 className="pl-3 text-lg font-bold">Songs</h2>

          <ul className="py-3">
            {songs.map((song) => (
              <SongButton key={song.id} song={song} />
            ))}
          </ul>
        </div>
        <div className="pl-3">
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
