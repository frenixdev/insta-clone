import { createContext, useEffect, useState, type ReactNode } from "react";
import { getMe, loginUser, registerUser } from "../services/auth.api";

import type { LoginUserType, RegisterType } from "../types/auth.types";
import {
  type AuthContextType,
  type AuthHandlerContextType,
  type UserResponseType,
} from "../types/context.types";
import { getErrMsg } from "@/utils/getErrorMessage";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | null>(null);
const AuthHandlerContext = createContext<AuthHandlerContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const loginHandler = async ({ password, username }: LoginUserType) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await loginUser({ password, username });
      setUser(res.data.data);
      navigate("/");
    } catch (error) {
      setError(getErrMsg(error));
    } finally {
      setIsLoading(false);
    }
  };
  const registerHandler = async ({
    email,
    password,
    username,
  }: RegisterType) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await registerUser({ username, email, password });
      setUser(res.data.data);
      navigate("/");
    } catch (error) {
      setError(getErrMsg(error));
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };
  const profileHandler = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const res = await getMe();
      setUser(res.data.data);
      navigate("/");
    } catch (error) {
      setError(getErrMsg(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await profileHandler();
    })();
  });

  const contextValue = { user, isLoading, error };
  const handlerValue = { loginHandler, registerHandler, profileHandler };
  return (
    <AuthContext.Provider value={contextValue}>
      <AuthHandlerContext.Provider value={handlerValue}>
        {children}
      </AuthHandlerContext.Provider>
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthHandlerContext };
export default AuthContextProvider;
