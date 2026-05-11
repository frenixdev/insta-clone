import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api/otp",
  // baseURL: "http://localhost:3000/api/otp",
});

export const verifyOtp = async (email: string, otp: string) => {
  const res = await api.post("/verify-otp", {
    otp,
    email,
  });
  return res.data;
};
export const getOtp = async (email: string) => {
  const res = await api.post("/get-otp", { email });
  return res.data;
};
