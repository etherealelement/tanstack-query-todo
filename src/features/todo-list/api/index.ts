import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../../../shared/api/api-instance.ts";

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
  getTodoListQueryOptions: ({ page }: { page: number }) => {
    return queryOptions({
      queryKey: ["tasks", "list", { page }],
      queryFn: meta =>
        jsonApiInstance<PaginatedDto<TodoDto>>(
          `/tasks?_page=${page}&_per_page=10`,
          {
            signal: meta.signal
          }
        )
    });
  },

  getTodoListInfiniteQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ["tasks", "list"],
      queryFn: meta =>
        jsonApiInstance<PaginatedDto<TodoDto>>(
          `/tasks?_page=${meta.pageParam}&_per_page=10`,
          {
            signal: meta.signal
          }
        ),
      initialPageParam: 1,
      getNextPageParam: result => result.next,
      select: result => result.pages.flatMap(page => page.data)
    });
  }
};
