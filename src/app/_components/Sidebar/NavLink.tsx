"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export const NavLink = ({
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
  const isActive = pathname.includes(label.toLowerCase());
  return (
    <li>
      <Link href={href}>
        <Button
          variant="ghost"
          className={cn(
            "flex w-full justify-start gap-3",
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
