import { vi, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PostsPage } from "./PostsPage";
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

const renderComponent = (posts: Post[], isError: boolean) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <PostsPage />
    </QueryClientProvider>
  );
};

describe("PostListItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders page", () => {
    renderComponent(mockPosts, false);

    const searchInputElement = screen.getByRole("searchbox");

    expect(searchInputElement).toBeInTheDocument();
  });

  test("renders error message when there is an error", () => {
    renderComponent(mockPosts, true);

    const searchInputElement = screen.getByRole("searchbox");
    const errorTextElement = screen.getByText(
      "Sorry, there was a problem fetching your posts."
    );

    expect(searchInputElement).toBeInTheDocument();
    expect(errorTextElement).toBeInTheDocument();
  });

  // test.each(mockPosts)(
  //   "renders post with %s and %s as expected",
  //   ({ title, body, id }) => {
  //     renderComponent(mockPosts, false);

  //     const titleElement = screen.getByText(title);
  //     const bodyelement = screen.getByText(body);
  //     const deleteButton = screen.getByTestId(`remove-button-${id}`);

  //     expect(titleElement).toBeInTheDocument();
  //     expect(bodyelement).toBeInTheDocument();
  //     expect(deleteButton).toBeInTheDocument();
  //   }
  // );
});
