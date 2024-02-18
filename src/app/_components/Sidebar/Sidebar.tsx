"use client";
import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import Link from "next/link";
import { Library, LoaderIcon, Upload } from "lucide-react";
import { type ReactNode } from "react";

import { Songs } from "./Songs";
import { Player } from "../Player";
import { api } from "~/trpc/react";

export function Sidebar({ children }: { children: React.ReactNode }) {
  const songs = api.song.list.useQuery();

  if (songs.isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center overflow-hidden">
        <LoaderIcon size={64} className="animate-spin" />
      </div>
    );
  }

  //TODO: handle error
  if (!songs.data) return null;

  return (
    <div className="flex h-full">
      <div className={cn("w-64 bg-white p-4 text-gray-900 shadow-2xl")}>
        <nav>
          <h1 className="pb-1 pl-4 text-3xl font-bold">Music</h1>
          <ul className="py-3">
            <NavLink href="/" label="Library" icon={<Library size={18} />} />
            <NavLink
              href="/upload"
              label="Upload"
              icon={<Upload size={18} />}
            />
          </ul>
        </nav>
        <Songs songList={songs.data} />
      </div>
      <div className="flex h-full w-full flex-col items-start justify-end">
        {children}
        <Player listOfSongs={songs.data} />
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
