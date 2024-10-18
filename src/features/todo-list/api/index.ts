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
  }
};
