"use client";

import { useState } from "react";
import { Loading } from "~/app/_components/Loading";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { api } from "~/trpc/react";

export const Search = () => {
  const searchMutation = api.explore.searchByKeyword.useMutation();
  const [keyword, setKeyword] = useState("");

  return (
    <div className="p-4">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          searchMutation.mutate({
            keyword,
          });
        }}
      >
        <Input
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
      {searchMutation.isLoading && <Loading className="py-3" />}
      {searchMutation.data && (
        <ul className="p-3">
          {searchMutation.data.items
            .filter((item) => item.type === "video")
            .map((item) => {
              return (
                <li key={item.id}>
                  <a
                    className="text-blue-500 underline"
                    href={`https://www.youtube.com/watch?v=${item.id}`}
                  >
                    {item.title}
                  </a>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
};
