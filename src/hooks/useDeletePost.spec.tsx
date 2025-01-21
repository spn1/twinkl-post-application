import { act } from "react";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useDeletePost } from "./useDeletePost";
import { deletePost } from "../services/post-service";

vi.mock("../services/post-service");

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("useGetPosts", () => {
  test("fires delete function when used", async () => {
    const { result } = renderHook(() => useDeletePost(), { wrapper });

    await act(async () => result.current.mutateAsync(1));
    await waitFor(() => result.current.isSuccess);

    expect(deletePost).toHaveBeenCalledWith(1);
  });
});
