"use client";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

export const Upload = () => {
  const uploadMutation = api.song.upload.useMutation();
  const [ytUrl, setYtUrl] = useState("");
  return (
    <div className="flex w-full flex-col gap-2">
      <input
        type="text"
        onChange={(e) => setYtUrl(e.target.value)}
        className="border-2 p-4"
        placeholder="Youtube URL"
      />
      <Button
        onClick={() => {
          if (!ytUrl.trim()) return;
          uploadMutation.mutate(
            {
              ytUrl: ytUrl,
            },
            {
              onSuccess: () => {
                alert("Uploaded!");
                setYtUrl("");
              },
            },
          );
        }}
      >
        {uploadMutation.isLoading ? "Uploading..." : "Upload"}
      </Button>
    </div>
  );
};
