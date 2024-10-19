import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api/query-client.ts";
import { TodoList } from "../features/todo-list/ui/todo-list.tsx";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider } from "react-redux";
import { store } from "../shared/redux.ts";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <TodoList />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}
