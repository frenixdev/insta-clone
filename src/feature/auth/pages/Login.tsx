import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { useState, type SubmitEvent } from "react";
import { useAuth } from "../context/useAuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login({ username, password });
    console.log("logged in");
  };
  return (
    <main className="w-full h-screen  flex items-center justify-center">
      <div className="form-container w-100 bg-zinc-900 p-4 rounded-md ">
        <form className="flex flex-col w-full gap-5  " onSubmit={handleSubmit}>
          <Input
            name="username"
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            name="password"
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            className="bg-red-800 hover:bg-red-900 h-10 font-semibold tracking-wider"
          >
            Login
          </Button>
        </form>
        <p className="text-sm mt-5 text-zinc-400">
          Don't have an account?{" "}
          <Link className="text-blue-700 hover:text-blue-600" to={"/register"}>
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
