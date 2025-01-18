import type { Post } from "@/types/post";

import {
  MAX_POST_ITEM_TITLE_LENGTH,
  MAX_POST_ITEM_DESCRIPTION_LENGTH,
} from "@/constants";

type PostListProps = {
  posts: Post[];
};

type PostItemProps = {
  post: Post;
};

const PostItem = ({ post }: PostItemProps) => {
  const { title, body } = post;
  return (
    <div className="flex justify-between gap-4 py-2 border-b-2 border-white border-solid">
      <div>
        <p className="text-xl line-clamp-1">
          {title}
          {/* {title?.substring(0, MAX_POST_ITEM_TITLE_LENGTH)} */}
        </p>
        <p className="text-base line-clamp-1">
          {body}
          {/* {body?.substring(0, MAX_POST_ITEM_DESCRIPTION_LENGTH)} */}
        </p>
      </div>
      <button>delete</button>
    </div>
  );
};

const PostList = ({ posts = [] }: PostListProps) => {
  if (posts?.length === 0) {
    return <p>No Posts</p>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostItem key={`${post?.userId}-${post?.id}`} post={post} />
      ))}
    </ul>
  );
};

export { PostList };
