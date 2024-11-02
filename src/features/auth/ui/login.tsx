import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../shared/redux.ts";
import { loginThunk, useLoginLoading } from "../_model/login-thunk.ts";
import { authSlice } from "../_model/auth.slice.ts";

export function Login() {
  const dispatch = useAppDispatch();
  const loginError = useAppSelector(authSlice.selectors.loginError);
  const isLoading = useLoginLoading();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    dispatch(
      loginThunk(
        formData.get("login")?.toString() ?? "",
        formData.get("password")?.toString() ?? ""
      )
    );
  };

  return (
    <div className="p-5 border rounded-lg container mx-autos mt-10 ">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <h1 className="text-bold text-xl">Login</h1>
        <input
          className="p-5 rounded border border-slate-500"
          name="login"
          placeholder="login"
        />
        <input
          className="p-5 rounded border border-slate-500"
          name="password"
          placeholder="password"
        />
        {loginError && (
          <div className="text-red-500 text-center">{loginError}</div>
        )}
        <button
          disabled={isLoading}
          className="p-5 rounded bg-blue-500 text-white disabled:bg-slate-300"
        >
          Login
        </button>
      </form>
    </div>
  );
}
