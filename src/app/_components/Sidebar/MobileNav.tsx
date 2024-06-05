"use client";
import { Menu } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { CreatePlaylist } from "../CreatePlaylist";
import { UploadSong } from "../UploadSong";
import { Queue } from "./Queue";
import { UserInfo } from "./UserInfo";
import { Separator } from "~/components/ui/separator";
import { NavLinks } from "./navigation";

export const MobileNav = () => {
  return (
    <nav className="flex h-20 w-full items-center justify-end bg-slate-900 text-white lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="default">
            <Menu size={22} color="white" />
          </Button>
        </SheetTrigger>
        <SheetContent
          className="flex h-screen w-60 flex-col gap-2 p-2"
          side="left"
        >
          <SheetTitle>
            <p className="px-3 text-2xl font-bold">Music</p>
          </SheetTitle>
          <Separator />
          <NavLinks />

          <Separator className="mb-4" />
          <CreatePlaylist />
          <UploadSong />
          <div className="h-4" />
          <Queue />
          <UserInfo />
        </SheetContent>
      </Sheet>
    </nav>
  );
};
