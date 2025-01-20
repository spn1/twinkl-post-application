import { POSTS_API_URL } from "@/constants";
import type { Post } from "@/types/post";

const fetchPosts = async (searchQuery: string): Promise<Post[]> => {
  const url = searchQuery.length
    ? `${POSTS_API_URL}/posts?title=${searchQuery}`
    : `${POSTS_API_URL}/posts`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await response.json();

  return data;
};

const deletePost = async (postId: number): Promise<{ status: number }> => {
  if (!postId) {
    return { status: 400 };
  }

  const url = `${POSTS_API_URL}/posts/${postId}`;

  const response = await fetch(url, { method: "DELETE" });

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }

  return { status: response?.status };
};

export { fetchPosts, deletePost };
