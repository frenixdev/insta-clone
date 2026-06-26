import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import useAuthStore from "../store/auth.store";
import { Input, Loader, Button, ErrorText } from "@/shared";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    isLoading,
    validationErrors,
    error,
    register,
    clearAllErr,
    clearValidationErr,
    clearError,
  } = useAuthStore(
    useShallow((state) => ({
      isLoading: state.isLoading,
      register: state.register,
      error: state.error,
      validationErrors: state.validationErrors,
      clearValidationErr: state.clearValidationError,
      clearAllErr: state.clearAllErrors,
      clearError: state.clearError,
    })),
  );
  const handleFormSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();
    await register({ email, password, username });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (name === "email") setEmail(value);
    if (validationErrors && validationErrors[name]) clearValidationErr(name);
  };
  useEffect(() => clearAllErr(), []);
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
          onChange={handleChange}
          err={validationErrors?.username}
        />
        <Input
          name="email"
          placeholder="email"
          type="text"
          value={email}
          onChange={handleChange}
          err={validationErrors?.email}
        />
        <Input
          name="password"
          placeholder="password"
          type="text"
          value={password}
          onChange={handleChange}
          err={validationErrors?.password}
        />
        <Button
          type="submit"
          className="bg-blue-800 hover:bg-blue-900 font-semibold tracking-wider h-10"
        >
          {isLoading ? <Loader /> : "Register"}
        </Button>
      </form>
      {error && <ErrorText text={error} />}
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
