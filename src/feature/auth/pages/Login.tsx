import { useShallow } from "zustand/shallow";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, type SubmitEvent } from "react";
import useAuthStore from "../store/auth.store";
import { Button, ErrorText, Input, Loader } from "@/shared";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {
    error,
    isLoading,
    login,
    clearValidationErr,
    clearAllErrors,
    validationErrors,
    clearError,
  } = useAuthStore(
    useShallow((state) => ({
      isLoading: state.isLoading,
      error: state.error,
      validationErrors: state.validationErrors,
      login: state.login,
      clearValidationErr: state.clearValidationError,
      clearAllErrors: state.clearAllErrors,
      clearError: state.clearError,
    })),
  );

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    clearError();
    const succes = await login({ username, password });
    if (succes) navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (validationErrors && validationErrors[name]) clearValidationErr(name);
  };

  useEffect(() => {
    clearAllErrors();
  }, []);

  return (
    <div className="form-container w-100 bg-zinc-900 p-4 rounded-md ">
      <form className="flex flex-col w-full gap-5  " onSubmit={handleSubmit}>
        <Input
          name="username"
          placeholder="username"
          type="text"
          value={username}
          onChange={handleChange}
          err={validationErrors?.username}
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
          className="bg-red-800 hover:bg-red-900 h-10 font-semibold tracking-wider"
        >
          {isLoading ? <Loader /> : "Login"}
        </Button>
      </form>
      {error && <ErrorText text={error} />}
      <p className="text-sm mt-5 text-zinc-400">
        Don't have an account?{" "}
        <Link
          className="text-blue-700 hover:text-blue-600"
          to={"../register"}
          relative="path"
        >
          Create one
        </Link>
      </p>
    </div>
  );
};

export default Login;
