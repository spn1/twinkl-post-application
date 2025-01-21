import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deletePost } from "@/services/post-service";
import type { Post } from "@/types/post";

const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onMutate: async (deletedPostId: number) => {
      // This onMutate should optimistically update the query to remove the deleted post,
      // but it doesn't seem to work correctly
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts: Post[] = queryClient.getQueryData(["posts"]);

      queryClient.setQueryData(["posts"], (previous: Post[]) =>
        previous.filter((post) => post.id !== deletedPostId)
      );

      return { previousPosts };
    },
  });
};

export { useDeletePost };
