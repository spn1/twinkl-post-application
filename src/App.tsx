import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PostsPage } from "@/components/PostsPage";
import "./styles/app.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="container mx-auto flex flex-col max-w-screen-md h-dvh">
        <PostsPage />
      </main>
    </QueryClientProvider>
  );
};

export default App;
