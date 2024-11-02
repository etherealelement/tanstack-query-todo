import { TodoList } from "../features/todo-list/ui/todo-list.tsx";
import { useUser } from "../features/auth/_model/use-user.ts";

export function App() {
  const { isLoading, data } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // if (data) {
  //   return <TodoList />;
  // }

  return <TodoList />;
}
