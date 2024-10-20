import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api/query-client.ts";
import { TodoList } from "../features/todo-list/ui/todo-list.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}
