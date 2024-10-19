import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "../api";

export function useTodoList() {
  const { data: todoItems, error, refetch, isLoading } = useQuery({
    ...todoListApi.getTodoListQueryOptions(),
    select: data => data.toReversed()
  });

  return {
    isLoading,
    refetch,
    todoItems,
    error
  };
}
