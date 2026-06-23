import { Link, useNavigate } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import { useState, type SubmitEvent } from "react";
import Button from "../components/Button";
import Input from "../components/Input";
import Loader from "@/shared/components/Loader";
import useAuthStore from "../Store/auth.store";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { errors, isLoading, login, clearError } = useAuthStore(
    useShallow((state) => ({
      isLoading: state.isLoading,
      errors: state.errors,
      login: state.login,
      clearError: state.clearError,
    })),
  );

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const succes = await login({ username, password });
    if(succes) navigate("/")
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
    if (errors && errors[name]) {
      clearError(name);
    }
  };
  return (
    <div className="form-container w-100 bg-zinc-900 p-4 rounded-md ">
      <form className="flex flex-col w-full gap-5  " onSubmit={handleSubmit}>
        <Input
          name="username"
          placeholder="username"
          type="text"
          value={username}
          onChange={handleChange}
          err={errors?.username}
        />
        <Input
          name="password"
          placeholder="password"
          type="text"
          value={password}
          onChange={handleChange}
          err={errors?.password}
        />
        <Button
          type="submit"
          className="bg-red-800 hover:bg-red-900 h-10 font-semibold tracking-wider"
        >
          {isLoading ? <Loader /> : "Login"}
        </Button>
      </form>
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
