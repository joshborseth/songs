"use client";

import { SignOutButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { useAppState } from "~/app/stores/app";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";

export const UserInfo = () => {
  const { user, isLoaded } = useUser();
  const { clearQueue, setSong } = useAppState();

  const onSignOutClearLocalStorage = () => {
    clearQueue();
    setSong(null);
  };
  return (
    <div className="flex flex-grow flex-col justify-end gap-4 px-3">
      <h2 className="text-lg font-bold">Account</h2>
      <div className="flex items-center justify-start gap-4">
        <Avatar>
          <AvatarImage src={user?.imageUrl} alt="Profile Picture" />
          <AvatarFallback />
        </Avatar>
        {isLoaded ? (
          <>
            <SignedIn>
              <h3 className="w-28 truncate text-sm">
                {user?.firstName ?? user?.primaryEmailAddress?.emailAddress}
              </h3>
            </SignedIn>
            <SignedOut>
              <Skeleton className="h-4 w-28" />
            </SignedOut>
          </>
        ) : (
          <Skeleton className="h-4 w-28" />
        )}
      </div>

      {isLoaded ? (
        <>
          <SignedIn>
            <SignOutButton>
              <Button onClick={onSignOutClearLocalStorage} variant="outline">
                Sign Out
              </Button>
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
