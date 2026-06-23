import { api } from "@/shared/lib/axios";
import type { AuthResponseType, LoginUserType, RegisterType } from "../types";

export const registerUser = async ({
  email,
  password,
  username,
}: RegisterType): Promise<AuthResponseType> => {
  const res = await api.post("/auth/register", {
    email,
    password,
    username,
  });
  return res.data;
};

export const loginUser = async ({
  password,
  username,
}: LoginUserType): Promise<AuthResponseType> => {
  const res = await api.post("/auth/login", { password, username });
  return res.data;
};

export const getMe = async (): Promise<AuthResponseType> => {
  const res = await api.get("/auth/getMe");
  return res.data;
};

export const logoutUser = async (): Promise<AuthResponseType> => {
  const res = await api.post("/auth/logout");
  return res.data;
};
