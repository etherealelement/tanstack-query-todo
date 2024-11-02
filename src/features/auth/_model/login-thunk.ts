import { AppThunk } from "../../../shared/redux.ts";
import { MutationObserver, useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../shared/api/query-client.ts";
import { authApi } from "../api/api.ts";
import { authSlice } from "./auth.slice.ts";

export const loginThunk = (
  login: string,
  password: string
): AppThunk => async dispatch => {
  try {
    const mutationResult = await new MutationObserver(queryClient, {
      mutationKey: ["login"],
      mutationFn: authApi.loginUser
    }).mutate({
      login,
      password
    });

    if (mutationResult) {
      dispatch(
        authSlice.actions.addUser({
          userId: mutationResult.id
        })
      );
      localStorage.setItem("userId", mutationResult.id);
    }
  } catch (e) {
    dispatch(authSlice.actions.setError({ error: `ERROR:${e}` }));
  }
};

export const useLoginLoading = () =>
  useMutation({ mutationKey: ["login"] }).isPending;
