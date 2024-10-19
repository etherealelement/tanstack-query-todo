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
  userId: string;
};

export type CreateTodo = (payload: TodoDto) => Promise<TodoDto>;
export type UpdateTodo = (
  id: string,
  payload: Partial<TodoDto>
) => Promise<TodoDto>;
export type DeleteTodo = (id: string) => Promise<unknown>;
