import { vi, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { PostsPage } from "./PostsPage";
import { Post } from "@/types/post";
import { useGetPosts } from "../hooks/useGetPosts";
import { useDeletePost } from "@/hooks/useDeletePost";

vi.mock("../hooks/useGetPosts");
vi.mock("../hooks/useDeletePost");

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

useDeletePost.mockImplementation(() => ({
  mutate: () => {},
  isPending: false,
}));

const renderComponent = (
  posts: Post[],
  isError: boolean,
  isFetching: boolean
) => {
  useGetPosts.mockImplementation((searchQuery: string) => ({
    isFetching,
    isError,
    data: { data: posts },
  }));
  return render(<PostsPage />);
};

describe("PostListItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders page", () => {
    renderComponent(mockPosts, false, false);

    const searchInputElement = screen.getByRole("search");

    expect(searchInputElement).toBeInTheDocument();
  });

  // test("renders error message when there is an error", () => {
  //   renderComponent(mockPosts, true, false);

  //   const searchInputElement = screen.getByRole("search");
  //   const errorTextElement = screen.getByText(
  //     "Sorry, there was a problem fetching your posts."
  //   );

  //   expect(searchInputElement).toBeInTheDocument();
  //   expect(errorTextElement).toBeInTheDocument();
  // });

  // test("renders loading message when data is loading", () => {
  //   renderComponent(mockPosts, false, true);

  //   const searchInputElement = screen.getByRole("search");
  //   const loadingTextElement = screen.getByText("Loading...");

  //   expect(searchInputElement).toBeInTheDocument();
  //   expect(loadingTextElement).toBeInTheDocument();
  // });
});
