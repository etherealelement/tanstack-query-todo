import { TodoList } from "../features/todo-list/ui/todo-list.tsx";
import { useUser } from "../features/auth/_model/use-user.ts";
import { Login } from "../features/auth/ui/login.tsx";

export function App() {
  const { isLoading, data } = useUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data) {
    return <TodoList />;
  }

  return <Login />;
}
