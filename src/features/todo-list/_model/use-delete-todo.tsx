import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "../api";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    onSettled: async () => {
      return await queryClient.invalidateQueries(
        todoListApi.getTodoListQueryOptions()
      );
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
