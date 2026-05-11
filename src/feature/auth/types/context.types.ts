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
export interface AuthContextType {
  user: UserResponseType | null;
  isLoading: boolean;
  error: string | null;
}
export interface AuthHandlerContextType {
  loginHandler: (data: LoginUserType) => Promise<void>;
  registerHandler: ({email, password, username}: RegisterType) => Promise<void>;
  profileHandler: () => Promise<void>;
}
