import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "@/shared/components/Loader";
import Input from "@auth/components/Input";
import Button from "@auth/components/Button";
// import Otp from "@auth/components/Otp";
import useAuthStore from "../Store/auth.store";
import { useShallow } from "zustand/shallow";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { isLoading, register, errors } = useAuthStore(
    useShallow((state) => ({
      isLoading: state.isLoading,
      register: state.register,
      errors: state.errors,
    })),
  );
  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register({ email, password, username });
  };
  return (

      <div className="form-container w-100 bg-zinc-900 p-4 rounded-md ">
        <form
          className="flex flex-col w-full gap-5  "
          onSubmit={handleFormSubmit}
        >
          <Input
            name="username"
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            err={errors?.username}
          />
          <Input
            name="email"
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            err={errors?.email}
          />
          <Input
            name="password"
            placeholder="password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            err={errors?.password}
          />
          {/* <Otp email={email} /> */}
          <Button
            type="submit"
            className="bg-blue-800 hover:bg-blue-900 font-semibold tracking-wider h-10"
          >
            {isLoading ? <Loader /> : "Register"}
          </Button>
        </form>
        <p className="text-sm mt-5 text-zinc-400">
          Already have an account?{" "}
          <Link className="text-red-700 hover:text-red-600" to={"../login"}>
            Login
          </Link>
        </p>
      </div>
  );
};

export default Register;
