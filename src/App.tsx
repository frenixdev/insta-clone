import { Route, Routes } from "react-router-dom";
import Register from "./feature/auth/pages/Register";
import Home from "./feature/Home/pages/Home";
import Login from "./feature/auth/pages/Login";

const App = () => {
  return (
    <Routes>
      <Route path={"/"} element={<Home />} />
      <Route path={"/register"} element={<Register />} />
      <Route path={"/login"} element={<Login />} />
    </Routes>
  );
};

export default App;
