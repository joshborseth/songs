"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { debounce } from "radash";
import { useRef } from "react";
import { Loading } from "~/app/_components/Loading";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useToast } from "~/components/ui/use-toast";
import { api } from "~/trpc/react";
import { type RouterOutputs } from "~/trpc/shared";

export const Search = () => {
  const searchMutation = api.explore.searchByKeyword.useMutation();

  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSearch = debounce(
    {
      delay: 500,
    },
    () => {
      searchMutation.mutate({ keyword: inputRef.current?.value ?? "" });
    },
  );

  return (
    <div className="p-4">
      <Input
        placeholder="Search YouTube..."
        ref={inputRef}
        onChange={debouncedSearch}
      />
      {searchMutation.isLoading && <Loading className="py-3" />}
      {searchMutation.data && (
        <ScrollArea className="flex flex-col py-3">
          {searchMutation.data.items
            .filter((item) => item.type === "video")
            .map((item) => {
              return <ListItem item={item} />;
            })}
        </ScrollArea>
      )}
    </div>
  );
};

const ListItem = ({
  item,
}: {
  item: RouterOutputs["explore"]["searchByKeyword"]["items"][number];
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const utils = api.useUtils();
  const uploadMutation = api.song.upload.useMutation({
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Song has been uploaded",
      });
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
  });
  return (
    <li key={item.id} className="flex items-center justify-between gap-4 py-3">
      <div className="flex items-center gap-4">
        {item.thumbnail.thumbnails?.[0] && (
          <Image
            src={item.thumbnail.thumbnails[0].url}
            width={40}
            height={40}
            className="h-12 w-12 rounded-xl object-cover"
            alt={item.title}
          />
        )}
        <span>{item.title}</span>
      </div>
      <Button
        variant="outline"
        onClick={() => {
          uploadMutation.mutate({
            ytUrl: `https://www.youtube.com/watch?v=${item.id}`,
          });
        }}
      >
        {uploadMutation.isLoading ? "Loading..." : "Save to Library"}
      </Button>
    </li>
  );
};
