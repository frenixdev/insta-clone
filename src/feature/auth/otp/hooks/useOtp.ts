import { useState } from "react";
import { getOtp, verifyOtp } from "../services/otp.api";
interface StatusType {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const initialVal: StatusType = {
  loading: false,
  error: null,
  success: false,
};

export const useOtp = () => {
  const [getOtpResponse, setGetOtpResponse] = useState<StatusType>(initialVal);
  const [verifyOtpResponse, setVerifyOtpResponse] =
    useState<StatusType>(initialVal);

  const verifyOtpHandler = async (email: string, otp: string) => {
    if (verifyOtpResponse.loading || !email || !otp) return;
    setVerifyOtpResponse({ ...initialVal, loading: true });

    try {
      await verifyOtp(email, otp);
      setVerifyOtpResponse((prev) => ({ ...prev, success: true }));
    } catch (error) {
      setVerifyOtpResponse((prev) => ({
        ...prev,
        loading: false,
        error: "something went wrong",
      }));
    } finally {
      setVerifyOtpResponse((prev) => ({ ...prev, loading: false }));
    }
  };

  const getOtpHandler = async (email: string) => {
    if (getOtpResponse.loading || !email) return;

    setGetOtpResponse({ ...initialVal, loading: true });
    console.log("ehllo");
    try {
      await getOtp(email);
      console.log("success");
      setGetOtpResponse((prev) => {
        const newVal = { ...prev, success: true };
        return newVal;
      });
    } catch (error) {
      setGetOtpResponse((prev) => ({
        ...prev,
        loading: false,
        error: "something went wrong",
      }));
    } finally {
      setGetOtpResponse((prev) => ({ ...prev, loading: false }));
    }
  };

  const getOtpSent = getOtpResponse.success;
  const isVerified = verifyOtpResponse.success;
  const isLoading = getOtpResponse.loading || verifyOtpResponse.loading;
  return {
    getOtpSent,
    isVerified,
    isLoading,

    getOtpHandler,
    verifyOtpHandler,
  } as const;
};
