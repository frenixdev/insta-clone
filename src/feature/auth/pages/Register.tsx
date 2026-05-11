import Input from "../components/Input";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import Otp from "../components/Otp";
import { useState } from "react";

const Register = () => {
  const [email, setEmail] = useState("");
  return (
    <main className="w-full h-screen  flex items-center justify-center">
      <div className="form-container w-100 bg-zinc-900 p-4 rounded-md ">
        <form className="flex flex-col w-full gap-5  ">
          <Input name="username" placeholder="username" type="text" />
          <Input
            name="email"
            value={email}
            placeholder="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input name="password" placeholder="password" type="text" />
          <Otp email={email} />
          <Button
            type="submit"
            className="bg-blue-800 hover:bg-blue-900 font-semibold tracking-wider"
          >
            Register
          </Button>
        </form>
        <p className="text-sm mt-5 text-zinc-400">
          Already have an account?{" "}
          <Link className="text-red-700 hover:text-red-600" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
