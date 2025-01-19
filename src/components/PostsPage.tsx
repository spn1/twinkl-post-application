import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { PostList } from "@/components/PostList";
import { fetchPosts } from "@/services/post-service";

const PostsPage = () => {
  //TODO: Change default to be from query string param
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["posts", searchQuery],
    queryFn: () => fetchPosts(searchQuery),
    initialData: [],
  });

  if (isError) {
    return <p>Error! {JSON.stringify(error, null, 4)}</p>;
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
