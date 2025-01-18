/** Would put in .env file in production application */
const POSTS_API_URL = "https://jsonplaceholder.typicode.com/posts";

const fetchPosts = async () => {
  const response = await fetch(POSTS_API_URL);
  const data = response.json();
  return data;
};

export { fetchPosts };
