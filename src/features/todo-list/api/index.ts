import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

const BASE_URL = "http://localhost:3000";

export type PaginatedDto<T> = {
  data: T[];
  prev: number | null;
  pages: number;
  first: number;
  items: number;
  last: number;
  next: number | null;
};

export type TodoDto = {
  id: string;
  text: string;
  done: boolean;
};

export const todoListApi = {
  getTodoList: async (
    { page }: { page: number },
    {
      signal
    }: {
      signal: AbortSignal;
    }
  ): Promise<PaginatedDto<TodoDto>> => {
    const response = await fetch(
      `${BASE_URL}/tasks?_page=${page}&per_page=10`,
      {
        signal
      }
    );
    return await response.json();
  },

  getTodoListQueryOptions: ({ page }: { page: number }) => {
    return queryOptions({
      queryKey: ["tasks", "list", { page }],
      queryFn: meta => todoListApi.getTodoList({ page }, meta)
    });
  },

  getTodoListInfiniteQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ["tasks", "list"],
      queryFn: meta => todoListApi.getTodoList({ page: 1 }, meta),
      initialPageParam: 1,
      getNextPageParam: result => result.next,
      select: result => result.pages.flatMap(page => page.data)
    });
  }
};
