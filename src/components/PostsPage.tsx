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
      <div className="bg-gray-300 w-full md:mb-16 md:bg-white flex">
        <input
          className=" bg-gray-200 text-2xl p-2 md:mx-auto mx-4 my-4 font-semibold w-full md:w-80"
          placeholder="Search"
          role="searchbox"
          onChange={(e) => setSearchQuery(e?.target?.value)}
        />
      </div>
      <div className="p-2 overflow-auto">
        <PostList posts={data} isLoading={isLoading} />
      </div>
    </>
  );
};

export { PostsPage };
