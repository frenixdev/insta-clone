import axios from "axios";
import type { LoginUserType, RegisterType } from "../types/auth.types";
import type { AuthResponseType } from "../types/context.types";

const authApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api/auth",
  withCredentials: true,
});

export const registerUser = async ({
  email,
  password,
  username,
}: RegisterType): Promise<AuthResponseType> => {
  const res = await authApi.post("/register", { email, password, username });
  return res.data;
};

export const loginUser = async ({
  password,
  username,
}: LoginUserType): Promise<AuthResponseType> => {
  const res = await authApi.post("/login", { password, username });
  return res.data;
};

export const getMe = async (): Promise<AuthResponseType> => {
  const res = await authApi.get("/getMe");
  return res.data;
};

export const logoutUser = async (): Promise<AuthResponseType>=>{
  const res = await authApi.post("/logout")
  return res.data
}
