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
const mockJsonFunction = vi.fn(async () => mockPosts);
const mockFetch = vi.fn(() => ({
  status: 200,
  ok: true,
  json: mockJsonFunction,
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

    expect(mockFetch).toHaveBeenCalledWith(`${POSTS_API_URL}/posts`);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test("fetches specific posts from API with a search query", async () => {
    await fetchPosts("test");

    expect(mockFetch).toHaveBeenCalledWith(`${POSTS_API_URL}/posts?title=test`);
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  test("fetches and returns posts from API response", async () => {
    const data = await fetchPosts("");

    expect(mockFetch).toHaveBeenCalledWith(`${POSTS_API_URL}/posts`);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(data).toEqual(mockPosts);
  });

  test("throws error when api returns non-ok response", async () => {
    mockFetch.mockClear();
    mockFetch.mockImplementationOnce(() => ({
      status: 400,
      ok: false,
      json: mockJsonFunction,
    }));

    await expect(fetchPosts("")).rejects.toThrowError("Failed to fetch posts");
    expect(mockFetch).toHaveBeenCalledWith(`${POSTS_API_URL}/posts`);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockJsonFunction).toHaveBeenCalledTimes(0);
  });
});

describe("deletePost", () => {
  beforeEach(() => {
    global.fetch = mockFetch;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  test("deletes post by ID", async () => {
    const { status } = await deletePost(1);

    expect(mockFetch).toHaveBeenCalledWith(`${POSTS_API_URL}/posts/1`, {
      method: "DELETE",
    });
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(status).toBe(200);
  });

  test("doesn't delete post when ID not passed", async () => {
    const { status } = await deletePost();

    expect(mockFetch).not.toHaveBeenCalledWith(`${POSTS_API_URL}/posts/`, {
      method: "DELETE",
    });
    expect(mockFetch).toHaveBeenCalledTimes(0);
    expect(status).toBe(400);
  });

  test("throws error when api returns non-ok response", async () => {
    mockFetch.mockClear();
    mockFetch.mockImplementationOnce(() => ({
      status: 400,
      ok: false,
      json: mockJsonFunction,
    }));

    await expect(deletePost(1)).rejects.toThrowError("Failed to delete post");
    expect(mockFetch).toHaveBeenCalledWith(`${POSTS_API_URL}/posts/1`, {
      method: "DELETE",
    });
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
});
