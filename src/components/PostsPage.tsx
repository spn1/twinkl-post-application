import { useQuery } from "@tanstack/react-query";

import { PostList } from "@/components/PostList";
import { fetchPosts } from "@/services/post-service";

const PostsPage = () => {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error! {JSON.stringify(error, null, 4)}</p>;
  }

  console.log("[PostsPage] data:", data);

  return (
    <section>
      <PostList posts={data} />
    </section>
  );
};

export { PostsPage };
