import { useTodoList } from "../_model/use-todo-list.tsx";
import { useCreateTodo } from "../_model/use-create-todo.tsx";
import { useDeleteTodo } from "../_model/use-delete-todo.tsx";

export function TodoList() {
  const { error, isLoading, todoItems } = useTodoList();
  const { handleCreate, isLoadData } = useCreateTodo();
  const { handleDelete } = useDeleteTodo();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-10">
      <h1 className="mb-5">Todo List</h1>
      <form className="flex hap-2 mb-5 gap-3" onSubmit={handleCreate}>
        <label>
          Add Todo:
          <input
            className="rounded p-2 border-blue-500"
            type="text"
            name="text"
          />
          <button
            disabled={isLoadData}
            className="rounded p-2 border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
          >
            Создать
          </button>
        </label>
      </form>
      <ul
        className={"flex flex-col gap-4" + (isLoading ? "animate-pulse" : "")}
      >
        {todoItems?.map(todo => (
          <li
            className="decoration-0 border border-blue-500 rounded p-3"
            key={todo.id}
          >
            {todo.text}
            <span
              onClick={() => handleDelete(todo.id)}
              className="ml-2 cursor-pointer text-red-500 hover:text-red-700 hover:underline underline-offset-2 decoration-0"
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
