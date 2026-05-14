import { createContext, use, useEffect, useState, type ReactNode } from "react";
import type { AuthContextType, UserResponseType } from "@auth/types/context.types";
import { useNavigate } from "react-router-dom";
import { getMe } from "@auth/services/auth.api";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserResponseType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  useEffect(() => {
    const getProfile = async ()=>{
      try {
        const res = await getMe()
        setUser(res.data)
        navigate("/")
      } catch (error) {
        navigate("/login")
      }
    }
    getProfile()
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
