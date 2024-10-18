import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "../api";
import { useState } from "react";

export function TodoList() {
  const [page, setPage] = useState(1);

  const { data: todoItems, error, isPending } = useQuery({
    queryKey: ["tasks", "slist", { page }],
    queryFn: meta => todoListApi.getTodoList({ page }, meta)
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Esrror</div>;
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px] mt-10">
      <h1 className="mb-5">Todo List</h1>
      <ul className="flex flex-col gap-4">
        {todoItems?.data.map(todo => (
          <li
            className="decoration-0 border border-blue-500 rounded p-3"
            key={todo.id}
          >
            {todo.text}
          </li>
        ))}
      </ul>
      <div className="flex gap-2 items-center mt-4">
        <button
          onClick={() => setPage(prev => Math.max(prev - 1, 0))}
          className="p-3 rounded border border-blue-500 bg-blue-500"
        >
          prev
        </button>
        <button
          onClick={() => setPage(prev => Math.min(prev + 1, todoItems.pages))}
          className="p-3 rounded border border-blue-500 bg-blue-500"
        >
          next
        </button>
      </div>
    </div>
  );
}
