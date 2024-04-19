"use client";

import { SignOutButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";

export const UserInfo = () => {
  const { user, isLoaded } = useUser();
  return (
    <div className="flex flex-grow flex-col justify-end gap-4 px-3">
      <h2 className="text-lg font-bold">Account</h2>
      <div className="flex items-center justify-start gap-4">
        <Avatar>
          <AvatarImage
            src={user?.imageUrl}
            alt={user?.primaryEmailAddress?.emailAddress ?? "Profile Picture"}
          />
          <AvatarFallback>
            {user?.firstName?.slice(0, 1)}
            {user?.lastName?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        {isLoaded ? (
          <>
            <SignedIn>
              <h3 className="w-32 truncate text-sm">
                {user?.firstName ?? user?.primaryEmailAddress?.emailAddress}
              </h3>
            </SignedIn>
            <SignedOut>
              <Skeleton className="h-4 w-32" />
            </SignedOut>
          </>
        ) : (
          <Skeleton className="h-4 w-32" />
        )}
      </div>

      {isLoaded ? (
        <>
          <SignedIn>
            <SignOutButton>
              <Button variant="outline">Sign Out</Button>
            </SignOutButton>
          </SignedIn>
          <SignedOut>
            <Skeleton className="h-10 w-full rounded-md" />
          </SignedOut>
        </>
      ) : (
        <Skeleton className="h-10 w-full rounded-md" />
      )}
    </div>
  );
};
