import { vi, test, expect } from "vitest";

import { fetchPosts, deletePost } from "./post-service";
import { POSTS_API_URL } from "@/constants";

const mockPosts = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
];

const originalFetch = global.fetch;
const mockFetch = vi.fn(() => ({
  json: async () => mockPosts,
}));

describe("fetchPosts", () => {
  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  test("fetches all posts from API without a search query", async () => {
    await fetchPosts("");

    expect(mockFetch).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledWith(`${POSTS_API_URL}/posts`);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test("fetches specific posts from API with a search query", async () => {
    await fetchPosts("test");

    expect(mockFetch).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledWith(`${POSTS_API_URL}/posts?title=test`);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test("fetches and returns posts from API response", async () => {
    const data = await fetchPosts("");

    expect(mockFetch).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledWith(`${POSTS_API_URL}/posts`);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(data).toEqual(mockPosts);
  });
});
