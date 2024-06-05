"use client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";

export const UploadSong = () => {
  const uploadMutation = api.song.upload.useMutation();
  const [ytUrl, setYtUrl] = useState("");
  const { toast } = useToast();
  const utils = api.useUtils();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full text-xs lg:text-sm">
          <div className="-ml-3 flex items-center gap-2">
            <Plus size={24} />
            <span>Upload a Song</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
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
                  setOpen(false);
                  void utils.song.list.invalidate();
                  router.refresh();
                },
                onError: (err) => {
                  toast({
                    title: "Error",
                    description: err.message,
                    variant: "destructive",
                  });
                },
              },
            );
          }}
          className="flex h-full flex-col gap-4"
        >
          <DialogHeader>
            <DialogTitle>Upload a Song</DialogTitle>
            <DialogDescription>
              Copy and Paste the Youtube URL of the song you want to upload. We
              will then automatically download the song and add it to your
              library.
            </DialogDescription>
          </DialogHeader>
          <Label className="sr-only" htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            onChange={(e) => setYtUrl(e.target.value)}
            value={ytUrl}
            required
            placeholder="Youtube URL"
          />
          <DialogFooter>
            <Button type="submit">
              {uploadMutation.isLoading ? "Loading..." : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
