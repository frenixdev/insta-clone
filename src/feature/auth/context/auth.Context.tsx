import { createContext, use, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType, UserResponseType } from "../types/context.types";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/auth.api";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const profile = async () => {
    try {
      const res = await getMe();
      if (res) setUser(res.data.data);
    } catch (error) {
      console.log(error);
      navigate("/login");
    }
  };
  useEffect(() => {
    (async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      await profile();
      navigate("/");
    })();
  }, []);

  const contextValue = {
    user,
    isLoading,
    error,
    setIsLoading,
    setUser,
    setError,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuthContext = ()=>{
  const context = use(AuthContext)
  if (!context) throw new Error("Please wrap with context provider")
  return context;
}

export { useAuthContext };
export default AuthContextProvider;
