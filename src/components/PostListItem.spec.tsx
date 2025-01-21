import { vi, test, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import { PostListItem } from "./PostListItem";
import { Post } from "@/types/post";
import { useDeletePost } from "../hooks/useDeletePost";

vi.mock("../hooks/useDeletePost");
const mockMutate = vi.fn();

const mockPost = {
  userId: 1,
  id: 1,
  title: "TEST POST",
  body: "TEST BODY",
};

const renderComponent = (post: Post, isPending: boolean) => {
  useDeletePost.mockImplementation(() => ({
    mutate: mockMutate,
    isPending,
  }));

  return render(<PostListItem post={post} />);
};

describe("PostListItem", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders post with data as expected", () => {
    renderComponent(mockPost, false);

    const title = screen.getByText("TEST POST");
    const body = screen.getByText("TEST BODY");
    const deleteButton = screen.getByTestId("remove-button-1");

    expect(title).toBeInTheDocument();
    expect(body).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
  });

  test("sends delete request when button is clicked", async () => {
    renderComponent(mockPost, false);

    const deleteButton = screen.getByTestId("remove-button-1");

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });

  test.skip("doesn't send delete request when button is clicked while disabled", async () => {
    renderComponent(mockPost, false);

    const deleteButton = screen.getByTestId("remove-button-1");

    fireEvent.click(deleteButton);

    await waitFor(() => {
      // Not sure how to test intermittent disabled state
      // expect(deleteButton).toHaveAttribute("disabled", true);
      expect(mockMutate).not.toHaveBeenCalled();
    });
  });
});
