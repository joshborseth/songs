"use client";
import { Home, List, ListMusic } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export const NavLinks = () => {
  return (
    <nav>
      <ul className="py-1">
        <NavLink
          href="/"
          icon={<Home size={18} />}
          activeIcon={<Home size={18} strokeWidth={3} />}
          label="Home"
        />
        <NavLink
          href="/playlists"
          icon={<List size={18} />}
          activeIcon={<List size={18} strokeWidth={3} />}
          label="Playlists"
        />

        <NavLink
          href="/songs"
          icon={<ListMusic size={18} />}
          activeIcon={<ListMusic size={18} strokeWidth={3} />}
          label="Songs"
        />
      </ul>
    </nav>
  );
};

const NavLink = ({
  href,
  label,
  icon,
  activeIcon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  activeIcon: ReactNode;
}) => {
  const pathname = usePathname();

  const isActive =
    (pathname === "/" && label === "Home") ||
    (pathname.includes(href) && href !== "/");

  return (
    <li>
      <Link href={href}>
        <Button
          variant="ghost"
          className={cn(
            "flex w-full justify-start gap-3 text-xs lg:text-sm",
            isActive ? "font-bold" : "",
          )}
        >
          {isActive ? activeIcon : icon}
          {label}
        </Button>
      </Link>
    </li>
  );
};
