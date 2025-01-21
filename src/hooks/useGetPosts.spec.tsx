import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { useGetPosts } from "./useGetPosts";
import { fetchPosts } from "../services/post-service";

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
  test("fires query function when used", async () => {
    renderHook(() => useGetPosts("test"), { wrapper });

    await waitFor(() => expect(fetchPosts).toHaveBeenCalledWith("test"));
  });
});
