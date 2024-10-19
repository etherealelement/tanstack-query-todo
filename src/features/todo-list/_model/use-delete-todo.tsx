import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "../api";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    async onSettled() {
      queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey]
      });
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

  const isLoadDelete = (id: string) =>
    deleteTodoMutation.isPending && deleteTodoMutation.variables === id;

  const variables = deleteTodoMutation.variables;

  const handleDelete = (id: string) => {
    deleteTodoMutation.mutate(id);
  };

  return {
    variables,
    isLoadDelete,
    handleDelete
  };
}
