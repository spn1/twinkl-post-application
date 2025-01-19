import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { PostList } from "@/components/PostList";
import { fetchPosts } from "@/services/post-service";

const PostsPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isLoading, isError, data } = useQuery({
    queryKey: ["posts", searchQuery],
    queryFn: () => fetchPosts(searchQuery),
    initialData: [],
  });

  if (isError) {
    return <p>Error!</p>;
  }

  return (
    <>
      <input
        className="w-full md:w-80 md:mx-auto p-2 md:mb-16 bg-gray-200 text-2xl font-semibold"
        placeholder="Search"
        role="searchbox"
        onChange={(e) => setSearchQuery(e?.target?.value)}
      />
      <PostList posts={data} isLoading={isLoading} />
    </>
  );
};

export { PostsPage };
