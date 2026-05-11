import { useState, type ChangeEvent } from "react";
import Button from "./Button";
import Input from "./Input";
import { useOtp } from "../hooks/useOtp";
import Loader from "@/components/Loader";
import { FcOk } from "react-icons/fc";
import ErrorText from "@/components/ErrorText";

const Otp = ({ email }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { getOtpHandler, verifyOtpHandler, getOtpSent, isLoading, isVerified } =
    useOtp();

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) setOtp(val);
  };
  const buttonText = () => {
    if (isLoading) return <Loader />;
    if (!getOtpSent) return "Get OTP";
    if (!isVerified) return "Verify";
    return "Verified";
  };

  const statusText = () => {
    if (isVerified) return "Verified";
    if (getOtpSent) return "OTP Sent";
    return "";
  };
  const buttonHandler = () => {
    if (!getOtpSent) return getOtpHandler(email);
    if (!otp.trim()) return setError("please enter otp");
    setError("");
    if (!isVerified) return verifyOtpHandler(email, otp);
    return;
  };

  return (
    <div>
      <div className="w-full flex gap-5 items-center justify-between">
        <div className="w-6/10">
          <Input
            type="text"
            inputMode="numeric"
            id="otp"
            name="otp"
            placeholder="enter otp"
            onChange={onChangeHandler}
            value={otp}
            maxLength={6}
            disabled={isVerified}
          />
        </div>

        <Button
          type="button"
          className={`${isVerified ? "bg-green-900" : "bg-blue-600 hover:bg-blue-700"} px-5 h-10 `}
          onClick={buttonHandler}
          disabled={isVerified}
        >
          {buttonText()}
        </Button>
      </div>
      {getOtpSent && !error && !isVerified && (
        <div className=" flex items-center justify-start">
          <p className="text-sm tracking-wide text-green-500 px-2">{statusText()}</p>
         {isVerified &&  <FcOk className="text-sm" />}
        </div>
      )}
      {
        error && <ErrorText text={error}/>
      }
    </div>
  );
};

export default Otp;
