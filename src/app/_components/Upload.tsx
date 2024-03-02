"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

export const Upload = () => {
  const uploadMutation = api.song.upload.useMutation();
  const [ytUrl, setYtUrl] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const parsedData = z.string().url().safeParse(ytUrl);
        if (!parsedData.success) {
          toast({
            title: "Invalid URL",
            description: "Please enter a valid URL",
            variant: "destructive",
          });
          return;
        }
        uploadMutation.mutate(
          {
            ytUrl: parsedData.data,
          },
          {
            onSuccess: () => {
              toast({
                title: "Success",
                description: "Song has been uploaded",
              });
              setYtUrl("");
              router.refresh();
            },
          },
        );
      }}
      className="flex w-full flex-col gap-2"
    >
      <Input
        type="text"
        onChange={(e) => setYtUrl(e.target.value)}
        placeholder="Youtube URL"
        value={ytUrl}
      />
      <Button type="submit" disabled={!Boolean(ytUrl)}>
        {uploadMutation.isLoading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
};
