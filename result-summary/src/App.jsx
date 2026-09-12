import { QueryCache, QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import AppRouter from "./AppRouter";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: ({ response }) => {
      if (response?.status === 401) {
        window.location.href = "/";
      }
    },
  }),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <AppRouter />
    </QueryClientProvider>
  );
}

export default App;
