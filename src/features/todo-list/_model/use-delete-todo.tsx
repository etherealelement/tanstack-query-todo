import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "../api";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    async onSettled() {
      queryClient.invalidateQueries(todoListApi.getTodoListQueryOptions());
    },
    async onSuccess(_, deletedId) {
      const todos = queryClient.getQueryData(
        todoListApi.getTodoListQueryOptions().queryKey
      );
      if (todos) {
        queryClient.setQueryData(
          todoListApi.getTodoListQueryOptions().queryKey,
          todos.filter(todo => todo.id !== deletedId)
        );
      }
    }
  });

  const isLoadDelete = deleteTodoMutation.isPending;

  const handleDelete = (id: string) => {
    deleteTodoMutation.mutate(id);
  };

  return {
    isLoadDelete,
    handleDelete
  };
}
