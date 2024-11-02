export type UserDto = {
  id: string;
  login: string;
  password: string;
};

export type AuthState = {
  userId: string | undefined;
  loginError?: string;
};
