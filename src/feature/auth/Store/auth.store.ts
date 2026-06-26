import { create } from "zustand";
import * as services from "../services/auth.api";
import * as AuthTypes from "../types";
import axios from "axios";

interface AuthStoreType {
  user: AuthTypes.UserResponseType | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  validationErrors: Record<string, string> | null;
  error: string | null;
  clearValidationError: (name: string) => void;
  clearAllErrors: () => void;
  clearError: () => void;
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
    validationErrors: null,
    error: null,
    clearValidationError: (name) => {
      set((state) => {
        const newErr = { ...state.validationErrors };
        delete newErr[name];
        return {
          ...state,
          validationErrors: newErr,
        };
      });
    },
    clearAllErrors: () => set({ error: null, validationErrors: null }),
    clearError: () => set({ error: null }),
    login: async (data) => {
      const validationErr: Record<string, string> = {};
      for (const key in data) {
        const value = data[key as keyof AuthTypes.LoginUserType];
        if (!value.trim()) validationErr[key] = `${key} is required`;
      }
      if (Object.keys(validationErr).length) {
        set({ validationErrors: validationErr });
        return;
      }
      try {
        set({ isLoading: true, validationErrors: null });
        const { username, password } = data;
        const res = await services.loginUser({ username, password });
        set({ user: res.data });
        return true;
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const data = err?.response?.data;
          if (data?.errors) {
            set({ validationErrors: data?.errors || {}, error: null });
          } else {
            set({
              error: data?.message ?? "Something went wrong",
              validationErrors: null,
            });
          }
        }
        return false;
      } finally {
        set({ isLoading: false });
      }
    },
    register: async (data) => {
      let validationErr: Record<string, string> = {};
      for (const key in data) {
        const value = data[key as keyof AuthTypes.LoginUserType];
        if (!value.trim()) validationErr[key] = `${key} is required`;
      }
      if (Object.keys(validationErr).length) {
        set({ validationErrors: validationErr });
        return;
      }
      try {
        set({ isLoading: true, validationErrors: null });
        const { username, password, email } = data;
        const res = await services.registerUser({ email, password, username });
        set({ user: res.data });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          const data = err?.response?.data;
          if (data?.errors) {
            set({ validationErrors: data?.errors || {}, error: null });
          } else {
            set({
              error: data?.message ?? "Something went wrong",
              validationErrors: null,
            });
          }
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
