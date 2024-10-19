import { useTodoList } from "../_model/use-todo-list.tsx";

export function TodoList() {
  const { cursor, error, isLoading, todoItems } = useTodoList();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-10">
      <h1 className="mb-5">Todo List</h1>
      <ul
        className={"flex flex-col gap-4" + (isLoading ? "animate-pulse" : "")}
      >
        {todoItems?.map(todo => (
          <li
            className="decoration-0 border border-blue-500 rounded p-3"
            key={todo.id}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      {cursor}
    </div>
  );
}
