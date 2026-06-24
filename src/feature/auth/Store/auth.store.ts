import { create } from "zustand";
import * as services from "../services/auth.api";
import * as AuthTypes from "../types";
import axios from "axios";

interface AuthStoreType {
  user: AuthTypes.UserResponseType | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  errors: Record<string, string> | null;
  clearError: (name: string) => void;
  clearErrors: () => void;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  login: (data: AuthTypes.LoginUserType) => Promise<boolean | undefined>;
  register: (data: AuthTypes.RegisterType) => Promise<void>;
}

const useAuthStore = create(
  (set): AuthStoreType => ({
    user: null,
    isLoading: false,
    isCheckingAuth: true,
    errors: null,

    clearError: (name) => {
      set((state) => {
        const newErr = { ...state.errors };
        delete newErr[name];
        return {
          errors: newErr,
        };
      });
    },
    clearErrors: () => set({ errors: null }),

    login: async (data) => {
      const validationErr: Record<string, string> = {};
      for (const key in data) {
        const value = data[key as keyof AuthTypes.LoginUserType];
        if (!value.trim()) validationErr[key] = `${key} is required`;
      }
      if (Object.keys(validationErr).length) {
        set({ errors: validationErr });
        return;
      }
      try {
        set({ isLoading: true, errors: null });
        const { username, password } = data;
        const res = await services.loginUser({ username, password });
        set({ user: res.data });
        return true;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          set({ errors: err.response?.data?.errors || {} });
        }
        return false;
      } finally {
        set({ isLoading: false });
      }
    },
    register: async (data) => {
      let validationErr: Record<string, string> = {};
      for (const key in data) {
        const value = data[key as keyof AuthTypes.RegisterType];
        if (!value.trim()) validationErr[key] = key + " is required";
      }
      // if (!Object.keys(validationErr).length) {
      //   set({ errors: validationErr });
      //   return;
      // }
      try {
        set({ isLoading: true, errors: null });
        const { username, password, email } = data;
        const res = await services.registerUser({ email, password, username });
        set({ user: res.data });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          set({ errors: err.response?.data?.errors || {} });
        }
      } finally {
        set({ isLoading: false });
      }
    },

    checkAuth: async () => {
      try {
        const user = await services.getMe();
        set({ user: user.data });
      } catch (error) {
        set({ user: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    },

    logout: async () => {
      try {
        set({ isLoading: true });
        await services.logoutUser();
        set({
          user: null,
        });
      } catch (error) {
        console.log(error);
      } finally {
        set({ isLoading: false });
      }
    },
  }),
);

export default useAuthStore;
