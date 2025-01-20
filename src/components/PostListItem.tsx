import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { Post } from "@/types/post";
import { deletePost } from "@/services/post-service";

type PostItemProps = {
  post: Post;
};

const PostListItem = ({ post }: PostItemProps) => {
  const { title, body, id } = post;
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <li className="flex justify-between gap-4 py-2 border-b-2 border-grey border-solid">
      <div className="basis-2/3">
        <p className="text-xl line-clamp-1">{title}</p>
        <p className="text-base line-clamp-1">{body}</p>
      </div>
      <button
        className="basis-1/3 rounded-md border-2 text-white bg-rose-600 disabled:bg-gray-600"
        onClick={() => mutate(id)}
        role="button"
        aria-label={`remove post ${title}`}
        disabled={isPending}
        data-testid={`remove-button-${id}`}
      >
        Remove
      </button>
    </li>
  );
};

export { PostListItem };
