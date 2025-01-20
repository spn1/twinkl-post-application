import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { PostList } from "@/components/PostList";
import { fetchPosts } from "@/services/post-service";

const PostsPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { isFetching, isError, data } = useQuery({
    queryKey: ["posts", searchQuery],
    queryFn: () => fetchPosts(searchQuery),
    initialData: [],
  });

  if (isError) {
    return (
      <p className="text-2xl text-center my-16">
        Sorry, there was a problem fetching your posts.
      </p>
    );
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
        <PostList posts={data} isLoading={isFetching} />
      </div>
    </>
  );
};

export { PostsPage };
