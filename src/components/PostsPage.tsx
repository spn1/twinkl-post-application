import { useState } from "react";

import { PostList } from "@/components/PostList";
import { useGetPosts } from "@/hooks/useGetPosts";

const PostsPage = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const result = useGetPosts(searchQuery);

  console.log("[PostsPage] result:", result);
  const { isFetching, isError, data } = result;

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
          role="search"
          onChange={(e) => setSearchQuery(e?.target?.value)}
        />
      </div>
      <div className="p-2 overflow-auto">
        <PostList posts={data?.data} isLoading={isFetching} />
      </div>
    </>
  );
};

export { PostsPage };
