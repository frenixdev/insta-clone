import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "./auth.Context";
import { loginUser, logoutUser, registerUser } from "@auth/services/auth.api";
import type { LoginUserType, RegisterType } from "@auth/types/auth.types";

export function useAuth() {
  const { error, isLoading, user, setError, setIsLoading, setUser } =
    useAuthContext();
  const navigate = useNavigate();

  const handlerAsync = async (cb: () => Promise<void>) => {
    try {
      setIsLoading(true);
      setError("");

      await cb();
    } catch (err) {
      console.log(err);
      if (err instanceof (Error || AxiosError)) {
        setError(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  const register = async ({ email, password, username }: RegisterType) => {
    if (!email || !password || !username) return;
    await handlerAsync(async () => {
      const res = await registerUser({ email, password, username });
      setUser(res.data);
      navigate("/");
    });
  };

  const login = async ({ username, password }: LoginUserType) => {
    if (!password || !username) return;
    await handlerAsync(async () => {
      const res = await loginUser({ password, username });
      setUser(res.data);
      navigate("/");
    });
  };
  const logout = async () => {
    await handlerAsync(async () => {
      await logoutUser();
      setUser(null);
      navigate("/login");
    });
  };

  return { error, isLoading, user, register, login, logout } as const;
}
