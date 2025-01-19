import { POSTS_API_URL } from "@/constants";
import type { Post } from "@/types/post";

const fetchPosts = async (searchQuery: string): Post[] => {
  // Simulate Latency
  await setTimeout(() => {}, 1000);

  const url = searchQuery.length
    ? `${POSTS_API_URL}?title=${searchQuery}`
    : POSTS_API_URL;

  const response = await fetch(url);
  const data = response.json();
  return data;
};

export { fetchPosts };
