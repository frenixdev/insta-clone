import type { Dispatch, SetStateAction } from "react";
import type { LoginUserType, RegisterType } from "./auth.types";

export interface UserResponseType {
  _id: string;
  name: string;
  email: string;
  username: string;
  profileImg: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
}
export interface AuthResponseType{
  success: boolean,
  message: string;
  data: UserResponseType;
}
export type AuthContextType = {
  user: UserResponseType | null;
  isLoading: boolean;
  error: string | null;

  setUser: Dispatch<SetStateAction<UserResponseType | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<string | null>>;
};
export interface AuthHandlerContextType {
  loginHandler: (data: LoginUserType) => Promise<void>;
  registerHandler: (
    data: RegisterType
  ) => Promise<void>;
  profileHandler: () => Promise<void>;
}
