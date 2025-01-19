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
  });

  console.log("[PostsPage] searchQuery:", searchQuery);

  if (isError) {
    return <p>Error! {JSON.stringify(error, null, 4)}</p>;
  }

  return (
    <>
      <input
        className="w-full md:w-80 p-2 bg-gray-200"
        placeholder="Search"
        onChange={(e) => setSearchQuery(e?.target?.value)}
      />
      <div className="overflow-auto">
        <PostList posts={data} />
      </div>
    </>
  );
};

export { PostsPage };
