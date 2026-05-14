import {  useNavigate } from "react-router-dom";
import { loginUser, logoutUser, registerUser } from "../services/auth.api";
import type { LoginUserType, RegisterType } from "../types/auth.types";
import { useAuthContext } from "./auth.Context";

export function useAuth() {
  const { error, isLoading, user, setError, setIsLoading, setUser } =
    useAuthContext();
  const navigate = useNavigate();

  const register = async ({ email, password, username }: RegisterType) => {
    if (!email || !password || !username) return;
    try {
      setIsLoading(true);
      const res = await registerUser({ email, password, username });
      setUser(res.data);
      navigate("/");
    } catch (error) {
      setError("error occured");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async ({ username, password }: LoginUserType) => {
    if (!password || !username) return;
    try {
      setIsLoading(true);
      const res = await loginUser({ password, username });
      setUser(res.data);
      navigate("/");
    } catch (error) {
      setError("error occured");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  const logout = async()=>{
    try {
      console.log("hello")
      await logoutUser()
      setUser(null)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return { error, isLoading, user, register, login , logout} as const;
}
