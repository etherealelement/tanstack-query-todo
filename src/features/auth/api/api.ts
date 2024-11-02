import { queryOptions } from "@tanstack/react-query";
import { jsonApiInstance } from "../../../shared/api/api-instance.ts";
import { UserDto } from "../_domain";

export const authApi = {
  baseKey: "users",

  getUserById: (id: string) => {
    return queryOptions({
      queryKey: [authApi.baseKey, "byId", id],
      queryFn: meta =>
        jsonApiInstance<UserDto>(`/users/${id}`, {
          signal: meta.signal
        })
    });
  },

  loginUser: ({ login, password }: { login: string; password: string }) => {
    return jsonApiInstance<UserDto[]>(
      `/users?login=${login}&password=${password}`
    ).then(r => r[0] as UserDto | undefined);
  }
};