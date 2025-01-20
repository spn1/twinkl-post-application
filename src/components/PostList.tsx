import type { Post } from "@/types/post";
import { PostListItem } from "@/components/PostListItem";

type PostListProps = {
  posts: Post[];
  isLoading: boolean;
};

const PostList = ({ posts = [], isLoading }: PostListProps) => {
  if (isLoading) {
    return <p className="text-2xl text-center my-16">Loading...</p>;
  }

  if (posts?.length === 0) {
    return (
      <p className="text-2xl text-center my-16">
        No Posts found with that title
      </p>
    );
  }

  return (
    <div className="overflow-auto pr-2">
      <ul className="flex flex-col gap-4">
        {posts?.map((post) => (
          <PostListItem key={`${post?.userId}-${post?.id}`} post={post} />
        ))}
      </ul>
    </div>
  );
};

export { PostList };
