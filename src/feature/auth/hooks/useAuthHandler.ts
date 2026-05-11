import { useContext } from "react";
import { AuthHandlerContext } from "../context/auth.Context.tsx";
export const useAuthHandler = () => {
  const { loginHandler, profileHandler, registerHandler } =
    useContext(AuthHandlerContext);
  return { loginHandler, profileHandler, registerHandler } as const;
};
