import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

const Login = () => {
  return (
    <main className="w-full h-screen  flex items-center justify-center">
      <div className="form-container w-100 bg-zinc-900 p-4 rounded-md ">
        <form className="flex flex-col w-full gap-5  ">
          <Input name="username" placeholder="username" type="text" />
          <Input name="password" placeholder="password" type="password" />
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
