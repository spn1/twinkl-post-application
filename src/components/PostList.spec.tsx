import { vi, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PostList } from "./PostList";
import { Post } from "@/types/post";

const mockPosts = [
  {
    userId: 1,
    id: 1,
    title: "TEST POST 1",
    body: "TEST BODY 1",
  },
  {
    userId: 2,
    id: 2,
    title: "TEST POST 2",
    body: "TEST BODY 2",
  },
];

const renderComponent = (posts: Post[], isLoading: boolean) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <PostList posts={posts} isLoading={isLoading} />
    </QueryClientProvider>
  );
};

describe("PostListItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test.each(mockPosts)(
    "renders post with %s and %s as expected",
    ({ title, body, id }) => {
      renderComponent(mockPosts, false);

      const titleElement = screen.getByText(title);
      const bodyelement = screen.getByText(body);
      const deleteButton = screen.getByTestId(`remove-button-${id}`);

      expect(titleElement).toBeInTheDocument();
      expect(bodyelement).toBeInTheDocument();
      expect(deleteButton).toBeInTheDocument();
    }
  );

  test("renders loading state", async () => {
    renderComponent(mockPosts, true);

    const loadingElement = screen.getByText(/Loading.../);

    expect(loadingElement).toBeInTheDocument();
  });

  test("renders state where posts list is empty", async () => {
    renderComponent([], false);

    const noPostsElement = screen.getByText("No Posts found with that title");

    expect(noPostsElement).toBeInTheDocument();
  });
});
