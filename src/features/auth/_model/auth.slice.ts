import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "../../../shared/redux.ts";
import { AuthState } from "../_domain/index.ts";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loginError: undefined,
    userId: localStorage.getItem("userId")
  } as AuthState,
  selectors: {
    userId: (state: AuthState) => state.userId,
    loginError: (state: AuthState) => state.loginError
  },
  reducers: {
    addUser(state, action: PayloadAction<{ userId: string }>) {
      state.userId = action.payload.userId;
      state.loginError = undefined;
    },
    removeUser(state, action: PayloadAction<{ userId: string }>) {
      state.userId = undefined;
    },
    setError(state, action: PayloadAction<{ error: string | undefined }>) {
      state.loginError = action.payload.error;
    }
  }
}).injectInto(rootReducer);
