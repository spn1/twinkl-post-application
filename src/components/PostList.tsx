import type { Post } from "@/types/post";
type PostListProps = {
  posts: Post[];
};

type PostItemProps = {
  post: Post;
};

const PostItem = ({ post }: PostItemProps) => {
  const { title, body } = post;
  return (
    <div className="flex justify-between gap-4 py-2 border-b-2 border-grey border-solid">
      <div>
        <p className="text-xl line-clamp-1">{title}</p>
        <p className="text-base line-clamp-1">{body}</p>
      </div>
      <button>delete</button>
    </div>
  );
};

const PostList = ({ posts = [] }: PostListProps) => {
  if (posts?.length === 0) {
    return <p>No Posts found with that title</p>;
  }

  return (
    <div className="overflow-auto pr-2">
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <PostItem key={`${post?.userId}-${post?.id}`} post={post} />
        ))}
      </ul>
    </div>
  );
};

export { PostList };
