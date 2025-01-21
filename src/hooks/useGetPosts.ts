import { useQuery } from "@tanstack/react-query";

import { fetchPosts } from "@/services/post-service";

const useGetPosts = (searchQuery: string) => {
  // Would be good to add debouncing to fetchPosts
  return useQuery({
    queryKey: ["posts", searchQuery],
    queryFn: () => fetchPosts(searchQuery),
    initialData: { data: [] },
  });
};

export { useGetPosts };
