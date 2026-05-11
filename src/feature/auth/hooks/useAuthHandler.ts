import { useContext } from "react";
import { AuthHandlerContext } from "../context/auth.Context";

export const useAuthHandler = () => {
  const context = useContext(AuthHandlerContext);

  if (!context) {
    throw new Error(
      "useAuthHandler must be used within AuthContextProvider"
    );
  }

  return context;
};
