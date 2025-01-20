import { vi, test, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PostListItem } from "./PostListItem";
import { deletePost } from "@/services/post-service";
import { Post } from "@/types/post";

vi.mock("@/services/post-service");

const mockPost = {
  userId: 1,
  id: 1,
  title: "TEST POST",
  body: "TEST BODY",
};

const renderComponent = (props: { post: Post }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <PostListItem {...props} />
    </QueryClientProvider>
  );
};

describe("PostListItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders post with data as expected", () => {
    renderComponent({ post: mockPost });

    const title = screen.getByText("TEST POST");
    const body = screen.getByText("TEST BODY");
    const deleteButton = screen.getByTestId("remove-button-1");

    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test("sends delete request when button is clicked", async () => {
    renderComponent({ post: mockPost });

    const deleteButton = screen.getByTestId("remove-button-1");

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deletePost).toHaveBeenCalled();
    });
  });

  test.skip("doesn't send delete request when button is clicked while disabled", async () => {
    renderComponent({ post: mockPost });

    const deleteButton = screen.getByTestId("remove-button-1");

    fireEvent.click(deleteButton);

    await waitFor(() => {
      // Not sure how to test intermittent disabled state
      // expect(deleteButton).toHaveAttribute("disabled", true);
      expect(deletePost).not.toHaveBeenCalled();
    });
  });
});
