import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { PostsPage } from "@/components/PostsPage";
import "./styles/app.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="container mx-auto p-4 flex flex-col">
        <h1 className="text-4xl lg:text-8xl text-center">The Postbox</h1>
        <PostsPage />
      </main>
    </QueryClientProvider>
  );
};

export default App;
