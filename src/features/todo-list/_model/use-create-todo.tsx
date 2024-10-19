import * as React from "react";
import { nanoid } from "nanoid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "../api";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
    onSettled: async () => {
      return await queryClient.invalidateQueries({
        queryKey: [todoListApi.baseKey]
      });
    }
  });

  const isLoadData = createTodoMutation.isPending;

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get("text");
    createTodoMutation.mutate({
      id: nanoid(),
      text: text as string,
      done: false,
      userId: "1"
    });
    e.currentTarget.reset();
  };

  return {
    handleCreate,
    isLoadData
  };
}
