import { use } from "react";
import { AuthContext, AuthHandlerContext } from "./auth.Context";

export function useAuth() {
  const context = use(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export function useAuthHandler() {
  const context = use(AuthHandlerContext);
  if (!context)
    throw new Error("useAuthHandler must be used within AuthProvider");
  return context;
}
