import { api } from "@/shared/lib/axios";
export const verifyOtp = async (email: string, otp: string) => {
  const res = await api.post("/api/otp/verify-otp", {
    otp,
    email,
  });
  return res.data;
};
export const getOtp = async (email: string) => {
  const res = await api.post("/api/otp/get-otp", { email });
  return res.data;
};
